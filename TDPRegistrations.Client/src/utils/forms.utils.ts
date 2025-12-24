import { STRINGS } from "../consts/strings.consts";
import { IFieldFormValues, IField, IForm, FieldType } from "../models/form.models";
import *  as yup from "yup";

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

export const buildDynamicFormSchema = (form: IForm) => {
	const obj: { [id: string]: any } = {
		"privacyAccepted": yup.boolean().isTrue(STRINGS.Pages.Form.Errors.PrivacyMandatory)
	};

	form.sections.forEach(section => {
		section.fields.forEach(field => {
			let validator;

			switch (field.type) {
				case FieldType.TEXT:
					validator = yup.string();
					break;
				case FieldType.NUMBER:
					validator = yup.number().typeError("Numero non valido");
					break;
				case FieldType.DATETIME:
					validator = yup.date().typeError("Data non valido");
					break;
				case FieldType.SINGLE_CHOICE:
					validator = yup.string(); //mettere controllo sulle option
					break;
				case FieldType.MULTIPLE_CHOICE:
					validator = yup.string(); //mettere controllo sulle option
					break;
				case FieldType.EMAIL:
					validator = yup.string().email("Email non valida");
					break;
				case FieldType.TELEPHONE_NUMBER:
					validator = yup.string();
					break;
				case FieldType.CHECKBOX:
					validator = yup.boolean();
				default:
					validator = yup.mixed();
			}

			if (field.isMandatory) {
				validator.required();
			}

			obj[field.id!] = validator;
		});
	});

	return yup.object(obj);
}