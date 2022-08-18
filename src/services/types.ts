import { IAuthRequest, IAuthState, ISessionInfo } from "../commons/types"

export interface IAuthService {
    startFlow(url: string): Promise<IAuthState>
    submitCallbacks(url: string, data: IAuthRequest): Promise<IAuthState>
}

export interface ISessionService {
    getSessionInfo(url: string): Promise<ISessionInfo>
}