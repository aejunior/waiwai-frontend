export interface User {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export interface Credentials {
    email: string;
    password: string;
}

export interface Token {
    access_token: string;
    refresh_token: string;
    token_type: string;
}
