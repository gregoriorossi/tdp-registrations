import { JwtPayload } from "jwt-decode";

export interface ILoginRequest {
	username: string;
	password: string;
}

export interface ILoginResponse {
	token: string;
}

export interface ILoginResult {
	authenticated: boolean;
}