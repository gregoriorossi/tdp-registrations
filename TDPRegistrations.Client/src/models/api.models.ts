export interface IResponse<T> {
	value: T;
	isSuccess: boolean;
	isFailure: boolean;
	error?: {
		code: string;
		description: string;
	}
}

export interface IAddFormRequest {
	title: string;
}