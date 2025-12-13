import { Avatar, Button, Typography } from "@mui/material";
import { FormPage } from "../../../pages/FormPage";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { STRINGS } from "../../../consts/strings.consts";
import { IImage } from "../../../models/shared.models";
import { ChangeEvent, ChangeEventHandler, InputHTMLAttributes, useState } from "react";
import styles from "../../../App.module.scss";
import DeleteIcon from '@mui/icons-material/Delete';

interface IImagePickerProps {
	fieldLabel: string;
	image: File | null;
	imageUrl: string | null;
	onChange: (file: File | null) => void;
}

export function ImagePicker(props: IImagePickerProps) {

	const preview = !props.image ? null : URL.createObjectURL(props.image);


	return <div className={styles.imagePicker}>
		<div className={styles.actions}>
			<div>
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
				<div>
					<Typography variant="caption" color="text.secondary">
						{STRINGS.SupportedImageFormats}
					</Typography>
				</div>
			</div>
			{
				props.imageUrl &&
				<div className={styles.deleteButtonContainer}>
					<Button variant="text"
						color="inherit"
						onClick={(onClear) => props.onChange(null)}>
						<DeleteIcon />&nbsp;
						{STRINGS.Delete}
					</Button>
				</div>
			}
		</div>

		{
			preview &&
			<Avatar
				variant="rounded"
				sx={{ width: 120, height: 120 }}
				src={preview ?? undefined}
				alt={props.image?.name} />
		}

		{
			props.imageUrl &&
			<div className={styles.image}>
				<img src={props.imageUrl!} />
			</div>
		}

	</div>;
}