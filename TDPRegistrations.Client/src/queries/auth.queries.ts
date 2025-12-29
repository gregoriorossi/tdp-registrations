import { UseMutationResult, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query"
import { queryClient, queryKeys } from "../api/queryClient"
import AuthService from "../services/auth.service"
import { ILoginRequest, ILoginResult } from "../models/auth.models"

export const useLogin = () => {
	return useMutation({
		mutationFn: (request: ILoginRequest) => AuthService.login(request),
		onSuccess: () => {
			queryClient.invalidateQueries();
		}
	})
}