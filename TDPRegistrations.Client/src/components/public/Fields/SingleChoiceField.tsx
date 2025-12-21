import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import styles from "../../../App.module.scss";
import { IField, IFieldBaseProps } from "../../../models/form.models";
import { Controller } from "react-hook-form";

export function SingleChoiceField(props: IFieldBaseProps) {
	const { field: currentField, errors, register, control } = props;

	return <FormControl
		error={!!errors[currentField.id!]}
		className={`${styles.field} ${styles.fullWidth}`}
		defaultValue={''}>
		<InputLabel>{currentField.label}</InputLabel>
		<Controller
			name={currentField.id!}
			control={control}
			render={({ field }) => (
				<Select label={currentField.label} {...field} fullWidth value={field.value ?? ''}>
					{
						currentField.options.map((o, idx) =>
							<MenuItem value={o.id} key={idx}>
								{o.label}
							</MenuItem>
						)
					}
				</Select>
			)} />
		{errors[currentField.id!] && (
			<Typography variant="caption" color="error">
				{errors[currentField.id!]?.message as string}
			</Typography>
		)}
	</FormControl>;
}