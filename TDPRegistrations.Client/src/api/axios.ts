import axios from 'axios';
import AuthService from '../services/auth.service';
import { Routes } from '../consts/routes.consts';

const adminApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL
});

adminApi.interceptors.request.use(config => {
	const token = AuthService.getTokenStr();

	if (!token) {
		window.location.href = Routes.AdminLogin;
	}

	config.headers = config.headers || {};
	config.headers.Authorization = `Bearer ${token}`;

	return config;
});

adminApi.interceptors.response.use(
	response => response,
	error => {
		if (error.response?.status === 401) {
			AuthService.logout();
			window.location.href = Routes.AdminLogin;
		}

		return Promise.reject(error);
	}
)
export default adminApi;

