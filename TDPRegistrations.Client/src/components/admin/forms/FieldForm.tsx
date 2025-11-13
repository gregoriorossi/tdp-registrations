import *  as yup from "yup";
import { FieldType, IField, IFieldOption } from "../../../models/form.models";
import { fieldTypesArray, fieldTypesOptions } from "../../../consts/forms.consts";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, Autocomplete, Chip, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import styles from "../../../App.module.scss";
import { FieldIcon } from "../FieldIcon";
import { STRINGS } from "../../../consts/strngs.consts";
export interface IFieldFormProps {
	onSubmit: (data: IField) => void;
	currentField?: IField;
}
const FIELD_FORM = STRINGS.Modals.FieldForm;
const ERROR_MESSAGES = STRINGS.Modals.FieldForm.ErrorMessages;

const schema = yup.object({
	name: yup.string().required(ERROR_MESSAGES.NameMandatory),
	description: yup.string(),
	type: yup.mixed().oneOf(fieldTypesArray).required(ERROR_MESSAGES.TypeMandatory),
	mandatory: yup.bool(),
	options: yup.array()
		.of(yup.string())
		.when('type', {
			is: FieldType.TEXT,
			then: (schema) => schema.max(0, 'Valori non ammessi se il campo non è di tipo scelta'),
			otherwise: (schema) => schema.min(1, 'Devi inserire almeno un valore')
		})
});

export function FieldForm(props: IFieldFormProps) {
	const { control, register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	});

	const typeOptions = JSON.parse(JSON.stringify(props.currentField?.options ?? []));
	const { currentField } = props;
	const onSubmit = (data: any) => {
		console.log(data);
		//props.onSubmit()
	}

	const formTitle: string = !currentField ? FIELD_FORM.NewField : FIELD_FORM.EditField;
	const submitButtonLabel: string = !currentField ? STRINGS.Create : STRINGS.Save;

	return <Box className={styles.form}
		component="form"
		onSubmit={handleSubmit(onSubmit)}>
		<Typography variant="h5" component="h2">{formTitle}</Typography>

		<TextField
			label={FIELD_FORM.NameLabel}
			{...register("name")}
			defaultValue={currentField?.label}
			error={!!errors.name}
			helperText={errors.name?.message} />

		<TextField
			label="Descrizione"
			{...register("description")}
			defaultValue={currentField?.description}
			error={!!errors.description}
			helperText={errors.description?.message} />

		<FormControl error={!!errors.type}>
			<InputLabel>{FIELD_FORM.TypeLabel}</InputLabel>
			<Controller
				name="type"
				control={control}
				rules={{ required: FIELD_FORM.TypePlaceholder }}
				defaultValue={currentField?.type ?? -1}
				render={({ field }) => (
					<Select labelId="ruolo-label" label="type" {...field}>
						{
							fieldTypesOptions.map((o, idx) =>
								<MenuItem value={o.Key} key={idx}>
									<FieldIcon fieldType={o.Key} />&nbsp;{o.Value}
								</MenuItem>
							)
						}
					</Select>
				)} />
			{errors.type && (
				<Typography variant="caption" color="error">
					{errors.type.message}
				</Typography>
			)}
		</FormControl>

		<FormControl>
			<FormControlLabel control={
				<Checkbox
					{...register("mandatory")}
					defaultValue={currentField?.isMandatory ? 1 : 0} />}
					label={FIELD_FORM.MandatoryLabel} />
		</FormControl>

		<Controller
			name="options"
			control={control}
			defaultValue={currentField?.options?.map(o => o.label) ?? []}
			render={({ field }) => {
				return (
					<Autocomplete
						multiple
						freeSolo
						options={currentField?.options ?? []}
						value={field.value}
						onChange={(e, newValue) => { field.onChange(newValue) }}
						renderValue={(tagValue, getTagProps) =>
							tagValue.map((option, index) => (
								<Chip
									variant="outlined"
									label={typeof option === 'string' ? option : option?.label}
									{...getTagProps({ index })}
									key={index}
								/>
							))
						}
						renderInput={(params) => (
							<TextField
								{...params}
								label={FIELD_FORM.OptionsLabel}
								placeholder={STRINGS.AddValue}
								error={!!errors.options}
								helperText={
									errors.options
										? Array.isArray(errors.options)
											? errors.options[0]?.message
											: errors.options.message
										: ""
								}
							/>
						)}
					/>
				);
			}} />
		<Button type="submit" variant="contained">
			{submitButtonLabel}
		</Button>
	</Box>;
}

