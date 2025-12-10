import { FieldType } from "./form.models";

export interface IFieldTypeValue {
	Key: FieldType;
	Value: string;
}

export interface IImage {
	id?: string;
	fileName: string;
	contentType: string;
	length: number;
	data: any[];
}