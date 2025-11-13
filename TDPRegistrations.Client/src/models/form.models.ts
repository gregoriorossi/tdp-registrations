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
	fields: IField[];
}

export interface IField {
	label: string;
	description: string;
	type: FieldType;
	isMandatory: boolean;
	order: number;
	options: IFieldOption[];
	id: string;
	dateCreated: string;
	dateUpdated: string;
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