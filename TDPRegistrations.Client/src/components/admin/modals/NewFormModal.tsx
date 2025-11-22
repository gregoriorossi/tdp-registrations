import { Button, Modal, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import * as React from "react";
import Typography from '@mui/material/Typography';
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "../../../App.module.scss";
import { NewFormForm } from "../forms/NewFormForm";

interface INewFormModalProps {
	open: boolean;
	onFormCreated: () => void;
	onClose: () => void;
}

export function NewFormModal(props: INewFormModalProps) {
	return <Modal open={props.open} onClose={props.onClose}>
		<div className={styles.modal}>
			<NewFormForm onSubmit={props.onFormCreated} />
		</div>
	</Modal>;
}