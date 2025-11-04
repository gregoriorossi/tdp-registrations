import { useNavigate, useParams } from "react-router-dom";
import { AdminPageWrapper } from "./AdminPageWrapper";
import { useEffect } from "react";
import { getFormBySlug } from "../../services/forms.service";
import { Errors } from "../../consts/errors.consts";
import React from "react";
import { IForm } from "../../models/form.models";
import { Box, Chip } from "@mui/material";

export function AdminFormPage() {
	const params = useParams();
	const navigate = useNavigate();
	const slug: string | undefined = params.slug;

	const [form, setForm] = React.useState<IForm>({
		dateCreated: '',
		id: '',
		isOpen: false,
		slug: '',
		title: ''
	});

	useEffect(() => {
		// se vuoto andare in 404
		const fetchForm = async () => {
			const result = await getFormBySlug(params.slug!);

			if (result.error && result.error.code === Errors.Form.NotFound) {
				navigate('/not-found');
				return;
			}

			setForm(result.value);
		}

		fetchForm();
	}, []);

	return (
		<AdminPageWrapper>
			<Box component="h1">{form.title}</Box>
			<Box component="div">
				{
					form.isOpen
						? <Chip label="Aperte" color="success" variant="filled" />
						: <Chip label="Chiuse" color="error" variant="filled" />
				}
			</Box>
			<Box component="section">
				
			</Box>
		</AdminPageWrapper>
	);
}
