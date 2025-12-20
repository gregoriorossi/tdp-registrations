import { Errors } from "./errors.consts";

export const STRINGS = {
	Modals: {
		FieldForm: {
			NewField: 'Nuovo campo',
			EditField: 'Modifica campo',
			NameLabel: 'Nome',
			DescriptionLabel: 'Descrizione',
			TypeLabel: 'Tipo',
			TypePlaceholder: 'Seleziona un tipo',
			MandatoryLabel: 'Obbligatorio',
			OptionsLabel: 'Valori',
			ErrorMessages: {
				NameMandatory: 'Il nome del campo è obbligatorio',
				TypeMandatory: 'La tipologia del campo è obbligatoria'
			}
		},
		SectionForm: {
			NewSection: 'Nuova sezione',
			EditSection: 'Modifica sezione',
			TitleLabel: 'Titolo',
			DescriptionLabel: 'Descrizione',
			ErrorMessages: {
				TitleMandatory: 'Il titolo della sezione è obbligatorio'
			}
		},
		DeleteForm: {
			Title: 'Vuoi eliminare il campo?',
			Content: 'Una volta eliminato il campo verranno eliminate anche eventuali rispose associate'
		},
		DeleteSection: {
			Title: 'Vuoi eliminare la sezione?',
			Content: 'Una volta eliminata la sezione e i campi in essa contenuti non saranno più disponibili'
		}
	},
	Pages: {
		AdminAllForms: {
			Title: 'Form di registrazione',
			NewForm: 'Nuova form',
			NoFormsAvailable: 'Non sono presenti form di registrazione.',
			Table: {
				TitleColumn: 'Titolo',
				DateColumn: 'Data',
				ActiveColumn: 'Attivo'
			},
			ConfirmationModal: {
				Title: 'Vuoi eliminare la form?',
				Content: 'Una volta eliminata la form non sarà più accedibile e i dati saranno persi'
			}
		},
		AdminForm: {
			Registrations: 'Iscrizioni',
			Form: {
				TitleLabel: 'Titolo',
				ErrorMessages: {
					TitleMandatory: "Il titolo della form è obbligatorio",
					ImageTooLarge: 'Il file supera 3MB',
					FileTooLarge: 'Il file supera 5MB'
				},
				Image: 'Scegli un\'immagine',
				PrivacyAttachment: 'Carica un documento',
				NoSections: 'Nessuna sezione definita per questa form',
				EditFormSectionTitle: 'Costruisci la tua form',
				NewSection: 'Nuova sezione',
				PrivacyDisclaimer: 'Disclaimer Privacy',
				SectionsSectionTitle: 'Sezioni e campi',
				InformationSectionTitle: 'Informazioni',
				NewField: 'Nuovo campo'
			},
			SectionEditor: {
				DeleteSection: 'Elimina sezione',
				EditSection: 'Modifica la sezione'
			},
			FieldsEditor: {
				NoFields: 'Nessun campo definito per questa sezione'
			},
			Editor: 'Editor',
			Fields: 'Campi',
			Answers: 'Risposte',
			Analytics: 'Analtytics'
		}
	},
	AddValue: 'Aggiungi un valore',
	Cancel: 'Cancella',
	Create: 'Crea',
	Delete: 'Elimina',
	Save: 'Salva',
	OpenPlural: 'Aperte',
	ClosedPlural: 'Chiuse',
	GenericError: 'C\'è stato un errore, riprovare più tardi.',
	SupportedImageFormats: 'Formati supportati: JPG, PNG. (Max. 3MB)'
}

interface IErrorStrings {
	[key: string]: string;
}
export const ERROR_STRINGS: IErrorStrings = {};
ERROR_STRINGS[Errors.Form.SlugNotAvailable] = 'Esiste già una form con lo stesso nome';
