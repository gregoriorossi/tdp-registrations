import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { FieldType, IField } from "../../models/form.models";
import { DateTimeField } from "./Fields/DateTimeField";
import { MultiChoiceField } from "./Fields/MultiChoiceField";
import { NumberField } from "./Fields/NumberField";
import { SingleChoiceField } from "./Fields/SingleChoiceField";
import { TextField } from "./Fields/TextField";

interface IFieldRendererProps {
	field: IField;
	control: Control<{ [x: string]: any }>;
	errors: FieldErrors<{ [x: string]: any }>;
	register: UseFormRegister<{ [x: string]: any }>;
}

export function FieldRenderer(props: IFieldRendererProps) {
	const { field, errors, register, control } = props;

	switch (field.type) {
		case FieldType.TEXT:
		case FieldType.EMAIL:
		case FieldType.TELEPHONE_NUMBER:
			return <TextField {...props} />;
		case FieldType.NUMBER:
			return <NumberField {...props} />;
		case FieldType.DATETIME:
			return <DateTimeField {...props} />;
		case FieldType.SINGLE_CHOICE:
			return <SingleChoiceField {...props} />;
		case FieldType.MULTIPLE_CHOICE:
			return <MultiChoiceField {...props} />;
		default:
			return <TextField {...props} />;
	}
}