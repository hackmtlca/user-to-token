import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'material-ui-snackbar-provider'
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import './App.css';
import { Urls } from './utils/urls';
import AppPage from './components/AppPage';
import SharePage from './components/SharePage';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    }
})

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
                <CssBaseline />
                <Router>
                    <Route path={Urls.HOME_PAGE} exact component={HomePage} />
                    <Route path={Urls.LOGIN_PAGE} exact component={LoginPage} />
                    <Route path={Urls.APP_PAGE} exact component={AppPage} />
                    <Route path={Urls.SHARE_PAGE} component={SharePage} />
                </Router>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
