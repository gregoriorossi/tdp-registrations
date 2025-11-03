import { Grid } from "@mui/material";
import styles from "../../App.module.scss";
import { Header } from "../../components/admin/Header";
import { Box } from "@mui/system";

export function AdminPageWrapper(props: any) {
	return (
		<Grid container className={styles.adminPageWrapper}>
			<Header />
			<Grid className={`${styles.adminPageContainer} ${props.className}`}>
				<Grid className={styles.content }>
					{props.children}
				</Grid>
			</Grid>
		</Grid>
	);
} 