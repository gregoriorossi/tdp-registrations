import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import *  as yup from "yup";
import styles from "../../../App.module.scss";
import { Box, Button, TextField, Typography } from "@mui/material";
interface INewFormFormProps {
	onSubmit: (data: any) => void;
}

const schema = yup.object({
	name: yup.string().required("Il nome della form è obbligatorio")
});

export function NewFormForm(props: INewFormFormProps) {
	const { handleSubmit, register, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	});

	const onSubmit = (data: any) => {
		console.log(data);
		props.onSubmit(data);
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

		<Button type="submit" variant="contained">
			Crea
		</Button>
	</Box>;
}