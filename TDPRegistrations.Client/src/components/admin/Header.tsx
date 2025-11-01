import { Grid } from "@mui/material";
import { Navbar } from "./Navbar";
import testeDiPietraLogo from '../../assets/teste-di-pietra_logo.png';
import styles from "../../App.module.scss";

export function Header() {
	return (
		<Grid container spacing={2} className={styles.adminHeader}>
			<Grid size={{ md: 3 }}>
				<img className={styles.logo} src={testeDiPietraLogo} />
			</Grid>
			<Grid size={{ md: 9 }}>
				<Navbar />
			</Grid>
		</Grid>
	);
}