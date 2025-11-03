import api from "../api/axios";
import { TDPEndpoints } from "../consts/api.consts";
import { IResponse } from "../models/api.models";
import { IFormBasicDTO } from "../models/form.models";

export const getAllForms = async (): Promise<IResponse<IFormBasicDTO[]>> => {
	const data = await api.get(TDPEndpoints.Forms.GetAll);
	console.log("DATA", data);
	return data.data as IResponse<IFormBasicDTO[]>;
}