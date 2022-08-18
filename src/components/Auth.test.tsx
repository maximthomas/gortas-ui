import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { IAuthState } from '../commons/types';
import '@testing-library/jest-dom'
import { Auth } from './Auth';
import { IAuthService } from '../services/types';
import { BrowserRouter } from 'react-router-dom';


const currAuthState: IAuthState = {
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

const dummyAuthService: IAuthService = {
    async startFlow(_url): Promise<IAuthState> {
        return Promise.resolve(currAuthState);
    },
    async submitCallbacks(_url, _data): Promise<IAuthState>  {
        return Promise.resolve(currAuthState);
    }
}

test('renders without crashing', async () => {
    render(<Auth authService={dummyAuthService} authState={currAuthState} setAuthState={() => undefined} />, {wrapper: BrowserRouter});
    await waitFor(() => expect(screen.queryByText("Registration")).toBeInTheDocument());
});
