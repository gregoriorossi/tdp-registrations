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
	options: any[];
	id: string;
	dateCreated: string;
	dateUpdated: string;
}

export enum FieldType {
	TEXT,
	NUMBER,
	DATETIME,
	SINGLE_CHOICE,
	MULTIPLE_CHOICE,
	EMAIL,
	TELEPHONE_NUMBER
}