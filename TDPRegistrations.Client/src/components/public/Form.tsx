import { Box, Button, Checkbox, FormControl, FormControlLabel, Typography } from "@mui/material";
import { IForm } from "../../models/form.models";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { buildDynamicFormSchema } from "../../utils/forms.utils";
import DOMPurify from "dompurify";
import { FieldRenderer } from "./FieldRenderer";
import styles from "../../App.module.scss";
import { STRINGS } from "../../consts/strings.consts";
import { useSendResponse } from "../../queries/forms.queries";
import { FormPage } from "../../pages/FormPage";
import FilesService from "../../services/files.service";
const FormPageStrings = STRINGS.Pages.Form;

interface IFormProps {
	form: IForm;
}

export function Form(props: IFormProps) {
	const { form } = props;

	const formSchema = buildDynamicFormSchema(form);
	const { handleSubmit, control, register, formState: { errors } } = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: {}
	});
	console.log("errors", errors);
	const { data: dataResponse, isPending, error, mutateAsync: useSendResponseAsync } = useSendResponse();

	const onSubmit = async (data: { [key: string]: any }): Promise<void> => {

		await useSendResponseAsync({
			formId: form.id,
			responses: data
		});
	}

	const cleanDescription = DOMPurify.sanitize(form.description);
	const cleanDisclaimer = DOMPurify.sanitize(form.privacyDisclaimer);
	const privacyAttachmentUrl: string | null = form.privacyAttachmentId ? FilesService.getFileUrl(form.privacyAttachmentId) : null;
	const privacyText = privacyAttachmentUrl
		? FormPageStrings.PrivacyLabelWithLink.replace("{privacyUrl}", privacyAttachmentUrl)
		: FormPageStrings.PrivacyLabel;

	return <Box component="form"
		className={styles.form}
		onSubmit={handleSubmit((data) => onSubmit(data))}>
		{
			form.sections
				.map(section => <div key={section.id}>
					<h3>{section.title}</h3>
					<p dangerouslySetInnerHTML={{ __html: section.description }}></p>


					{
						section.fields.map((field) =>
							<FieldRenderer
								field={field}
								key={field.id}
								control={control}
								errors={errors}
								register={register} />
						)
					}
				</div>)
		}

		<p dangerouslySetInnerHTML={{ __html: cleanDisclaimer }}></p>

		<FormControl>
			<FormControlLabel control={
				<Checkbox
					{...register("privacyAccepted")}
					defaultChecked={false} />}
					label={<span dangerouslySetInnerHTML={{ __html: privacyText }}></span>} />

			{errors.privacyAccepted!! && (
				<Typography variant="caption" color="error">
					{errors.privacyAccepted.message as string}
				</Typography>
			)}
		</FormControl>

		<div>
			<Button type="submit">{STRINGS.Pages.Form.Send}</Button>
		</div>
	</Box>
}

