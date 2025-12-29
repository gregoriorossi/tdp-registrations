import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false
		}
	}
});

export const queryKeys = {
	forms: {
		all: ["forms"] as const,
		byId: (id: string) => ["form-id", id],
		bySlug: (slug: string) => ["form-slug", slug]
	},
	auth: {
		login: ["login"]
	}
}