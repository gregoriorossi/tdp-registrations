import { AuthEndpoints } from "../api/endpoints";
import { ILoginRequest, ILoginResponse, ILoginResult } from "../models/auth.models"
import axiosPubliClient from "../api/axiosPublic";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { queryClient } from "../api/queryClient";

export default class AuthService {

	private static TOKEN_KEY: string = "authToken";

	public static login = async (payload: ILoginRequest): Promise<ILoginResult> => {

		try {
			const data = await axiosPubliClient.post(AuthEndpoints.login(), payload);
			const response = data.data as ILoginResponse;

			localStorage.setItem(AuthService.TOKEN_KEY, response.token);

			const token = jwtDecode(response.token);

			return {
				authenticated: true
			}
		} catch (err) {
			console.log(err);
		}

		return {
			authenticated: false
		}
	}

	public static isTokenValid = (): boolean => {
		const tokenStr: string | null = localStorage.getItem(AuthService.TOKEN_KEY);
		if (!tokenStr) {
			return false;
		}

		const token = jwtDecode(tokenStr);
		return (token.exp ?? 0) > (Date.now() / 1000);
	}

	public static logout = (): void => {
		localStorage.removeItem(AuthService.TOKEN_KEY);
		queryClient.clear();
	}

	public static getTokenStr = (): string | null => {
		return localStorage.getItem(AuthService.TOKEN_KEY);
	}

	private static getToken = () => {
		const tokenStr: string | null = localStorage.getItem(AuthService.TOKEN_KEY);

		if (!tokenStr) {
			return null;
		}

		return jwtDecode(tokenStr);
	}
}