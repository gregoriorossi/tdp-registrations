import { Paper, TableBody, Table, TableCell, TableContainer, TableHead, TableRow, Button, ButtonGroup, CircularProgress, Alert } from "@mui/material";
import { AdminPageWrapper } from "./AdminPageWrapper";
import AddIcon from '@mui/icons-material/Add';
import * as React from "react";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import styles from "../../App.module.scss";
import { Link } from "react-router-dom";
import axiosClient from "../../api/axios";
import { useEffect } from "react";
import ConfirmationDialog from "../../components/admin/ConfirmationDialog";
import { IFormBasicDTO } from "../../models/form.models";
import DateFormatter from "../../components/admin/DateFormatter";
import { LinkUtils } from "../../utils/link.utils";
import { NewFormModal } from "../../components/admin/modals/NewFormModal";
import { STRINGS } from "../../consts/strings.consts";
import { useDeleteForm, useForms } from "../../queries/forms.queries";
import { ErrorMessage } from "../../components/ErrorMessage";

const PAGE_STRINGS = STRINGS.Pages.AdminAllForms;

export function AdminAllFormsPage() {
	const [modalOpen, setModalOpen] = React.useState(false);
	const [deleteFormDialogOpen, setDeleteFormDialogOpen] = React.useState(false);
	const [selectedFormId, setSelectedFormId] = React.useState<string | null>(null);
	const deleteForm = useDeleteForm();

	const { data: response, isLoading, error } = useForms();

	const onNewFormClick = () => {
		setModalOpen(true);
	}

	const onModalClose = (): void => {
		setModalOpen(false);
	}

	const onDeleteClick = (formId: string): void => {
		setSelectedFormId(formId);
		setDeleteFormDialogOpen(true);
	}

	const onDeleteFormHandler = async (): Promise<void> => {
		setDeleteFormDialogOpen(false);
		await deleteForm.mutateAsync(selectedFormId!);
		setSelectedFormId(null);
	}

	return (
		<AdminPageWrapper className={styles.adminAllFormsPage}>
			<h1>{PAGE_STRINGS.Title}</h1>
			<div className={styles.subheaderContainer}>
				<Button onClick={onNewFormClick}
					variant="contained"
					endIcon={<AddIcon />}>
					{PAGE_STRINGS.NewForm}
				</Button>
			</div>

			{
				(response?.isSuccess && response?.value.length === 0) &&
					<Alert severity="info">{STRINGS.Pages.AdminAllForms.NoFormsAvailable}</Alert>
			}

			{
				(!response?.isSuccess && !isLoading) &&
					<Alert severity="error"><ErrorMessage errorCode={response?.error?.code!} /></Alert>
			}

			{
				isLoading && <CircularProgress />
			}

			{
				(response?.value?.length ?? 0 > 0) ?
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell colSpan={5}>{PAGE_STRINGS.Table.TitleColumn}</TableCell>
									<TableCell colSpan={3}>{PAGE_STRINGS.Table.DateColumn}</TableCell>
									<TableCell colSpan={2}>{PAGE_STRINGS.Table.ActiveColumn}</TableCell>
									<TableCell colSpan={2} />
								</TableRow>
							</TableHead>
							<TableBody>
								{
									response?.value.map((form, idx) => (
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

													<Button title="Cancella" onClick={() => onDeleteClick(form.id)}><DeleteIcon /></Button>
												</ButtonGroup>
											</TableCell>
										</TableRow>
									))
								}
							</TableBody>
						</Table>
					</TableContainer>
					: <></>
			}

			<NewFormModal
				open={modalOpen}
				onClose={onModalClose}
				onFormCreated={onModalClose} />

			<ConfirmationDialog
				isOpen={deleteFormDialogOpen}
				title={PAGE_STRINGS.ConfirmationModal.Title}
				cancelBtnLabel={STRINGS.Cancel}
				confirmBtnLabel={STRINGS.Delete}
				content={PAGE_STRINGS.ConfirmationModal.Content}
				onCancel={() => { setDeleteFormDialogOpen(false) }}
				onClose={() => { setDeleteFormDialogOpen(false) }}
				onConfirm={onDeleteFormHandler} />
		</AdminPageWrapper>
	);
}