import { STRINGS } from "../consts/strings.consts";
import { IFieldFormValues, IField, IForm, FieldType, ISection } from "../models/form.models";
import *  as yup from "yup";
import { FormPage } from "../pages/FormPage";
const FormString = STRINGS.Pages.Form;

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

export const sortSections = (s1: ISection, s2: ISection): number => {
	return s1.order > s2.order ? 1 : -1;
}

export const buildDynamicFormSchema = (form: IForm) => {
	const obj: { [id: string]: any } = {
		"privacyAccepted": yup.boolean().isTrue(FormString.Errors.PrivacyMandatory)
	};

	form.sections.forEach(section => {
		section.fields.forEach(field => {
			let validator;
			const options: string[] = (field.options ?? []).map(f => f.id);

			switch (field.type) {
				case FieldType.TEXT:
					validator = yup.string();
					break;
				case FieldType.NUMBER:
					validator = yup.number().typeError(FormString.Errors.InvalidNumber);
					break;
				case FieldType.DATETIME:
					validator = yup.date().typeError(FormString.Errors.InvalidDate);
					break;
				case FieldType.SINGLE_CHOICE:
					validator = yup.mixed()
						.oneOf(options, FormString.Errors.InvalidSelection);
					break;
				case FieldType.MULTIPLE_CHOICE:
					validator = yup
						.array()
						.of(yup.string().oneOf(options))
						.typeError(FormString.Errors.InvalidSelection);
					break;
				case FieldType.EMAIL:
					validator = yup.string().email(FormString.Errors.InvalidEmail);
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
				validator.required(STRINGS.Pages.Form.Errors.PrivacyMandatory);
			}

			obj[field.id!] = validator;
		});
	});

	return yup.object(obj);
}