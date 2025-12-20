import { IField, ISection } from "./form.models";

export interface IResponse<T> {
	value: T;
	isSuccess: boolean;
	isFailure: boolean;
	error?: {
		code: string;
		description: string;
	}
}

export interface IAddFormRequest {
	title: string;
}

export interface IUpdateFormRequest {
	id: string;
	title: string;
	isOpen: boolean;
	dateCreated: string;
	description: string;
	dateUpdated: string;
	sections: ISection[];
	bannerImage: File | null;
	privacyAttachment: File | null;
	privacyDisclaimer: string;
}