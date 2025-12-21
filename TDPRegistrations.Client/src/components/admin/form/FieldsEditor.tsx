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

	const onFieldDeleted = (field: IField): void => {
		const updatedFields = fields
			.filter(f => f.order !== field.order)
			.map((f, idx) => ({
				...f,
				order: idx
			}));
		props.onFieldsUpdated(updatedFields);
	}

	const onFieldUpdated = (field: IField): void => {
		const updatedFields = fields.map(f =>
			f.order === field.order ? {...f, ...field} : f
		);
		props.onFieldsUpdated(updatedFields);
	}

	return (
		<>
			{
				fields.length === 0
					? <Alert severity="info">{FieldsEditorStr.NoFields}</Alert >
					: <List className={styles.fieldsEditor}>
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
		</>
	);
}