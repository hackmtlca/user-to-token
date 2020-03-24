import React from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import { Person as PersonIcon, ArrowForward as ArrowForwardIcon, MonetizationOn as TokenIcon } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { Urls } from '../../utils/urls';

const HomePage: React.FC = () => {

    const history = useHistory();

    return (
        <div>
            <Grid container style={{height: '100vh'}} alignItems='center' justify='center'>
                <Grid item container justify='center' spacing={2} alignItems='center'>
                    <Grid item xs={12}>
                        <Typography variant='h3' align='center'>User to Token</Typography>
                    </Grid>

                    <Grid item container spacing={1} justify='center'>
                        <Grid item>
                            <PersonIcon />
                        </Grid>
                        <Grid item>
                            <ArrowForwardIcon />
                        </Grid>
                        <Grid item>
                            <TokenIcon />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Button variant='outlined' onClick={() => history.push((localStorage.getItem('token')) ? Urls.APP_PAGE : Urls.LOGIN_PAGE)}>Access</Button>
                    </Grid>
                </Grid>
            </Grid>
            <div style={{position:'fixed', bottom:'0', textAlign: 'center', width: '100%'}}>
                <Typography>User to Token is the safest single use personal information safe. Your account exists as long as you are logged in. No one can use your account but you. No duplicate usernames, no passwords, no bullshit.</Typography>
            </div>
        </div>
    );
}

export default HomePage;