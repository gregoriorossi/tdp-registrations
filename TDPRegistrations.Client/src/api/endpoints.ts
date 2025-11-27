export const FormsEndpoints = {
	add: () => '/Forms',
	delete: (formId: string) => `/Forms/${formId}`,
	getAll: () => '/Forms',
	getById: (id: string) => `/Forms/${id}`,
	getBySlug: (slug: string) => `/Forms/getbyslug/${slug}`,
	update: () => '/Forms'
}