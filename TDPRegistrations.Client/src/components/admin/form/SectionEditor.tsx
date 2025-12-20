import { useForm } from "react-hook-form";
import { IField, ISection, ISectionFormValues } from "../../../models/form.models";
import *  as yup from "yup";
import { sectionFormSchema } from "../../../consts/forms.consts";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField } from "@mui/material";
import { STRINGS } from "../../../consts/strings.consts";
import { FieldsEditor } from "./FieldsEditor";
import styles from "../../../App.module.scss";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { NewFieldModal } from "./NewFieldModal";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ConfirmationDialog from "../ConfirmationDialog";
import { SectionModal } from "../modals/SectionModal";

const SectionForm = STRINGS.Modals.SectionForm;
const FormPage = STRINGS.Pages.AdminForm;

interface ISectionEditorProps {
	onChange: (section: ISection, index: number) => void;
	onRemove: (index: number) => void;
	idx: number;
	section: ISection;
}

export function SectionEditor(props: ISectionEditorProps) {
	const { section, onChange, idx } = props;
	const [newFieldModalOpen, setNewFieldModalOpen] = useState(false);
	const [deleteSectionDialogOpen, setDeleteSectionDialogOpen] = useState(false);
	const [editSectionModalOpen, setEditSectionModalOpen] = useState(false);

	const onNewFieldClick = () => {
		setNewFieldModalOpen(true);
	}

	const onNewFieldModalClose = (): void => {
		setNewFieldModalOpen(false);
	}

	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(sectionFormSchema)
	});

	const onFieldsUpdate = (fields: IField[]) => {
		const newSection: ISection = {
			...section,
			fields: fields
		};
		onChange(newSection, idx);
	}

	const onFieldCreated = (field: IField): void => {
		const order: number = section.fields.length + 1;
		field.order = order;
		section.fields.push(field);
		//props.onFieldsUpdated(fields);
		setNewFieldModalOpen(false);
	}

	const onSectionUpdate = (data: ISection) => {
		const newSection: ISection = {
			...section,
			title: data.title,
			description: data.description
		};
		onChange(newSection, idx);
		setEditSectionModalOpen(false);
	}

	return <div className={styles.sectionEditor}>
		<h3>{section.title}
			<span>
				<Button onClick={() => setEditSectionModalOpen(true)}
					title={FormPage.SectionEditor.EditSection}
					variant="contained"><EditIcon />
				</Button>&nbsp;
				<Button onClick={() => setDeleteSectionDialogOpen(true)}
					title={FormPage.SectionEditor.DeleteSection}
					variant="contained"><DeleteIcon />
				</Button>
			</span>

		</h3>
		<p>{section?.description}</p>
		<Button onClick={onNewFieldClick}
			title={FormPage.Form.NewField}
			variant="contained"><AddIcon />
			{FormPage.Form.NewField}
		</Button>&nbsp;

		<FieldsEditor
			fields={section.fields}
			onFieldsUpdated={onFieldsUpdate} />

		<NewFieldModal
			open={newFieldModalOpen}
			onClose={onNewFieldModalClose}
			onFieldCreated={onFieldCreated} />

		<SectionModal
			open={editSectionModalOpen}
			onClose={() => setEditSectionModalOpen(false)}
			section={section}
			onSubmit={onSectionUpdate} />

		<ConfirmationDialog
			isOpen={deleteSectionDialogOpen}
			title={STRINGS.Modals.DeleteSection.Title}
			cancelBtnLabel={STRINGS.Cancel}
			confirmBtnLabel={STRINGS.Delete}
			content={STRINGS.Modals.DeleteSection.Content}
			onCancel={() => { setDeleteSectionDialogOpen(false) }}
			onClose={() => { setDeleteSectionDialogOpen(false) }}
			onConfirm={() => {
				props.onRemove(props.idx);
				setDeleteSectionDialogOpen(false);
			}} />
	</div>;

}