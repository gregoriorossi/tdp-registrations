export const FormsEndpoints = {
	add: () => '/Forms',
	delete: (formId: string) => `/Forms/${formId}`,
	getAll: () => '/Forms',
	getBySlug: (slug: string) => `/Forms/getbyslug/${slug}`
}