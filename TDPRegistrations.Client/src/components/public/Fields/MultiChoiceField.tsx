import styles from "../../../App.module.scss";
import { IField, IFieldBaseProps } from "../../../models/form.models";
import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

export function MultiChoiceField(props: IFieldBaseProps) {
	const { field: currentField, errors, register, control } = props;

	return <FormControl
		error={!!errors.type}
		className={`${styles.field} ${styles.fullWidth}`}
		defaultValue={[]}>
		<InputLabel>{currentField.label}</InputLabel>
		<Controller
			name={currentField.id!}
			control={control}
			render={({ field }) => (
				<Select label={currentField.label}
					{...field} fullWidth multiple value={field.value ?? []}>
					{
						currentField.options.map((o, idx) =>
							<MenuItem value={o.id} key={idx}>
								{o.label}
							</MenuItem>
						)
					}
				</Select>
			)} />
		{errors.type && (
			<Typography variant="caption" color="error">
				{errors[currentField.id!]?.message as string}
			</Typography>
		)}
	</FormControl>;
}