import { IFieldFormValues, IField } from "../models/form.models";

export const fieldFormValuesToField = (data: IFieldFormValues, field?: IField): IField => {
	return {
		label: data.label,
		description: data.description,
		type: data.type,
		isMandatory: data.mandatory ?? false,
		order: field?.order ?? -1,
		options: [], // TODO
		id: field?.id ?? null,
		dateCreated: field?.dateCreated ?? '',
		dateUpdated: ''
	};
}

export const sortFields = (f1: IField, f2: IField): number => {
	return f1.order > f2.order ? 1 : -1;
}