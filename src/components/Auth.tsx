import { FormControl, Link, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IAuthState } from '../commons/types';
import { IAuthService } from "../services/types";
import { getSubmitButton, mapCallback } from './callbacks';

export interface IAuthProps {
    authState: IAuthState,
    setAuthState: (newState: IAuthState) => void,
    authService: IAuthService,
}

export interface IAuthSettings {
    next: string;
    title: string;
    current: string;
}

const AUTH_URL = process.env.REACT_APP_GORTAS_URL! + process.env.REACT_APP_GORTAS_AUTH_PATH;

const LOGIN = "login";

const REGISTRATION = "registration";

const authSettingsMap: Record<string, IAuthSettings> = {
    "login" : {
        next: REGISTRATION,
        title: "Login",
        current: LOGIN
    },
    "registration" : {
        next: LOGIN,
        title: "Registration",
        current: REGISTRATION,
    },
};

export const Auth: FC<IAuthProps> =  (props: IAuthProps) => {
    const { flow } = useParams();
    const navigate = useNavigate();
    const authService = props.authService;
    const authState = props.authState;
    const setAuthState = props.setAuthState;

    const [authSettings, setAuthSettings] = useState<IAuthSettings>(authSettingsMap[LOGIN]);
    useEffect(() => {
        if(flow) {
            setAuthSettings(authSettingsMap[flow])
        }        
    }, [flow]);

    const setCallback = (name: string, value: string) => {
        const newAuthState = { ...authState };
        newAuthState
            .callbacks?.filter((c) => c.name === name)
            .forEach((c) => {
                c.value = value;
            });
        setAuthState(newAuthState);
    }

    const switchAuth = () => {
        setAuthState({});
        setAuthSettings(authSettingsMap[authSettings.next]);
    }
    useEffect(() => {
        (async () => {
            try {
                const newAuthState = await authService.startFlow(AUTH_URL + authSettings.current);
                setAuthState(newAuthState);
            }
            catch (err: unknown) {
                console.error(err);
            }
        })();

    }, [authSettings])

    const submitCallbacks = () => {
        (async () => {
            try {
                const newAuthState = await authService.submitCallbacks(AUTH_URL + authSettings.current, {
                    flowId: authState.flowId,
                    callbacks: authState.callbacks ? (authState.callbacks?.map((c)=> { return {
                        name: c.name,
                        value: c.value
                    }})) : [],
                    module: authState.module,});

                setAuthState(newAuthState);
            } catch (err: unknown) {
                console.error(err);
            }
        })();
    }


    useEffect(() => {
        if(authState.token) {
            setAuthState({});
            navigate("/profile");
        }
    },
    [authState]);


    const callbackElements = authState.callbacks?.map((c) => mapCallback(c, setCallback));
    const submitButton = getSubmitButton(authState.callbacks, submitCallbacks);

    return <FormControl fullWidth>
        <Typography>{authSettings.title}</Typography>
    {callbackElements}
    {submitButton}
    <Link id="auth-link" component="button" color="inherit" onClick={switchAuth}>
        {authSettingsMap[authSettings.next].title}
    </Link>
</FormControl>
}