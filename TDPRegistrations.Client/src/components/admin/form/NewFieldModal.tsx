import { Modal } from "@mui/material";
import styles from "../../../App.module.scss";
import { FieldForm } from "../forms/FieldForm";
import { IField } from "../../../models/form.models";

interface INewFieldModalProps {
	open: boolean;
	onClose: () => void;
	onFieldCreated: (field: IField) => void;
}

export function NewFieldModal(props: INewFieldModalProps) {

	return <Modal open={props.open} onClose={props.onClose}>
		<div className={styles.modal}>
			<FieldForm
				onSubmit={props.onFieldCreated} />
		</div>
	</Modal>;
}