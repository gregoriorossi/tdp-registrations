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

const forms = [
	{
		Title: 'Form 1',
		Date: '12/12/2025',
		IsActive: true,
		Slug: "/admin/form/Form-1"
	},
	{
		Title: 'Form 2',
		Date: '24/12/2025',
		IsActive: false,
		Slug: "/admin/form/Form-2"
	},
	{
		Title: 'Form 3',
		Date: '12/12/2026',
		IsActive: true,
		Slug: "/admin/form/Form-3"
	}
];


export function AdminAllFormsPage() {
	const [modalOpen, setModalOpen] = React.useState(false);

	const onNewFormClick = () => {
		setModalOpen(true);
	}

	const onModalClose = (): void => {
		setModalOpen(false);
	}

	const onViewButtonClick = (): void => {

	}

	const onDeleteClick = (): void => {
		api.post(TDPEndpoints.Forms.Delete('test'));
	}

	return (
		<AdminPageWrapper>
			<h1>Form di registrazione</h1>
			<div>
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
							<TableCell>Titolo</TableCell>
							<TableCell>Data</TableCell>
							<TableCell>Attivo</TableCell>
							<TableCell />
						</TableRow>
					</TableHead>
					<TableBody>
						{
							forms.map((form, idx) => (
								<TableRow key={idx}>
									<TableCell>{form.Title}</TableCell>
									<TableCell>{form.Date}</TableCell>
									<TableCell>{form.IsActive
										? <CheckIcon className={styles.greenIcon} />
										: <DoNotDisturbIcon className={styles.redIcon} />}
									</TableCell>
									<TableCell>
										<ButtonGroup variant="contained" aria-label="Azioni form">
											<Link to={form.Slug}>
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
		</AdminPageWrapper>
	);
}