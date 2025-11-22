import { useNavigate, useParams } from "react-router-dom";
import { AdminPageWrapper } from "./AdminPageWrapper";
import { useEffect } from "react";
import { Errors } from "../../consts/errors.consts";
import React from "react";
import { IForm } from "../../models/form.models";
import { Alert, Box, Chip, CircularProgress, Grid, Typography } from "@mui/material";
import { Routes } from "../../consts/routes.consts";
import { FieldsEditor } from "../../components/admin/form/FieldsEditor";
import styles from "../../App.module.scss";
import { useFormBySlug } from "../../queries/forms.queries";
import { ErrorMessage } from "../../components/ErrorMessage";

export function AdminFormPage() {
	const params = useParams();
	const navigate = useNavigate();
	const slug: string | undefined = params.slug;

	if (!slug) {
		navigate(Routes.NotFound);
		return;
	}

	const { data: response, isLoading, error } = useFormBySlug(slug);

	if (response?.error && response.error.code === Errors.Form.NotFound) {
		navigate(Routes.NotFound);
		return;
	}

	const form = response?.value;

	if (!form) {
		return <CircularProgress />;
	}

	{
		response?.error?.description &&
			<Alert severity="error">
				<ErrorMessage errorCode={response?.error?.code} />
			</Alert>
	}

	return (
		<AdminPageWrapper
			className={styles.adminFormPage}
			title={form.title}>
			<Box component="h1"></Box>
			<h2>Mettere bottone apertura/chiusura iscrizioni</h2>
			<Grid container spacing={2} className={styles.leftColumn}>
				<Grid size={{ xs: 12, md: 6 }}>
					<h2>Informazioni</h2>
					<Typography component="h3">
						<b>Stato&nbsp;</b>{
							form.isOpen
								? <Chip label="Aperte" color="success" variant="filled" />
								: <Chip label="Chiuse" color="error" variant="filled" />
						}
					</Typography>


					<Typography component="h3">
						<b>Descrizione</b>
					</Typography>
					<Typography component="p">
						{form.description}
					</Typography>
				</Grid>
				<Grid size={{ xs: 12, md: 6 }}>
					<FieldsEditor fields={form.fields} />
				</Grid>
			</Grid>
		</AdminPageWrapper>
	);
}
