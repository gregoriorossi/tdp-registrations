import { useParams } from "react-router-dom";
import { AdminPageWrapper } from "./AdminPageWrapper";

export function AdminFormPage() {
    const params = useParams();
    console.log(params);

    return (
        <AdminPageWrapper>
            <div>Form page detail</div>
            <div>Params {JSON.stringify(params)}</div>
        </AdminPageWrapper>
    );
}