import { Alert, Button, List, ListItem } from "@mui/material";
import { IField } from "../../../models/form.models";
import { FormEditorField } from "./FormEditorField";
import styles from "../../../App.module.scss";
import AddIcon from '@mui/icons-material/Add';

export interface IFormEditorProps {
	fields: IField[];
}

export function FormEditor(props: IFormEditorProps) {
	const { fields } = props;

	const onNewFieldClick = () => {

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
							fields.map((f, idx) => <FormEditorField field={f} key={idx} />)
						}
					</List>
			}
		</>
	);
}