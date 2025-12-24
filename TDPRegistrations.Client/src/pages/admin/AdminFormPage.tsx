import { useNavigate, useParams } from "react-router-dom";
import { AdminPageWrapper } from "./AdminPageWrapper";
import { useEffect, useRef, useState } from "react";
import { Errors } from "../../consts/errors.consts";
import React from "react";
import { Alert, Box, Chip, CircularProgress, Tab, Tabs, Typography } from "@mui/material";
import { Routes } from "../../consts/routes.consts";
import styles from "../../App.module.scss";
import { useFormById, useUpdateForm } from "../../queries/forms.queries";
import { ErrorMessage } from "../../components/ErrorMessage";
import { STRINGS } from "../../consts/strings.consts";
import { IUpdateFormRequest } from "../../models/api.models";
import FilesService from "../../services/files.service";
import { FormEditor } from "../../components/admin/form/FormEditor";
import { CopyUrlButton } from "../../components/admin/form/CopyUrlButton";
const FormPage = STRINGS.Pages.AdminForm;

export function AdminFormPage() {
	const params = useParams();
	const navigate = useNavigate();
	const id: string | undefined = params.id;
	const updateForm = useUpdateForm();
	const [tabValue, setTabValue] = useState(0);

	const onUpdate = async (data: IUpdateFormRequest): Promise<void> => {
		await updateForm.mutateAsync(data);
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

	const form = response?.value!;

	if (isLoading) {
		return <CircularProgress />;
	}

	return (
		<AdminPageWrapper
			className={styles.adminFormPage}
			title={form.title}>

			<Box component="div" className={styles.actionsBar}>
				<Typography component="h3" className={styles.section}>
					<b>{FormPage.Registrations} &nbsp;</b>{
						form.isOpen
							? <Chip label={STRINGS.OpenPlural} color="success" variant="filled" />
							: <Chip label={STRINGS.ClosedPlural} color="error" variant="filled" />
					}
				</Typography>

				<CopyUrlButton formSlug={form.slug} />
			</Box>

			<Box>
				<Tabs value={tabValue}
					className={styles.tabsContainer}
					onChange={(e, value) => setTabValue(value)}>
					<Tab label={FormPage.Editor} className={styles.tabItem} />
					<Tab label={FormPage.Answers} className={styles.tabItem} />
					<Tab label={FormPage.Analytics} className={styles.tabItem} />
				</Tabs>
			</Box>

			{
				(!form || updateForm.isPending) && <CircularProgress />
			}

			{
				(updateForm.error) &&
				<Alert severity="error">
					<ErrorMessage errorCode={STRINGS.GenericError} />
				</Alert>
			}

			{
				(response?.error?.description) && <Alert severity="error">
					<ErrorMessage errorCode={response?.error?.code} />
				</Alert>
			}

			{tabValue === 0 && <FormEditor form={form} isLoading={updateForm.isPending} onUpdate={onUpdate} />}
		</AdminPageWrapper>
	);
}
