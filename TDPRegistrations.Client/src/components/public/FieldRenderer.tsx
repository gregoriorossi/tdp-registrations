import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FieldType, IField } from "../../models/form.models";
import { DateTimeField } from "./Fields/DateTimeField";
import { MultiChoiceField } from "./Fields/MultiChoiceField";
import { NumberField } from "./Fields/NumberField";
import { SingleChoiceField } from "./Fields/SingleChoiceField";
import { TextField } from "./Fields/TextField";

interface IFieldRendererProps {
	field: IField;
	errors: FieldErrors<{ [x: string]: any }>;
	register: UseFormRegister<{ [x: string]: any }>;
}

export function FieldRenderer(props: IFieldRendererProps) {
	const { field, errors, register } = props;

	switch (field.type) {
		case FieldType.TEXT:
		case FieldType.EMAIL:
		case FieldType.TELEPHONE_NUMBER:
			return <TextField field={field} errors={errors} register={register} />;
		case FieldType.NUMBER:
			return <NumberField field={field} errors={errors} register={register} />;
		case FieldType.DATETIME:
			return <DateTimeField field={field} errors={errors} register={register} />;
		case FieldType.SINGLE_CHOICE:
			return <SingleChoiceField field={field} errors={errors} register={register} />;
		case FieldType.MULTIPLE_CHOICE:
			return <MultiChoiceField field={field} errors={errors} register={register} />;
		default:
			return <TextField field={field} errors={errors} register={register} />;
	}
}