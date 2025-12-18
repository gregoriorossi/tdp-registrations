import axiosClient from "../api/axios";
import { FormsEndpoints } from "../api/endpoints";
import { IAddFormRequest, IResponse, IUpdateFormRequest } from "../models/api.models";
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

	public static getFormById = async (slug: string): Promise<IResponse<IForm>> => {
		const data = await axiosClient.get(FormsEndpoints.getById(slug));
		return data.data as IResponse<IForm>;
	}

	public static getFormBySlug = async (slug: string): Promise<IResponse<IForm>> => {
		const data = await axiosClient.get(FormsEndpoints.getBySlug(slug));
		return data.data as IResponse<IForm>;
	}

	public static update = async (form: IUpdateFormRequest): Promise<IResponse<IForm>> => {

		const formData = new FormData();
		formData.append('id', form.id);
		formData.append('title', form.title);
		formData.append('description', form?.description ?? '');
		formData.append('sections', JSON.stringify(form?.sections));
		formData.append('bannerImageDeleted', String(form.bannerImageDeleted));

		if (form?.bannerImage) {
			formData.append('bannerImage', form?.bannerImage, form.bannerImage?.name);
		}

		const data = await axiosClient.patch(FormsEndpoints.update(), formData, {
			headers: {
				'Content-type': 'multipart/form-data'
			}
		});
		return data.data as IResponse<IForm>;
	}
}
