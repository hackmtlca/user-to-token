import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { useSnackbar } from 'material-ui-snackbar-provider';
import Post from '../AppPage/Post';
import { Urls } from '../../utils/urls';

const SharePage: React.FC = () => {

    const params = useParams<{id: string}>();
    const history = useHistory();
    const snackbar = useSnackbar();
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/posts/' + params.id, {
                    method: 'get',
                });

                const json: {post?: {content: string}, error?: string} = await res.json();
    
                if (json.post) {
                    setContent(json.post.content);
                } else {
                    snackbar.showMessage(
                        (json.error) ? json.error : "Error"
                    )

                    history.push(Urls.HOME_PAGE);
                }
            } catch (error) {
                snackbar.showMessage(
                    'Backend error'
                )

                history.push(Urls.HOME_PAGE);
            }
        }

        fetchPost();
    }, [])

    return (
        <Grid container style={{height: '100vh'}} justify='center' alignItems='center'>
            <Grid item>
                <Post id="f00db4b3" content={content} />
            </Grid>
        </Grid>
    )
}

export default SharePage;