import { useNavigate, useParams } from "react-router-dom";
import { AdminPageWrapper } from "./AdminPageWrapper";
import { useEffect } from "react";
import { getFormBySlug } from "../../services/forms.service";
import { Errors } from "../../consts/errors.consts";
import React from "react";
import { IForm } from "../../models/form.models";
import { Box, Chip, Grid, Typography } from "@mui/material";
import { Routes } from "../../consts/routes.consts";
import { FieldsEditor } from "../../components/admin/form/FieldsEditor";
import styles from "../../App.module.scss";

export function AdminFormPage() {
	const params = useParams();
	const navigate = useNavigate();
	const slug: string | undefined = params.slug;

	const [form, setForm] = React.useState<IForm>({
		dateCreated: '',
		id: '',
		isOpen: false,
		slug: '',
		title: '',
		fields: [],
		dateUpdated: '',
		description: ''
	});

	useEffect(() => {
		// se vuoto andare in 404
		const fetchForm = async () => {
			const result = await getFormBySlug(params.slug!);

			if (result.error && result.error.code === Errors.Form.NotFound) {
				navigate(Routes.NotFound);
				return;
			}

			setForm(result.value);
		}

		fetchForm();
	}, []);

	return (
		<AdminPageWrapper className={styles.adminFormPage}>
			<Box component="h1">{form.title}</Box>
			<h2>Mettere bottone apertura/chiusura iscrizioni</h2>
			<Grid container spacing={2} className={styles.leftColumn }>
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
