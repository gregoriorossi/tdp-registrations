import { FieldType } from "../models/form.models";
import { IFieldTypeValue } from "../models/shared.models";

export const fieldTypesOptions: IFieldTypeValue[] = [
    {
        Key: FieldType.EMPTY,
        Value: ""
    },
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