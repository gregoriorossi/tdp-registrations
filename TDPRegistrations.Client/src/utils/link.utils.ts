export class LinkUtils {
	public static IdToRelativeUrl = (slug: string) => {
		return `/admin/form/${slug}`;
	}

	public static SlugToPublicFormUrl = (slug: string): string => {
		return `${import.meta.env.VITE_BASE_URL}/form/${slug}`;
	}
}
