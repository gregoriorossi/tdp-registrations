import { Grid } from "@mui/material";
import testeDiPietraLogo from '../../assets/teste-di-pietra_logo.png';
import styles from "../../App.module.scss";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../consts/routes.consts";

interface IHeaderProps {
	title: string;
}

export function Header(props: IHeaderProps) {

	const navigate = useNavigate();

	const onLogoClick = () => {
		navigate(Routes.AdminHome)
	}

	return (
		<Grid container spacing={2} className={styles.adminHeader}>
			<Grid size={{ md: 3 }}>
				<img className={styles.logo} src={testeDiPietraLogo} onClick={onLogoClick} />
			</Grid>
			<Grid size={{ md: 9 }}>
				<h1>{props.title}</h1>
			</Grid>
		</Grid>
	);
}