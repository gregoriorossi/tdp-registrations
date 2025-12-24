import styles from "../../../App.module.scss";
import { IField, IFieldBaseProps } from "../../../models/form.models";
import { Checkbox, FormControl, FormControlLabel, TextField as MuiTextField } from "@mui/material";

export function CheckboxField(props: IFieldBaseProps) {
	const { field, errors, register } = props;

	return <div className={`${styles.field} ${styles.checkboxField}`}>
		<FormControl>
			<FormControlLabel
				label={field.label}
				control={
					<Checkbox
						{...register(field.id!)} />
				} />
		</FormControl>
	</div>;
}