export const TDPEndpoints = {
	Fields: {
		Add: (formId: string) => `/Fields/${formId}`
	},
	Forms: {
		GetAll: '/Forms',
		Add: '/Forms',
		Update: '/Forms',
		Delete: (formId: string) => `/Forms/${formId}`,
		Get: (formId: string) => `/Forms/${formId}`
	}
}