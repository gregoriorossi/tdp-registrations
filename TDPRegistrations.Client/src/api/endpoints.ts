export const FormsEndpoints = {
	add: () => '/Forms',
	delete: (formId: string) => `/Forms/${formId}`,
	getAll: () => '/Forms',
	getById: (id: string) => `/Forms/${id}`,
	getBySlug: (slug: string) => `/Forms/getbyslug/${slug}`,
	update: () => '/Forms'
}

export const ImagesEndpoints = {
	get: (id: string) => `${import.meta.env.VITE_API_URL}/Images/${id}`
}