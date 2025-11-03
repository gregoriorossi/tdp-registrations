import { useParams } from "react-router-dom";
import { AdminPageWrapper } from "./AdminPageWrapper";
import { useEffect } from "react";
import { getFormBySlug } from "../../services/forms.service";

export function AdminFormPage() {
    const params = useParams();
    console.log(params);

    useEffect(() => {

        // se vuoto andare in 404
        const fetchForm = async () => {
            const result = await getFormBySlug(params.slug!);
            console.log(result);
        }

        fetchForm();
    });

    return (
        <AdminPageWrapper>
            <div>Form page detail</div>
            <div>Params {JSON.stringify(params)}</div>
        </AdminPageWrapper>
    );
}