import { Paper, TableBody, Table, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import { AdminPageWrapper } from "./AdminPageWrapper";
import AddIcon from '@mui/icons-material/Add';
import * as React from "react";
import { NewFormModal } from "../../components/admin/NewFormModal";

const forms = [
	{
		Title: 'Form 1',
		Date: '12/12/2025',
		IsActive: true
	},
	{
		Title: 'Form 2',
		Date: '24/12/2025',
		IsActive: false
	},
	{
		Title: 'Form 3',
		Date: '12/12/2026',
		IsActive: true
	}
];


export function AdminAllFormsPage() {
	const [modalOpen, setModalOpen] = React.useState(false);

	const onNewFormClick = () => {
		setModalOpen(true);
	}

	const onModalClose = () => {
		setModalOpen(false);
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
						</TableRow>
					</TableHead>
					<TableBody>
						{
							forms.map((form) => (
								<TableRow>
									<TableCell>{form.Title}</TableCell>
									<TableCell>{form.Date}</TableCell>
									<TableCell>{form.IsActive}</TableCell>
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