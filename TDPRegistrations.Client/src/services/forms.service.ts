import axiosClient from "../api/axios";
import { FormsEndpoints } from "../api/endpoints";
import { IAddFormRequest, IResponse } from "../models/api.models";
import { IForm, IFormBasicDTO } from "../models/form.models";

export default class FormsService {
	public static getAllForms = async (): Promise<IResponse<IFormBasicDTO[]>> => {
		const data = await axiosClient.get(FormsEndpoints.getAll());
		return data.data as IResponse<IFormBasicDTO[]>;
	}

	public static add = async (title: string): Promise<IResponse<IForm>> => {
		const payload: IAddFormRequest = {
			title
		};
		const data = await axiosClient.post(FormsEndpoints.add(), payload);
		return data.data as IResponse<IForm>;
	}

	public static delete = async (id: string): Promise<IResponse<boolean>> => {
		const data = await axiosClient.delete(FormsEndpoints.delete(id));
		return data.data as IResponse<boolean>;
	}

	public static getFormBySlug = async (slug: string): Promise<IResponse<IForm>> => {
		const data = await axiosClient.get(FormsEndpoints.getBySlug(slug));
		return data.data as IResponse<IForm>;
	}
}
