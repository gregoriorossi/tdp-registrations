import { Paper, TableBody, Table, TableCell, TableContainer, TableHead, TableRow, Button, ButtonGroup } from "@mui/material";
import { AdminPageWrapper } from "./AdminPageWrapper";
import AddIcon from '@mui/icons-material/Add';
import * as React from "react";
import { NewFormModal } from "../../components/admin/NewFormModal";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import styles from "../../App.module.scss";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { TDPEndpoints } from "../../consts/api.consts";
import { useEffect } from "react";
import { getAllForms } from "../../services/forms.service";
import ConfirmationDialog from "../../components/admin/ConfirmationDialog";
import { IFormBasicDTO } from "../../models/form.models";
import DateFormatter from "../../components/admin/DateFormatter";
import { LinkUtils } from "../../utils/link.utils";

export function AdminAllFormsPage() {
	const [modalOpen, setModalOpen] = React.useState(false);
	const [deleteFormDialogOpen, setDeleteFormDialogOpen] = React.useState(false);

	const [forms, setForms] = React.useState<IFormBasicDTO[]>([]);

	useEffect(() => {
		const fetchForms = async () => {
			const result = await getAllForms();
			setForms(result.value);
		}

		fetchForms();

	}, []);

	const onNewFormClick = () => {
		setModalOpen(true);
	}

	const onModalClose = (): void => {
		setModalOpen(false);
	}

	const onViewButtonClick = (): void => {

	}

	const onDeleteClick = (): void => {
		setDeleteFormDialogOpen(true);
	}

	const onDeleteFormHandler = (): void => {
		setDeleteFormDialogOpen(false);
		api.post(TDPEndpoints.Forms.Delete('test'));
	}

	return (
		<AdminPageWrapper className={styles.adminAllFormsPage}>
			<h1>Form di registrazione</h1>
			<div className={styles.subheaderContainer}>
				<Button onClick={onNewFormClick}
					variant="contained"
					endIcon={<AddIcon />}>
					Nuova form
				</Button>
			</div>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell colSpan={5}>Titolo</TableCell>
							<TableCell colSpan={3}>Data</TableCell>
							<TableCell colSpan={2}>Attivo</TableCell>
							<TableCell colSpan={2} />
						</TableRow>
					</TableHead>
					<TableBody>
						{
							forms.map((form, idx) => (
								<TableRow key={idx}>
									<TableCell colSpan={5}>{form.title}</TableCell>
									<TableCell colSpan={3}>
										<DateFormatter dateStr={form.dateCreated} />
									</TableCell>
									<TableCell colSpan={2}>{form.isOpen
										? <CheckIcon className={styles.greenIcon} />
										: <DoNotDisturbIcon className={styles.redIcon} />}
									</TableCell>
									<TableCell colSpan={2} align="right">
										<ButtonGroup variant="contained" aria-label="Azioni form">
											<Link to={LinkUtils.SlugToRelativeUrl(form.slug)}>
												<Button title="Dettagli"><CreateIcon /></Button>
											</Link>

											<Button title="Cancella" onClick={onDeleteClick}><DeleteIcon /></Button>
										</ButtonGroup>
									</TableCell>
								</TableRow>
							))
						}
					</TableBody>
				</Table>
			</TableContainer>
			<NewFormModal open={modalOpen} onClose={onModalClose} />
			<ConfirmationDialog
				isOpen={deleteFormDialogOpen}
				title="Vuoi eliminare la form?"
				cancelBtnLabel="Cancella"
				confirmBtnLabel="Elimina"
				content="Una volta eliminata la form non sarà più accedibile e i dati saranno persi"
				onCancel={() => { setDeleteFormDialogOpen(false) }}
				onClose={() => { setDeleteFormDialogOpen(false) }}
				onConfirm={onDeleteFormHandler} />
		</AdminPageWrapper>
	);
}