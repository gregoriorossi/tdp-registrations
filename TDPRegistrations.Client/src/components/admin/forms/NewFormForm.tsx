import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import *  as yup from "yup";
import styles from "../../../App.module.scss";
import { Alert, Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useCreateForm } from "../../../queries/forms.queries";
import { ERROR_STRINGS, STRINGS } from "../../../consts/strings.consts";
import { ErrorMessage } from "../../ErrorMessage";

interface INewFormFormProps {
	onSubmit: () => void;
}

interface INewFormFields {
	name: string;
}

const schema = yup.object({
	name: yup.string().required("Il nome della form è obbligatorio")
});

export function NewFormForm(props: INewFormFormProps) {
	const { handleSubmit, register, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	});
	const addForm = useCreateForm();

	const onSubmit = async (data: INewFormFields): Promise<void> => {
		console.log(data);
		await addForm.mutateAsync(data.name);

		if (!addForm.data?.error?.description?.length) {
			props.onSubmit();
		}
	}

	return <Box className={styles.form}
		component="form"
		onSubmit={handleSubmit(onSubmit)}	>
		<Typography variant="h5" component="h2">Nuova form</Typography>

		<TextField
			label="Nome"
			{...register("name")}
			error={!!errors.name}
			helperText={errors.name?.message} />

		{
			addForm.isPending && <CircularProgress />
		}

		{
			addForm.data?.error?.description &&
			<Alert severity="error">
				<ErrorMessage errorCode={addForm?.data?.error?.code} />
			</Alert>
		}

		<Button type="submit" variant="contained" disabled={addForm.isPending}>
			{STRINGS.Create}
		</Button>
	</Box>;
}