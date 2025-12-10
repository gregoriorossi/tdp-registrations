import { FieldType } from "../models/form.models";
import { IFieldTypeValue } from "../models/shared.models";
import *  as yup from "yup";
import { STRINGS } from "./strings.consts";

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

const AdminForm = STRINGS.Pages.AdminForm;

export const adminFormSchema = yup.object({
    title: yup.string().required(AdminForm.Form.ErrorMessages.TitleMandatory),
    description: yup.string(),
    bannerImage: yup
        .mixed<File>()
        .nullable()
        .optional()
        .test('fileSize', AdminForm.Form.ErrorMessages.ImageTooLarge, (file) => !file || file.size <= MAX_IMAGE_SIZE)
});