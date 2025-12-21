import { TextField } from "@mui/material";
import styles from "../../../App.module.scss";
import { IField, IFieldBaseProps } from "../../../models/form.models";

export function NumberField(props: IFieldBaseProps) {
	const { field, errors, register } = props;

	return <div className={styles.field}>
		<TextField
			label={field.label}
			{...register(field.id!)}
			fullWidth
			type="number"
			error={!!errors.title}
			className={`${styles.field}`}
			helperText={(errors[field.id!]?.message as string) ?? ''} />
	</div>;
}