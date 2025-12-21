import styles from "../../../App.module.scss";
import { IField, IFieldBaseProps } from "../../../models/form.models";

export function DateTimeField(props: IFieldBaseProps) {
	const { field } = props;

	return <div
		className={styles.form}>{field.label}</div>
}