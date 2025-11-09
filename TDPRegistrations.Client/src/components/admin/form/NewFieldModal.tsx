import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import styles from "../../../App.module.scss";
import { FormEvent } from "react";

interface INewFieldModalProps {
    open: boolean;
    onClose: () => void;
}

export function NewFieldModal(props: INewFieldModalProps) {

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //console.log(formData);
    }

    return   <Modal open={props.open} onClose={props.onClose}>
        <Box className={styles.newFormModal}
            component="form"
            onSubmit={handleSubmit}>
            <Typography variant="h6" component="h2">Nuovo campo</Typography>
            <Typography sx={{ mt: 2 }}>
                Aggiungi un nuovo campo
            </Typography>
            
            <Button type="submit" variant="contained">
                Crea
            </Button>
        </Box>
    </Modal>;
}