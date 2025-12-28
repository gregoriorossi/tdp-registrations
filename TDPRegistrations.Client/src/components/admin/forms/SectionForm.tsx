import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import *  as yup from "yup";
import { sectionFormSchema } from "../../../consts/forms.consts";
import styles from "../../../App.module.scss";
import { Box, Button, TextField, Typography } from "@mui/material";
import { ISection, ISectionFormValues } from "../../../models/form.models";
import { STRINGS } from "../../../consts/strings.consts";

const SECTION_FORM = STRINGS.Modals.SectionForm;

interface ISectionFormProps {
	onSubmit: (data: ISection) => void;
	section?: ISection;
}

export function SectionForm(props: ISectionFormProps) {
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(sectionFormSchema)
	});

	const { section, onSubmit } = props;

	const onSubmitSection = (data: ISectionFormValues) => {
		const section: ISection = {
			title: data.title,
			description: data.description ?? '',
			fields: props?.section?.fields ?? [],
			order: 0
		}

		onSubmit(section);
	}

	const formTitle: string = !section ? SECTION_FORM.NewSection : SECTION_FORM.EditSection;
	const submitButtonLabel: string = !section ? STRINGS.Create : STRINGS.Save;

	return <Box className={styles.form}
		component="form"
		onSubmit={(e) => {
			e.preventDefault();
			e.stopPropagation();
			handleSubmit(onSubmitSection)(e);
		}}>

		<Typography variant="h5" component="h2">{formTitle}</Typography>

		<TextField
			label={SECTION_FORM.TitleLabel}
			{...register("title")}
			autoComplete="off"
			defaultValue={section?.title}
			error={!!errors.title}
			helperText={errors.title?.message} />

		<TextField
			label={SECTION_FORM.DescriptionLabel}
			{...register("description")}
			defaultValue={section?.description}
			autoComplete="off"
			error={!!errors.description}
			helperText={errors.description?.message} />

		<Button type="submit" variant="contained">
			{submitButtonLabel}
		</Button>
	</Box>
} 