import { Modal } from "@mui/material";
import styles from "../../../App.module.scss";
import { IField } from "../../../models/form.models";
import { FieldForm } from "../forms/FieldForm";

interface IEditFieldModalProps {
	open: boolean;
	field: IField;
	onUpdated: (field: IField) => void;
	onClose: () => void;
}


export function EditFieldModal(props: IEditFieldModalProps) {

	const onSubmit = (data: any) => {
		props.onUpdated(data);
	}

	return <Modal open={props.open} onClose={props.onClose}>
		<div className={styles.modal}>
			<FieldForm
				onSubmit={onSubmit}
				currentField={props.field} />
		</div>
	</Modal>;
}