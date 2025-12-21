import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "../consts/routes.consts";
import { useFormBySlug } from "../queries/forms.queries";
import { Errors } from "../consts/errors.consts";
import { Box, CircularProgress, Grid } from "@mui/material";
import styles from "../App.module.scss";

import testeDiPietraLogo from '../assets/teste-di-pietra_logo.png';
import FilesService from "../services/files.service";
import { Form } from "../components/public/Form";

export function FormPage() {
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
	}

	if (isLoading) {
		return <CircularProgress />;
	}

	const form = response?.value!;

	// aggiungere controllo se la form è chiusa
	console.log(params);

	const bannerImageUrl: string | null = form.bannerImageId ? FilesService.getFileUrl(form.bannerImageId) : null;

	return (
		<Box className={styles.formPage}>
			<div className={styles.header}>
				<div className={styles.logo}>
					<img className={styles.logo} src={testeDiPietraLogo} />
				</div>
				<div className={styles.title}>
					<h1>{form.title}</h1>
				</div>
			</div>
			{
				bannerImageUrl &&
				<div className={styles.bannerContainer}
					style={{
						backgroundImage: `url(${bannerImageUrl})`
					}}>
				</div>
			}

			<p className={styles.formDescription}
				dangerouslySetInnerHTML={{ __html: form?.description }}></p>

			<Form form={form} />
		</Box>
	);
}