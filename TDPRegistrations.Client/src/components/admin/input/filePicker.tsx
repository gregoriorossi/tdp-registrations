import { Box, Button, Typography } from "@mui/material";
import styles from "../../../App.module.scss";
import UploadFileIcon from '@mui/icons-material/UploadFile'; 
import { STRINGS } from "../../../consts/strings.consts";
import DeleteIcon from '@mui/icons-material/Delete';

interface IFilePickerProps {
	fieldLabel: string;
	file: File | null;
	fileUrl: string | null;
	onChange: (file: File | null) => void;
}

export function FilePicker(props: IFilePickerProps) {
	return <Box component="div" className={styles.filesPicker }>
		<div>
			<Button
				variant="contained"
				startIcon={<UploadFileIcon />}
				component="label">
				{props.fieldLabel}
				<input
					hidden
					type="file"
					accept="*"
					onChange={(e) => {
						const file = e.target?.files?.[0] ?? null;
						props.onChange(file);
					}}
				/>
			</Button>
		</div>
		{
			props.fileUrl &&
			<div className={styles.deleteButtonContainer}>
				<Button variant="text"
					color="inherit"
					onClick={(onClear) => props.onChange(null)}>
					<DeleteIcon />&nbsp;
					{STRINGS.Delete}
				</Button>
			</div>
		}
	</Box>
} 