import { Errors } from "./errors.consts";

export const STRINGS = {
	Forms: {

	},
	Modals: {
		FieldForm: {
			NewField: 'Nuovo campo',
			EditField: 'Modifica campo',
			NameLabel: 'Nome',
			TypeLabel: 'Tipo',
			TypePlaceholder: 'Seleziona un tipo',
			MandatoryLabel: 'Obbligatorio',
			OptionsLabel: 'Valori',
			ErrorMessages: {
				NameMandatory: 'Il nome del campo è obbligatorio',
				TypeMandatory: 'La tipologia del campo è obbligatoria'
			}
		},
		DeleteForm: {
			Title: 'Vuoi eliminare il campo?',
			Content: 'Una volta eliminato il campo verranno eliminate anche eventuali rispose associate'
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
					TitleMandatory: "Il titolo della form è obbligatorio"
				}
			},
			FieldsEditor: {
				NoFields: 'Nessun campo definito per questa form'
			}
		}
	},
	AddValue: 'Aggiungi un valore',
	Cancel: 'Cancella',
	Create: 'Crea',
	Delete: 'Elimina',
	Save: 'Salva',
	OpenPlural: 'Aperte',
	ClosedPlural: 'Chiuse',
	GenericError: 'C\'è stato un errore, riprovare più tardi.'
} 

interface IErrorStrings {
	[key: string]: string;
}
export const ERROR_STRINGS: IErrorStrings = {};
ERROR_STRINGS[Errors.Form.SlugNotAvailable] = 'Esiste già una form con lo stesso nome';
