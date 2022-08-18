import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { ISessionInfo } from '../commons/types';
import '@testing-library/jest-dom'
import { ISessionService } from '../services/types';
import { UserProfile } from './UserProfile';
import { BrowserRouter } from 'react-router-dom';


const currAuthState: ISessionInfo = {
    id: "test",
    sub: "user1"
}

const dummySessionService: ISessionService = {
    getSessionInfo: function (url: string): Promise<ISessionInfo> {
        return Promise.resolve(currAuthState);
    }
}

test('user profile render', async () => {
    render(<UserProfile sessionService={dummySessionService} />, {wrapper: BrowserRouter});
    await waitFor(() => expect(screen.queryByText("test")).toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText("user1")).toBeInTheDocument());
});
