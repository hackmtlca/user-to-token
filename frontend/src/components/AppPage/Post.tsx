import React, { useState } from 'react';
import { Card, CardContent, CardActions, IconButton, Tooltip, Link } from '@material-ui/core';
import { Share as ShareIcon } from '@material-ui/icons';
import { useSnackbar } from 'material-ui-snackbar-provider';

export interface IPost {
    id: string,
    author?: string,
    content: string
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_FRONTEND_URL: string;
        }
    }
}

const Post: React.FC<IPost> = ({ id, content }) => {

    const snackbar = useSnackbar();
    const [hasUrl, showUrl] = useState(false);

    const sharePost = async () => {
        try {
            const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/posts/share', {
                method: 'post',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: `{"token": "${localStorage.getItem('token')}", "id": "${id}"}`
            });

            const json: {id?: string, error?: string} = await res.json();

            if(json.error){
                snackbar.showMessage(
                    json.error
                )
            } else if (json.id) {
                showUrl(true);
                
                snackbar.showMessage(
                    "Shared"
                )
            }
        } catch (error) {
            snackbar.showMessage(
                'Backend error'
            )
        }
    }

    return (
        <Card>
            <CardContent>
                <div dangerouslySetInnerHTML={{'__html': content}}/>
            </CardContent>
            <CardActions>
                {
                    (() => {
                        if(hasUrl){
                            return <Link color='secondary' href={`${process.env.REACT_APP_FRONTEND_URL}/share/${id}`}>{`${process.env.REACT_APP_FRONTEND_URL}/share/${id}`}</Link>
                        }
                    })()
                }
                <Tooltip title="Share">
                    <IconButton onClick={() => sharePost()}>
                        <ShareIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    )
}

export default Post;