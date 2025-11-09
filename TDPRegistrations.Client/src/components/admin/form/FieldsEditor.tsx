import { Alert, Button, List, ListItem } from "@mui/material";
import { IField } from "../../../models/form.models";
import { FieldEditor } from "./FieldEditor";
import styles from "../../../App.module.scss";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { NewFieldModal } from "./NewFieldModal";

export interface IFormEditorProps {
	fields: IField[];
}

export function FieldsEditor(props: IFormEditorProps) {
	const { fields } = props;
	const [newFieldModalOpen, setNewFieldModalOpen] = useState(false);

	const onNewFieldClick = () => {
		setNewFieldModalOpen(true);
	}

	const onNewFieldModalClose = (): void => {
		setNewFieldModalOpen(false);
	}

	return (
		<>
			<h2>Campi della form&nbsp;
				<Button onClick={onNewFieldClick}
					title="Aggiungi campo"
					variant="contained"><AddIcon /></Button>
			</h2>
			<div>
			</div>
			{
				fields.length === 0
					? <Alert severity="info">Nessun campo definito per questa form</Alert >
					: <List className={styles.formEditor}>
						{
							fields.map((f, idx) => <FieldEditor field={f} key={idx} />)
						}
					</List>
			}

			<NewFieldModal open={newFieldModalOpen} onClose={onNewFieldModalClose} />
		</>
	);
}