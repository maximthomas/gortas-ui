export interface ICallback {
    name: string;
    value: string;
    type?: string | null;
    prompt?: string | null;
    required?: boolean | null;
    error?: string| null;
}

export interface IAuthState {
    module?: string | null;
    flowId?: string | null;
    callbacks?: ICallback[] | null;
    token?: string | null
}

export interface ISessionInfo {
    id?: string | null;
    sub?: string | null;
}

export interface IAuthRequest {
    module?: string | null;
    flowId?: string | null;
    callbacks?: ICallback[] | null;
}

