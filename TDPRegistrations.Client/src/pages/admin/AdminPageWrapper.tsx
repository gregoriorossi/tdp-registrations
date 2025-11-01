import { Grid } from "@mui/material";
import styles from "../../App.module.scss";
import { Footer } from "../../components/admin/Footer";
import { Header } from "../../components/admin/Header";

export function AdminPageWrapper(props: any) {
	return (
		<div className={styles.adminPageWrapper}>
			<Header />
			<Grid container className={styles.adminPageContainer}>
				{props.children}
			</Grid>
			<Footer />
		</div>
	);
} 