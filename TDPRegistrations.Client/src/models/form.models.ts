import { IImage } from "./shared.models";

export interface IFormBasicDTO {
	id: string;
	title: string;
	isOpen: boolean;
	slug: string,
	dateCreated: string;
}

export interface IForm {
	id: string;
	title: string;
	isOpen: boolean;
	slug: string,
	dateCreated: string;
	description: string;
	dateUpdated: string;
	sections: ISection[];
	bannerImage: IImage | null;
	bannerImageId: string | null;
}

export interface ISection {
	title: string;
	description: string;
	fields: IField[];
}

export interface IField {
	label: string;
	description?: string;
	type: FieldType;
	isMandatory: boolean;
	order: number;
	options: IFieldOption[];
	id?: string | null;
	dateCreated?: string;
	dateUpdated?: string;
}

export enum FieldType {
	EMPTY = -1,
	TEXT = 0,
	NUMBER = 1,
	DATETIME = 2,
	SINGLE_CHOICE = 3,
	MULTIPLE_CHOICE = 4,
	EMAIL = 5,
	TELEPHONE_NUMBER = 6
}

export interface IFieldOption {
	id: string;
	label: string;
}
export interface IFieldFormValues {
	description?: string | undefined;
	mandatory?: boolean | undefined;
	label: string;
	type: FieldType;
	options: string[] | undefined;
}

export interface ISectionFormValues {
	title: string;
	description?: string;
}