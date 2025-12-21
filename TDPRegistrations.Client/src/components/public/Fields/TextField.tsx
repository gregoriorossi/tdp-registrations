import styles from "../../../App.module.scss";
import { IField, IFieldBaseProps } from "../../../models/form.models";
import { TextField as MuiTextField } from "@mui/material";

export function TextField(props: IFieldBaseProps) {
	const { field, errors, register } = props;

	return <div className={styles.field}>
		<MuiTextField
			label={field.label}
			{...register(field.id!)}
			fullWidth
			error={!!errors[field.id!]}
			helperText={(errors[field.id!]?.message as string) ?? ''} />
	</div>;
}