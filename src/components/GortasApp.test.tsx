import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { IAuthState, ISessionInfo } from '../commons/types';
import { GortasApp } from './GortasApp';
import '@testing-library/jest-dom'
import { IAuthService, ISessionService } from '../services/types';

const defaultState: IAuthState = {
    module: null,
    flowId: "test-flow-id",
    callbacks: [{
        name: "login",
        prompt: "Login",
        required: false,
        type: "text",
        value: ""
    }],
    token: null
}

const successAuthState: IAuthState = {
    module: null,
    token: "test_token"
}

const dummyAuthService: IAuthService = {
    async startFlow(_url): Promise<IAuthState> {
        return Promise.resolve(defaultState);
    },
    async submitCallbacks(_url, _data): Promise<IAuthState>  {
        return Promise.resolve(successAuthState);
    }
}

const currAuthState: ISessionInfo = {
    id: "test",
    sub: "user1"
}

const dummySessionService: ISessionService = {
    getSessionInfo: function (_url: string): Promise<ISessionInfo> {
        return Promise.resolve(currAuthState);
    }
}


const dummyFailedSessionService: ISessionService = {
    getSessionInfo: function (_url: string): Promise<ISessionInfo> {
        return Promise.reject();
    }
}
const successAuthService: IAuthService = {
    async startFlow(_url): Promise<IAuthState> {
        return Promise.resolve(successAuthState);
    },
    async submitCallbacks(_url, _data): Promise<IAuthState>  {
        return Promise.resolve(successAuthState);
    }
}

test('show login state', async () => {
    render(<GortasApp authService={dummyAuthService} sessionService={dummyFailedSessionService} />);
    await waitFor(() => expect(screen.queryByText("Login")).toBeInTheDocument());
});

test('show success state', async () => {
    render(<GortasApp authService={successAuthService} sessionService={dummySessionService} />);
    await waitFor(() => expect(screen.queryByText("user1")).toBeInTheDocument());
});
