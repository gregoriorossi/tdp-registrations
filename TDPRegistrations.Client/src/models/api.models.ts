export interface IResponse<T> {
	value: T;
	isSuccessful: boolean;
	isFailure: boolean;
	error?: {
		code: string;
		description: string;
	}
}