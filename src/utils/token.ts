import { jwtDecode } from "jwt-decode";

export interface JWT {
    iss: string;
    sub: string;
    iat: number;
    exp: number;
    jti: string;
    data: Data;
}

export interface Data {
    name: string;
    email: string;
}

class TokenDecode {
    private decodedToken: JWT;

    constructor(token: string) {
        try {
            if (token) this.decodedToken = jwtDecode(token);
            else throw new Error("Token está vazio.");
        } catch (e) {
            throw e;
        }
    }
    private get getExp(): number {
        return this.decodedToken.exp;
    }

    private get expiresAt(): Date {
        return new Date(this.getExp * 1000);
    }

    private get isExpired(): boolean {
        const event: Date = new Date();
        event.setMinutes(event.getMinutes() + 20);
        return event > this.expiresAt;
    }

    get isAuthenticated(): boolean {
        return !this.isExpired;
    }

    get getName(): string {
        return this.decodedToken.data.name;
    }

    get getEmail(): string {
        return this.decodedToken.data.email;
    }

    get authorizationString(): string {
        return `Bearer ${this.decodedToken}`;
    }
}

export default TokenDecode;
