import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { IForm, ISection } from "../../../models/form.models";
import styles from "../../../App.module.scss";
import { STRINGS } from "../../../consts/strings.consts";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ImagePicker } from "../input/imagePicker";
import { adminFormSchema } from "../../../consts/forms.consts";
import ImagesService from "../../../services/images.service";
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';

import {
	MenuButtonBold,
	MenuButtonBulletedList,
	MenuButtonItalic,
	MenuControlsContainer,
	MenuDivider,
	MenuSelectHeading,
	RichTextEditor,
	type RichTextEditorRef,
} from "mui-tiptap";
import { IUpdateFormRequest } from "../../../models/api.models";
import StarterKit from "@tiptap/starter-kit";
import { SectionEditor } from "./SectionEditor";
import { SectionModal } from "../modals/SectionModal";

const FormPage = STRINGS.Pages.AdminForm;

interface IFormEditorProps {
	form: IForm;
	onUpdate: (form: IUpdateFormRequest, bannerImageDeleted: boolean) => void;
	isLoading: boolean;
}

interface IFormData {
	title: string;
	description?: string | undefined;
	bannerImage?: File | undefined | null;
}

export function FormEditor(props: IFormEditorProps) {

	const { form: formToUpdate, isLoading, onUpdate } = props;
	const rteRef = useRef<RichTextEditorRef>(null);
	const [sectionModalOpen, setSectionModalOpen] = useState<boolean>(false);
	const [deletedBannerImage, setDeletedBannerImage] = useState(false);
	const [form, setForm] = useState<IForm>(formToUpdate);

	const { handleSubmit, control, register, setValue, formState: { errors } } = useForm({
		resolver: yupResolver(adminFormSchema)
	});

	const bannerImageUrl: string | null = form?.bannerImageId ? ImagesService.getImageUrl(form.bannerImageId) : null;

	const onImageChange = (file: File | null) => {
		if (!file) {
			setDeletedBannerImage(true);
		} else {
			setValue('bannerImage', file, { shouldValidate: true, shouldDirty: true });
			setDeletedBannerImage(false);
		}
	}

	const handleAddSection = (section: ISection): void => {
		const newForm = {
			...form,
			sections: [...form.sections, section]
		}
		setForm(newForm);
		setSectionModalOpen(false);
	}

	const handleRemoveSection = (idx: number): void => {
		const newSections: ISection[] = form.sections.filter((_, i) => i !== idx);
		setForm({
			...form,
			sections: newSections
		});
	}

	const handleSectionUpdate = (section: ISection, idx: number): void => {
		const newSections = [...form.sections];
		newSections[idx] = section;
		setForm({
			...form,
			sections: newSections
		});
	}

	const onSubmit = async (data: IFormData, form: IForm): Promise<void> => {
		console.log(data);

		const updatedForm: IUpdateFormRequest = {
			...form,
			title: data.title,
			description: data?.description ?? '',
			sections: form.sections,
			bannerImage: data?.bannerImage ?? null,
			bannerImageDeleted: deletedBannerImage,
		}

		props.onUpdate(updatedForm, deletedBannerImage);
	}

	useEffect(() => {
		setForm(props.form);
	}, [props.form])

	return <Box component="form"
		onSubmit={handleSubmit((data) => onSubmit(data, form))}>
		<Box component="div" className={styles.actionsBar}>
			<Box>
				<Button
					variant="contained"
					type="submit"
					disabled={isLoading}>
					<SaveIcon />&nbsp;{STRINGS.Save}
				</Button>
			</Box>
		</Box>
		<div>
			[TODO] add privacy file upload<br />
			[TODO] add open/close state
			[TODO] ordinamento campi e sezioni<br />
		</div>
		<Grid container spacing={2} className={styles.formContainer}>

			<Grid size={{ xs: 12, md: 6 }}>
				<Box className={styles.titleAndAction}>
					<h2>{FormPage.Form.InformationSectionTitle}</h2>
				</Box>
				<TextField
					label={STRINGS.Pages.AdminForm.Form.TitleLabel}
					{...register("title")}
					error={!!errors.title}
					className={`${styles.section} ${styles.fullWidth}`}
					helperText={errors.title?.message}
					defaultValue={form.title} />

				<div className={styles.section}>
					<Controller
						name='bannerImage'
						control={control}
						render={({ field }) => (
							<ImagePicker
								fieldLabel={FormPage.Form.Image}
								imageUrl={bannerImageUrl}
								image={field?.value ?? null}
								onChange={onImageChange} />
						)} />
				</div>

				<div className={styles.section}>
					<Controller
						name="description"
						control={control}
						defaultValue={form.description}
						render={({ field: { value, onChange } }) => (
							<RichTextEditor
								ref={rteRef}
								className={styles.section}
								extensions={[StarterKit]}
								content={value}
								onUpdate={({ editor }) => {
									onChange(editor.getHTML())
								}}
								renderControls={() => (
									<MenuControlsContainer>
										<MenuSelectHeading />
										<MenuDivider />
										<MenuButtonBold />
										<MenuButtonItalic />
										<MenuButtonBulletedList />
									</MenuControlsContainer>
								)} />
						)} />
				</div>
			</Grid>
			<Grid size={{ xs: 12, md: 6 }}>
				<Box className={styles.titleAndAction}>
					<h2>{FormPage.Form.SectionsSectionTitle}</h2>
					<span>
						<Button onClick={() => setSectionModalOpen(true)}
							title={FormPage.Form.NewSection}
							variant="contained"><AddIcon />{FormPage.Form.NewSection}</Button>
					</span>
				</Box>
				{
					(form.sections.length === 0) &&
					<Alert severity="warning">{FormPage.Form.NoSections}</Alert>
				}
				{
					form.sections.map((s, idx) =>
						<SectionEditor
							section={s}
							onChange={handleSectionUpdate}
							onRemove={handleRemoveSection}
							idx={idx}
							key={idx} />
					)
				}
			</Grid>
		</Grid>

		<SectionModal
			open={sectionModalOpen}
			onClose={() => setSectionModalOpen(false)}
			onSubmit={(s) => handleAddSection(s)} />
	</Box>;
}