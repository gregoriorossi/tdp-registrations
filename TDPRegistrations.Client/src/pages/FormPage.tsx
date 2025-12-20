import { useParams } from "react-router-dom";

export function FormPage() {
	const params = useParams();
	console.log(params);

	return (
		<div>
			<div>Form page detail</div>
			<div>Params {JSON.stringify(params)}</div>
		</div>
	);
}