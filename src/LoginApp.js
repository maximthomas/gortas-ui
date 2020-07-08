import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {Profile} from './Profile'
import {ThemeProvider} from "@material-ui/styles";

import {createMuiTheme, CssBaseline, Link, Paper} from "@material-ui/core";
import {Authentication} from "./Authentication";

const signUpUrl = process.env.REACT_APP_GORTAS_URL + process.env.REACT_APP_GORTAS_SIGN_UP_PATH;
const signInUrl = process.env.REACT_APP_GORTAS_URL + process.env.REACT_APP_GORTAS_SIGN_IN_PATH;


const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
});

class AuthState {
    constructor(title, authUrl, linkTitle) {
        this.title = title;
        this.authUrl = authUrl;
        this.linkTitle = linkTitle;
    }
}

const signUpState = new AuthState("Sign Up", signUpUrl, "Sign In")
const signInState = new AuthState("Sign In", signInUrl, "Sign Up")

export class LoginApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            succeeded: false,
            failed: false,
            authState: signInState,
        }
    }

    componentDidUpdate(prevProps, prevState, ss) {
       //console.log(prevState, this.state);
    }

    authSucceeded = () => {
        this.setState({succeeded: true});
    }

    authFailed = () => {
        this.setState({failed:true})
    }

    render() {
       return <ThemeProvider theme={theme}>
            <Router>
                <div>
                    <CssBaseline/>
                    <div id="login-app">
                        <Paper id="auth-panel" variant="outlined">
                            <Switch>

                                <Route path="/login/:realm/:chain">
                                    <Authentication authSucceeded={this.authSucceeded} authFailed={this.authFailed} />
                                </Route>
                                <Route path="/login">
                                    <Redirect to="/login/users/login" />
                                </Route>
                                <Route path="/"  authenticated={this.state.succeeded}>
                                    <Profile/>
                                </Route>
                            </Switch>
                        </Paper>
                    </div>
                </div>
            </Router>
        </ThemeProvider>
    };
}