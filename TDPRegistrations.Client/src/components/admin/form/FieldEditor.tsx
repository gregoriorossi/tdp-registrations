import { Box, Chip, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { IField } from "../../../models/form.models";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import styles from "../../../App.module.scss";
import { FieldIcon } from "../FieldIcon";
import React from "react";
import api from "../../../api/axios";
import { TDPEndpoints } from "../../../consts/api.consts";
import ConfirmationDialog from "../ConfirmationDialog";

export interface IFormEditorFieldProps {
	field: IField;
}
export function FieldEditor(props: IFormEditorFieldProps) {
	const { field } = props;
	const [deleteFormDialogOpen, setDeleteFormDialogOpen] = React.useState(false);

	const onDeleteClick = (): void => {
		setDeleteFormDialogOpen(true);
	}

	const onDeleteFormHandler = (): void => {
		setDeleteFormDialogOpen(false);
		api.post(TDPEndpoints.Forms.Delete('test'));
	}



	return <ListItem draggable={true} className={styles.fieldEditor}>
		<div className={styles.firstRow}>
			<DragIndicatorIcon className={styles.draggable} />
			<FieldIcon fieldType={field.type} />&nbsp;
			<ListItemText primary={field.label} />
			<div className={styles.actionContainer}>
				<ListItemButton>
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
			{field.options.map((o) =>
				<Chip label={o.label} color="info" variant="filled" className={styles.option} />)}
		</div>
		<ConfirmationDialog
			isOpen={deleteFormDialogOpen}
			title="Vuoi eliminare il campo?"
			cancelBtnLabel="Cancella"
			confirmBtnLabel="Elimina"
			content="Una volta eliminato il campo verranno eliminate anche eventuali rispose associate"
			onCancel={() => { setDeleteFormDialogOpen(false) }}
			onClose={() => { setDeleteFormDialogOpen(false) }}
			onConfirm={onDeleteFormHandler} />
	</ListItem>
}