import { Alert, Button, Modal } from "@mui/material";
import { useRef, useState } from "react";
import LinkIcon from '@mui/icons-material/Link';
import CheckIcon from '@mui/icons-material/Check';
import styles from "../../../App.module.scss";
import { LinkUtils } from "../../../utils/link.utils";
import { STRINGS } from "../../../consts/strings.consts";
const FormString = STRINGS.Pages.AdminForm.Form;

interface ICopyUrlButtonProps {
	formSlug: string;
}

export function CopyUrlButton(props: ICopyUrlButtonProps) {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [alertVisible, setAlertVisible] = useState<boolean>(false);

	const textRef = useRef<HTMLParagraphElement>(null);
	const publicUrl: string = LinkUtils.SlugToPublicFormUrl(props.formSlug);

	const closeModal = () => {
		setModalOpen(false);
		setAlertVisible(false);
	}

	const onTextClick = async (): Promise<void> => {
		if (!textRef.current) {
			return;
		}

		setAlertVisible(false);

		const range = document.createRange();
		range.selectNodeContents(textRef.current);

		const selection = window.getSelection();
		selection?.removeAllRanges();
		selection?.addRange(range);

		try {
			await navigator.clipboard.writeText(publicUrl);
			selection?.removeAllRanges();
			setAlertVisible(true);
		} catch {

		}
	}


	return <>
		<Button onClick={() => setModalOpen(true)} title={FormString.GetPublicUrl}>
			<LinkIcon />&nbsp;{FormString.GetPublicUrl}
		</Button>
		<Modal open={modalOpen} onClose={closeModal}>
			<div className={styles.modal} title={FormString.ClickToCopy}>
				<div className={styles.copyUrl}
					ref={textRef}
					onClick={onTextClick}>
					<h5>{FormString.ClickToCopy}</h5>
					{publicUrl}
				</div>
				{
					alertVisible &&
					<Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
							{FormString.UrlCopied}
					</Alert>
				}
			</div>
		</Modal>
	</>
}