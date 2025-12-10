import { UseMutationResult, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { queryClient, queryKeys } from "../api/queryClient";
import FormsService from "../services/forms.service";
import { IResponse, IUpdateFormRequest } from "../models/api.models";
import { IForm, IFormBasicDTO } from "../models/form.models";

export const useForms = (): UseQueryResult<IResponse<IFormBasicDTO[]>> => {
	return useQuery({
		queryKey: [...queryKeys.forms.all],
		queryFn: () => FormsService.getAllForms()
	});
}

export const useFormById = (id: string): UseQueryResult<IResponse<IForm>> => {
	return useQuery({
		queryKey: [...queryKeys.forms.byId(id)],
		queryFn: () => FormsService.getFormById(id)
	});
}

export const useFormBySlug = (slug: string): UseQueryResult<IResponse<IForm>> => {
	return useQuery({
		queryKey: [...queryKeys.forms.bySlug(slug)],
		queryFn: () => FormsService.getFormBySlug(slug)
	});
}

export const useCreateForm = () => {
	return useMutation({
		mutationFn: (title: string) => FormsService.add(title),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.forms.all })
		}
	});
}

export const useDeleteForm = () => {
	return useMutation({
		mutationFn: (id: string) => FormsService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.forms.all })
		}
	});
}

export const useUpdateForm = () => {
	return useMutation({
		mutationFn: (form: IUpdateFormRequest) => FormsService.update(form),
		onSuccess: (data) => {
			const id: string = data.isSuccess ? data.value.id : '';
			const formBySlugKeys = id.length ? queryKeys.forms.byId(id) : [];
			queryClient.invalidateQueries
				({ queryKey: [...queryKeys.forms.all, ...formBySlugKeys]})
		}
	})
}