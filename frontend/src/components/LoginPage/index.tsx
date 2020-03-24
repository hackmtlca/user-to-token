import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, Grid, TextField, Button } from '@material-ui/core';
import { useSnackbar } from 'material-ui-snackbar-provider';
import { useHistory } from 'react-router-dom';
import { Urls } from '../../utils/urls';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_BACKEND_URL: string;
        }
    }
}

const LoginPage: React.FC = () => {

    const history = useHistory();

    useEffect(() => {
        if(localStorage.getItem('token')) {
            history.push(Urls.APP_PAGE);
        }
    });

    const [username, setUsername] = useState("");
    const snackbar = useSnackbar();

    const fetchToken = async () => {
        try {
            const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/user', {
                method: 'post',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: `{"username": "${username}"}`
            });
            const json = await res.json();

            if(json.error){
                snackbar.showMessage(
                    json.error
                )
            } else if (json.token && json.username) {
                localStorage.setItem('token', json.token);
                localStorage.setItem('username', json.username);

                history.push(Urls.APP_PAGE);
            }
        } catch (error) {
            snackbar.showMessage(
                'Backend error'
            )
        }
    }

    return (
        <Grid container alignItems='center' justify='center' style={{ height: '100vh' }}>
            <Grid item xs={3}>
                <Card>
                    <CardHeader
                        title="User to Token"
                    />
                    <CardContent>
                        <Grid container direction='column' spacing={3} alignItems='center'>
                            <Grid item xs={12} style={{ width: '100%' }}>
                                <TextField onKeyDown={e => {if (e.keyCode === 13) fetchToken()}} style={{ width: '100%' }} value={username} placeholder="Username" onChange={e => setUsername(e.target.value)} />
                            </Grid>
                            <Grid item xs>
                                <Button variant='outlined' onClick={() => fetchToken()}>Token</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default LoginPage;