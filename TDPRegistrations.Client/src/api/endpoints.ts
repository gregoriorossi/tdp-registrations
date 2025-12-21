export const FormsEndpoints = {
	add: () => '/Forms',
	delete: (formId: string) => `/Forms/${formId}`,
	getAll: () => '/Forms',
	getById: (id: string) => `/Forms/${id}`,
	getBySlug: (slug: string) => `/Public/getbyslug/${slug}`,
	update: () => '/Forms'
}

export const FilesEndpoints = {
	get: (id: string) => `${import.meta.env.VITE_API_URL}/files/${id}`
}