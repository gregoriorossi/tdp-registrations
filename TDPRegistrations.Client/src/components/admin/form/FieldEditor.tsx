import { Box, Chip, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { IField } from "../../../models/form.models";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import styles from "../../../App.module.scss";
import { FieldIcon } from "../FieldIcon";
import React from "react";
import axiosClient from "../../../api/axios";
import ConfirmationDialog from "../ConfirmationDialog";
import { EditFieldModal } from "../modals/EditFieldModal";
import { STRINGS } from "../../../consts/strings.consts";
import EmergencyIcon from '@mui/icons-material/Emergency';

export interface IFormEditorFieldProps {
	field: IField;
	onDeleted: (field: IField) => void;
	onUpdated: (field: IField) => void;
}

export function FieldEditor(props: IFormEditorFieldProps) {
	const { field, onDeleted } = props;
	const [deleteFormDialogOpen, setDeleteFormDialogOpen] = React.useState(false);
	const [editFieldModalOpen, setEditFieldModalOpen] = React.useState(false);

	const onDeleteClick = (): void => {
		setDeleteFormDialogOpen(true);
	}

	const onDeleteFormHandler = (): void => {
		onDeleted(field);
		setDeleteFormDialogOpen(false);
	}

	const onEditClick = (): void => {
		setEditFieldModalOpen(true);
	}

	const onEditModalClose = (): void => {
		setEditFieldModalOpen(false);
	}

	const onUpdated = (field: IField): void => {
		setEditFieldModalOpen(false);
		props.onUpdated(field);
	}


	return <ListItem draggable={true} className={styles.fieldEditor}>
		<div className={styles.firstRow}>
			<DragIndicatorIcon className={styles.draggable} />
			<FieldIcon fieldType={field.type} />&nbsp;
			<ListItemText primary={`${field.label} ${field.isMandatory ? '*' : ''}`} />
			<div className={styles.actionContainer}>
				<ListItemButton onClick={onEditClick}>
					<ListItemIcon className={styles.button}>
						<CreateIcon />
					</ListItemIcon>
				</ListItemButton>
				<ListItemButton onClick={onDeleteClick}>
					<ListItemIcon className={styles.button}>
						<DeleteIcon />
					</ListItemIcon>
				</ListItemButton>
			</div>
		</div>
		<div className={styles.secondRow}>
			{field.options.map((o, idx) =>
				<Chip label={o.label} color="info" variant="filled" className={styles.option} key={idx} />)}
		</div>

		<EditFieldModal
			field={field}
			onClose={onEditModalClose}
			onUpdated={onUpdated}
			open={editFieldModalOpen} />

		<ConfirmationDialog
			isOpen={deleteFormDialogOpen}
			title={STRINGS.Modals.DeleteForm.Title}
			cancelBtnLabel={STRINGS.Cancel}
			confirmBtnLabel={STRINGS.Delete}
			content={STRINGS.Modals.DeleteForm.Content}
			onCancel={() => { setDeleteFormDialogOpen(false) }}
			onClose={() => { setDeleteFormDialogOpen(false) }}
			onConfirm={onDeleteFormHandler} />
	</ListItem>
}