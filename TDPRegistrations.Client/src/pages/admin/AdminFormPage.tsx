import { useNavigate, useParams } from "react-router-dom";
import { AdminPageWrapper } from "./AdminPageWrapper";
import { useEffect, useRef, useState } from "react";
import { Errors } from "../../consts/errors.consts";
import React from "react";
import { IField, IForm } from "../../models/form.models";
import { Alert, Box, Button, Chip, CircularProgress, Grid, Icon, TextField, Typography } from "@mui/material";
import { Routes } from "../../consts/routes.consts";
import { FieldsEditor } from "../../components/admin/form/FieldsEditor";
import styles from "../../App.module.scss";
import { useFormById, useUpdateForm } from "../../queries/forms.queries";
import { ErrorMessage } from "../../components/ErrorMessage";
import {
	MenuButtonBold,
	MenuButtonBulletedList,
	MenuButtonItalic,
	MenuControlsContainer,
	MenuDivider,
	MenuSelectHeading,
	RichTextEditor,
	type RichTextEditorRef,
} from "mui-tiptap";
import *  as yup from "yup";
import StarterKit from "@tiptap/starter-kit";
import { STRINGS } from "../../consts/strings.consts";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SaveIcon from '@mui/icons-material/Save';
const FormPage = STRINGS.Pages.AdminForm;

const schema = yup.object({
	title: yup.string().required(STRINGS.Pages.AdminForm.Form.ErrorMessages.TitleMandatory),
	description: yup.string()
});

interface IFormData {
	title: string;
	description?: string | undefined;
}

export function AdminFormPage() {
	const params = useParams();
	const navigate = useNavigate();
	const id: string | undefined = params.id;
	const updateForm = useUpdateForm();
	const rteRef = useRef<RichTextEditorRef>(null);
	const [fields, setFields] = useState<IField[]>([]);
	const [initialized, setInitialized] = useState(false);

	const { handleSubmit, control, register, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	});

	const onSubmit = async (data: IFormData, form: IForm): Promise<void> => {
		console.log(data);
		const updatedForm: IForm = {
			...form,
			title: data.title,
			description: data?.description ?? '',
			fields: fields
		}

		await updateForm.mutateAsync(updatedForm);
	}

	const onFieldsUpdate = (updatedFields: IField[]): void => {
		console.log('fields', updatedFields);
		setFields(updatedFields);
	}


	if (!id) {
		navigate(Routes.NotFound);
		return;
	}

	const { data: response, isLoading, error } = useFormById(id);

	if (response?.error && response.error.code === Errors.Form.NotFound) {
		navigate(Routes.NotFound);
		return;
	}

	const form = response?.value;

	useEffect(() => {
		if (form && !initialized) {
			setFields(form.fields);
			setInitialized(true);
		}
	}, [form, initialized]);

	if (!form || updateForm.isPending) {
		return <CircularProgress />;
	}

	if (updateForm.error) {
		return <Alert severity="error">
			<ErrorMessage errorCode={STRINGS.GenericError} />
		</Alert>;
	}

	if (response?.error?.description) {
		return <Alert severity="error">
			<ErrorMessage errorCode={response?.error?.code} />
		</Alert>;
	}

	return (
		<AdminPageWrapper
			className={styles.adminFormPage}
			title={form.title}>
			<Box component="form"
				onSubmit={handleSubmit((data) => onSubmit(data, form))}>
				<Box component="div" className={styles.actionsBar}>
					<Typography component="h3" className={styles.section}>
						<b>{FormPage.Registrations} &nbsp;</b>{
							form.isOpen
								? <Chip label={STRINGS.OpenPlural} color="success" variant="filled" />
								: <Chip label={STRINGS.ClosedPlural} color="error" variant="filled" />
						}
					</Typography>

					<Box>
						<Button
							variant="contained"
							type="submit"
							disabled={updateForm.isPending}>
							<SaveIcon />&nbsp;{STRINGS.Save}
						</Button>
					</Box>
				</Box>
				<Box>
					{
						updateForm?.data?.isFailure &&
						<Alert severity="error">
							<ErrorMessage errorCode={updateForm?.data?.error?.code!} />
						</Alert>
					}
				</Box>
				<Grid container spacing={2} className={styles.leftColumn}>
					<Grid size={{ xs: 12, md: 6 }}>

						<TextField
							label={STRINGS.Pages.AdminForm.Form.TitleLabel}
							{...register("title")}
							error={!!errors.title}
							className={`${styles.section} ${styles.fullWidth}`}
							helperText={errors.title?.message}
							defaultValue={form.title} />
						<Controller
							name="description"
							control={control}
							defaultValue={form.description}
							render={({ field: { value, onChange } }) => (
								<RichTextEditor
									ref={rteRef}
									className={styles.section}
									extensions={[StarterKit]}
									content={value}
									onUpdate={({ editor }) => {
										onChange(editor.getHTML())
									}}
									renderControls={() => (
										<MenuControlsContainer>
											<MenuSelectHeading />
											<MenuDivider />
											<MenuButtonBold />
											<MenuButtonItalic />
											<MenuButtonBulletedList />
										</MenuControlsContainer>
									)} />
							)}
						/>

					</Grid>
					<Grid size={{ xs: 12, md: 6 }}>
						<FieldsEditor
							fields={fields}
							onFieldsUpdated={onFieldsUpdate} />
					</Grid>
				</Grid>
			</Box>
		</AdminPageWrapper>
	);
}
