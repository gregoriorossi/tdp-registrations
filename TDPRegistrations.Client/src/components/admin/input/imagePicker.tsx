import { Avatar, Button, Typography } from "@mui/material";
import { FormPage } from "../../../pages/FormPage";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { STRINGS } from "../../../consts/strings.consts";
import { IImage } from "../../../models/shared.models";
import { ChangeEvent, ChangeEventHandler, InputHTMLAttributes, useState } from "react";

interface IImagePickerProps {
    fieldLabel: string;
    image: File | null; 
    onChange: (file: File | null) => void;
}

export function ImagePicker(props: IImagePickerProps) {
    
    const preview = !props.image ? null : URL.createObjectURL(props.image);


    return <>
        <Button
            variant="contained"
            startIcon={<PhotoCameraIcon />}
            component="label">
            {props.fieldLabel}
            <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) => {
                    const file = e.target?.files?.[0] ?? null;
                    props.onChange(file);
                }}
            />
        </Button>
        <Avatar
            variant="rounded"
            sx={{ width: 120, height: 120 }}
            src={preview ?? undefined}
            alt={props.image?.name} />

        <Button variant="text"
            color="inherit"
            onClick={(onClear) => props.onChange(null)}>
            {STRINGS.Delete}
        </Button>
        <Typography variant="caption" color="text.secondary">
            {STRINGS.SupportedImageFormats}
        </Typography>
    </>;
}