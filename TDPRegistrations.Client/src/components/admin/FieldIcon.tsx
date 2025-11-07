import { FieldType, IField } from "../../models/form.models";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ListIcon from '@mui/icons-material/List';
import EmailIcon from '@mui/icons-material/Email';

export interface IFieldIconProps {
	fieldType: FieldType;
}

export function FieldIcon(props: IFieldIconProps) {
	switch (props.fieldType) {
		case FieldType.TEXT:
			return <FormatColorTextIcon />;
		case FieldType.NUMBER:
			return <LooksOneIcon />;
		case FieldType.DATETIME:
			return <CalendarMonthIcon />;
		case FieldType.SINGLE_CHOICE:
			return <ListIcon />;
		case FieldType.MULTIPLE_CHOICE:
			return <FormatListNumberedIcon />;
		case FieldType.EMAIL:
			return <EmailIcon />;
		case FieldType.TELEPHONE_NUMBER:
			return <PhoneAndroidIcon />;
		default:
			return <FormatColorTextIcon />;
	}
}