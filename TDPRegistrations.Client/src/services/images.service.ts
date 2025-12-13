import { ImagesEndpoints } from "../api/endpoints"

export default class ImagesService {
	public static getImageUrl = (id: string): string => {
		return ImagesEndpoints.get(id);
	}
}