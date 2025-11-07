import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
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
export function FormEditorField(props: IFormEditorFieldProps) {
	const { field } = props;
	const [deleteFormDialogOpen, setDeleteFormDialogOpen] = React.useState(false);

	const onDeleteClick = (): void => {
		setDeleteFormDialogOpen(true);
	}

	const onDeleteFormHandler = (): void => {
		setDeleteFormDialogOpen(false);
		api.post(TDPEndpoints.Forms.Delete('test'));
	}

	return <ListItem draggable={true} className={styles.formEditorField}>
		<DragIndicatorIcon className={styles.draggable} />
		<FieldIcon fieldType={field.type} />
		<ListItemText primary={field.label}>
		</ListItemText>
		<div className={styles.actionContainer}>
			<ListItemButton>
				<ListItemIcon>
					<CreateIcon />
				</ListItemIcon>
			</ListItemButton>
			<ListItemButton onClick={onDeleteClick }>
				<ListItemIcon>
					<DeleteIcon />
				</ListItemIcon>
			</ListItemButton>
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