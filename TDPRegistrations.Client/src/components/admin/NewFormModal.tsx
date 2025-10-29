import { Button, Modal, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import * as React from "react";
import Typography from '@mui/material/Typography';
import { ChangeEvent, FormEvent, useState } from "react";

interface INewFormModalProps {
    open: boolean;
    onClose: () => {};
}

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

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
        <Box sx={style}
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