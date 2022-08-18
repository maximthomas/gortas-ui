import React, { FC, useState } from 'react';
import { Container, createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { IAuthState } from '../commons/types';
import { Auth } from './Auth';
import { UserProfile } from './UserProfile';
import { IAuthService, ISessionService } from '../services/types';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const theme = createTheme({
    palette: {
        type: "dark"
    }
});

export interface ILoginAppProps {
    authService: IAuthService,
    sessionService: ISessionService
}

export const GortasApp: FC<ILoginAppProps> = (props: ILoginAppProps) => {
    const [authState, setAuthState] = useState<IAuthState>({});

    return <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="sm">
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/profile" element={<UserProfile sessionService={props.sessionService} />}/>
                    <Route path="/auth/:flow" element={<Auth authState={authState} setAuthState={setAuthState} authService={props.authService}/>}/>
                    <Route path="/*" element={<Navigate to="/profile" replace={true} />}/>
                </Routes>
            </BrowserRouter>
        </Container>
    </ThemeProvider>

}
