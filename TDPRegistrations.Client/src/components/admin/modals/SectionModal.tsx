import { Modal } from "@mui/material";
import { ISection } from "../../../models/form.models";
import { SectionForm } from "../forms/SectionForm";
import styles from "../../../App.module.scss";

interface ISectionModalProps {
	open: boolean;
	section?: ISection;
	onSubmit: (section: ISection) => void;
	onClose: () => void;
}

export function SectionModal(props: ISectionModalProps) {

	const { onClose, onSubmit, open } = props;

	return <Modal open={open} onClose={onClose}>
		<div className={styles.modal}>
			<SectionForm
				onSubmit={onSubmit}
				section={props.section} />
		</div>
	</Modal>
}