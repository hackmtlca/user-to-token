import React, { useState, useEffect } from 'react';
import { TextField, Typography, IconButton, Grid, Paper, Toolbar, AppBar, Tooltip } from '@material-ui/core';
import { Send as SendIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { Urls } from '../../utils/urls';
import Post, { IPost } from './Post';
import { useSnackbar } from 'material-ui-snackbar-provider';

const AppPage: React.FC = () => {

    const history = useHistory();
    const snackbar = useSnackbar();
    const [message, setMessage] = useState<string>(``);
    const [messages, setMessages] = useState<IPost[]>([]);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            history.push(Urls.LOGIN_PAGE);
        }

        const fetchPosts = async () => {
            try {
                const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/posts', {
                    method: 'post',
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: `{"token": "${localStorage.getItem('token')}"}`
                });
                const json: {posts?: IPost[], error?: string} = await res.json();
    
                if(json.error){
                    snackbar.showMessage(
                        json.error
                    )
                } else if (json.posts) {
                    setMessages(json.posts);
                }
            } catch (error) {
                snackbar.showMessage(
                    'Backend error'
                )
            }
        }

        fetchPosts();
    }, []);

    const sendMessage = async () => {
        try {
            const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/posts', {
                method: 'put',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: `{"token": "${localStorage.getItem('token')}", "content": "${message}"}`
            });

            const json: {post?: IPost, error?: string} = await res.json();

            if(json.error){
                snackbar.showMessage(
                    json.error
                )
            } else if (json.post) {
                setMessages([...messages, json.post]);

                setMessage("");
            }
        } catch (error) {
            snackbar.showMessage(
                'Backend error'
            )
        }
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Grid container alignItems='center'>
                        <Grid item>
                            <Typography variant='h6'>Welcome {localStorage.getItem("username")}</Typography>
                        </Grid>
                        <Grid container justify='flex-end' item xs>
                            <Tooltip title="Signout Permanently">
                                <IconButton onClick={() => {
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('username');
                                    history.push(Urls.HOME_PAGE);
                                }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>


            <Grid container style={{ padding: '10px' }} spacing={1}>
                {
                    messages.map((p, i) => <Grid key={i} item md={4} xs={12}><Post id={p.id} content={p.content} /></Grid>)
                }
            </Grid>

            <Paper square style={{ position: 'fixed', padding: '10px', bottom: '0', width: '100%' }}>
                <Grid container spacing={1}>
                    <Grid item xs>
                        <TextField style={{ width: '100%' }} value={message} onKeyDown={e => {if (e.keyCode === 13) sendMessage();}} onChange={e => setMessage(e.target.value)} variant='outlined' />
                    </Grid>
                    <Grid item>
                        <IconButton onClick={() => sendMessage()}>
                            <SendIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default AppPage;