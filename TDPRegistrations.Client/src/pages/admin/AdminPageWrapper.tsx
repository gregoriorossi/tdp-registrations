import { Grid } from "@mui/material";
import styles from "../../App.module.scss";
import { Header } from "../../components/admin/Header";
import { Box } from "@mui/system";

interface IAdminPageWrapper extends React.ComponentProps<typeof Grid> {
	title: string;
}

export function AdminPageWrapper(props: IAdminPageWrapper) {
	return (
		<Grid container className={styles.adminPageWrapper}>
			<Header title={props.title} />
			<Grid className={`${styles.adminPageContainer} ${props.className}`}>
				<Grid className={styles.content }>
					{props.children}
				</Grid>
			</Grid>
		</Grid>
	);
} 