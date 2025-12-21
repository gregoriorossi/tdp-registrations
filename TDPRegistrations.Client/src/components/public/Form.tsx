import { Box, Button } from "@mui/material";
import { IForm } from "../../models/form.models";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { buildDynamicFormSchema } from "../../utils/forms.utils";
import DOMPurify from "dompurify";
import { FieldRenderer } from "./FieldRenderer";
import styles from "../../App.module.scss";
import { STRINGS } from "../../consts/strings.consts";

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

	const onSubmit = (data: any) => {
		console.log("Submit", data);
	}

	const cleanDescription = DOMPurify.sanitize(form.description);
	const cleanDisclaimer = DOMPurify.sanitize(form.privacyDisclaimer);

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

		[TODO] checkbox<br />
		[TODO] aggiungere tipologia di campo checkbox

		<div>
			<Button type="submit">{STRINGS.Pages.Form.Send}</Button>
		</div>
	</Box>
}

