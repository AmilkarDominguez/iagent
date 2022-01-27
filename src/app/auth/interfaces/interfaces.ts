
export interface AuthResponse {
    ok: boolean;
    uid?: string;
    name?: string;
    email?: string;
    token?: string;
    msg?: string;

    //Custom
    access_token?: string;
    refresh_token?: string;

    statusCode?: number;
    message?: string;
    error?: string;
}

export interface User {
    uid: string;
    name: string;
    email: string;
    //Custom
    access_token?: string;
    refresh_token?: string;
}