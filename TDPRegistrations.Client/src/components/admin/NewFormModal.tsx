import { Button, Modal, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import * as React from "react";
import Typography from '@mui/material/Typography';
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "../../App.module.scss";

interface INewFormModalProps {
    open: boolean;
    onClose: () => void;
}

export function NewFormModal(props: INewFormModalProps) {
    const [formData, setFormData] = useState({
        Title: ""
    });

    const handleFormChange = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {

        setFormData((prevState) => ({
            ...prevState,
            Title: e.target.value
        }));
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    }

    return <Modal open={props.open} onClose={props.onClose}>
        <Box className={styles.newFormModal}
            component="form"
            onSubmit={handleSubmit}>
            <Typography variant="h6" component="h2">Nuova form</Typography>
            <Typography sx={{ mt: 2 }}>
                Aggiungi una nuova form
            </Typography>
            <TextField
                label="Titolo"
                name="formTitle"
                value={formData.Title}
                onChange={handleFormChange}
                fullWidth />
            <Button type="submit" variant="contained">
                Crea
            </Button>
        </Box>
    </Modal>
}