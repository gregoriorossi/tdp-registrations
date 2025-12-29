import { Alert, Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import *  as yup from "yup";
import { STRINGS } from "../../consts/strings.consts";
import { loginFormSchema } from "../../consts/forms.consts";
import AuthService from "../../services/auth.service";
import { useLogin } from "../../queries/auth.queries";
import DangerousIcon from '@mui/icons-material/Dangerous';
import LoginIcon from '@mui/icons-material/Login';
import styles from "../../App.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Routes } from "../../consts/routes.consts";

const LoginPage = STRINGS.Pages.AdminLogin;

interface ILoginFormValues {
	username: string;
	password: string;
}

export function AdminLoginPage() {
	const navigate = useNavigate();
	const { data, isPending, error, mutateAsync: useLoginAsync } = useLogin();
	const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(loginFormSchema)
	});

	const onSubmitLogin = async (data: ILoginFormValues) => {
		const result = await useLoginAsync({
			password: data.password,
			username: data.username
		});


		if (result.authenticated) {
			navigate(Routes.AdminHome);
			return;
		}

		setShowErrorMessage(true);
	}

	return <Box className={styles.loginPage}>
		<Box component="form"
			className={styles.form}
			onSubmit={(e) => {
				handleSubmit(onSubmitLogin)(e);
			}}>

			<Typography variant="h5" component="h2">
				<LoginIcon />&nbsp;{LoginPage.Title}
			</Typography>

			<TextField
				label={LoginPage.Form.Username}
				{...register("username")}
				autoComplete="on"
				error={!!errors.username}
				fullWidth
				helperText={errors.username?.message} />

			<TextField
				label={LoginPage.Form.Password}
				{...register("password")}
				type="password"
				autoComplete="off"
				fullWidth
				error={!!errors.password}
				helperText={errors.password?.message} />

			<Button type="submit" variant="contained">
				{LoginPage.Form.Submit}
			</Button>

			{
				isPending &&
				<Box component="div">
					<CircularProgress />
				</Box>
			}

			{
				(showErrorMessage && !isPending) &&
				<Alert severity="error" icon={<DangerousIcon />}>
					{LoginPage.Form.Errors.WrongCredentials}
				</Alert>
			}
		</Box>
	</Box>;
}