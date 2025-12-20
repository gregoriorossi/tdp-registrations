import { FieldType } from "../models/form.models";
import { IFieldTypeValue } from "../models/shared.models";
import *  as yup from "yup";
import { STRINGS } from "./strings.consts";
import {
	MenuButtonBold,
	MenuButtonBulletedList,
	MenuButtonItalic,
	MenuControlsContainer,
	MenuDivider,
	MenuSelectHeading,
	RichTextEditor,
	type RichTextEditorRef,
} from "mui-tiptap";

const ERROR_MESSAGES = STRINGS.Modals.FieldForm.ErrorMessages;

export const fieldTypesOptions: IFieldTypeValue[] = [
	{
		Key: FieldType.TEXT,
		Value: "Testo"
	},
	{
		Key: FieldType.NUMBER,
		Value: "Numero"
	},
	{
		Key: FieldType.DATETIME,
		Value: "Data"
	},
	{
		Key: FieldType.SINGLE_CHOICE,
		Value: "Scelta singola"
	},
	{
		Key: FieldType.MULTIPLE_CHOICE,
		Value: "Scelta multipla"
	},
	{
		Key: FieldType.EMAIL,
		Value: "Email"
	},
	{
		Key: FieldType.TELEPHONE_NUMBER,
		Value: "Numero di telefono"
	},
];

export const fieldTypesArray: FieldType[] = [
	FieldType.EMPTY,
	FieldType.TEXT,
	FieldType.NUMBER,
	FieldType.DATETIME,
	FieldType.TELEPHONE_NUMBER,
	FieldType.SINGLE_CHOICE,
	FieldType.MULTIPLE_CHOICE,
	FieldType.EMAIL
];

export const MAX_IMAGE_SIZE = 3 * 1024 * 1024; // 3MB
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

const AdminForm = STRINGS.Pages.AdminForm;

export const adminFormSchema = yup.object({
	title: yup.string().required(AdminForm.Form.ErrorMessages.TitleMandatory),
	description: yup.string(),
	privacyDisclaimer: yup.string(),
	bannerImage: yup
		.mixed<File>()
		.nullable()
		.optional()
		.test('fileSize', AdminForm.Form.ErrorMessages.ImageTooLarge, (file) => !file || file.size <= MAX_IMAGE_SIZE),
	privacyAttachment: yup
		.mixed<File>()
		.nullable()
		.optional()
		.test('fileSize', AdminForm.Form.ErrorMessages.FileTooLarge, (file) => !file || file.size <= MAX_FILE_SIZE),
});

export const fieldFormSchema = yup.object({
	label: yup.string().required(ERROR_MESSAGES.NameMandatory),
	description: yup.string(),
	type: yup.mixed().oneOf(fieldTypesArray).required(ERROR_MESSAGES.TypeMandatory),
	mandatory: yup.bool(),
	options: yup.array()
		.of(yup.string())
		.when('type', {
			is: (type: FieldType) => type !== FieldType.SINGLE_CHOICE && type !== FieldType.MULTIPLE_CHOICE,
			then: (schema) => schema.max(0, 'Valori non ammessi se il campo non è di tipo scelta'),
			otherwise: (schema) => schema.min(1, 'Devi inserire almeno un valore')
		})
});

export const sectionFormSchema = yup.object({
	title: yup.string().required(AdminForm.Form.ErrorMessages.TitleMandatory),
	description: yup.string()
});
