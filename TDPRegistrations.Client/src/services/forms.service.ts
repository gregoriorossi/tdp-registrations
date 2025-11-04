import api from "../api/axios";
import { TDPEndpoints } from "../consts/api.consts";
import { IResponse } from "../models/api.models";
import { IForm, IFormBasicDTO } from "../models/form.models";

export const getAllForms = async (): Promise<IResponse<IFormBasicDTO[]>> => {
	const data = await api.get(TDPEndpoints.Forms.GetAll);
	return data.data as IResponse<IFormBasicDTO[]>;
}

export const getFormBySlug = async (slug: string): Promise<IResponse<IForm>> => {
	const data = await api.get(TDPEndpoints.Forms.GetBySlug(slug));
	return data.data as IResponse<IForm>;
}