import { Alert, Button, List, ListItem } from "@mui/material";
import { IField } from "../../../models/form.models";
import { FieldEditor } from "./FieldEditor";
import styles from "../../../App.module.scss";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { NewFieldModal } from "./NewFieldModal";
import { sortFields } from "../../../utils/forms.utils";
import { STRINGS } from "../../../consts/strings.consts";
const FieldsEditorStr = STRINGS.Pages.AdminForm.FieldsEditor;
export interface IFormEditorProps {
	fields: IField[];
	onFieldsUpdated: (fields: IField[]) => void;
}

export function FieldsEditor(props: IFormEditorProps) {
	const fields: IField[] = JSON.parse(JSON.stringify(props.fields));
	const [newFieldModalOpen, setNewFieldModalOpen] = useState(false);

	const onNewFieldClick = () => {
		setNewFieldModalOpen(true);
	}

	const onNewFieldModalClose = (): void => {
		setNewFieldModalOpen(false);
	}

	const onFieldDeleted = (field: IField): void => {
		const updatedFields = fields
			.filter(f => f.order !== field.order)
			.map((f, idx) => ({
				...f,
				order: idx
			}));
		props.onFieldsUpdated(updatedFields);
	}

	const onFieldCreated = (field: IField): void => {
		const order: number = fields.length + 1;
		field.order = order;
		fields.push(field);
		props.onFieldsUpdated(fields);
		setNewFieldModalOpen(false);
	}

	const onFieldUpdated = (field: IField): void => {
		const updatedFields = fields.map(f =>
			f.order === field.order ? {...f, ...field} : f
		);
		props.onFieldsUpdated(updatedFields);
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
					? <Alert severity="info">{FieldsEditorStr.NoFields}</Alert >
					: <List className={styles.formEditor}>
						{
							fields.sort(sortFields)
								.map((f, idx) =>
									<FieldEditor
										field={f}
										key={idx}
										onUpdated={onFieldUpdated}
										onDeleted={onFieldDeleted} />)
						}
					</List>
			}

			<NewFieldModal
				open={newFieldModalOpen}
				onClose={onNewFieldModalClose}
				onFieldCreated={onFieldCreated} />
		</>
	);
}