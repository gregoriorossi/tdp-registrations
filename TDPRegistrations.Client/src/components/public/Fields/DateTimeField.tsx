import { FormControl, InputLabel, Typography } from "@mui/material";
import styles from "../../../App.module.scss";
import { IField, IFieldBaseProps } from "../../../models/form.models";
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { STRINGS } from "../../../consts/strings.consts";
import { subYears } from "date-fns/subYears";

export function DateTimeField(props: IFieldBaseProps) {
	const { field: currentField, errors, register, control } = props;
	return <FormControl error={!!errors[currentField.id!]}
		className={`${styles.field} ${styles.fullWidth} ${styles.dateField}`}>

		<InputLabel>{currentField.label}</InputLabel>

		<Controller
			name={currentField.id!}
			control={control}
			render={({ field }) => (
				<DatePicker
					name={currentField.id!}
					selected={field.value}
					showIcon
					placeholderText={STRINGS.Pages.Form.SelectDate}
					minDate={subYears(new Date(), 80)}
					showYearDropdown
					wrapperClassName="dateFieldWrapper"
					isClearable
					clearButtonClassName="clearDate"
					scrollableYearDropdown
					showMonthDropdown
					yearDropdownItemNumber={80}
					useShortMonthInDropdown
					dateFormat="dd/MM/yyyy"
					onChange={(newValue: any) => {
						console.log("New value", newValue);
						field.onChange(newValue)

					}}
					value={field.value} />
			)} />

		{errors[currentField.id!] && (
			<Typography variant="caption" color="error">
				{errors[currentField.id!]?.message as string}
			</Typography>
		)}
	</FormControl>;
}