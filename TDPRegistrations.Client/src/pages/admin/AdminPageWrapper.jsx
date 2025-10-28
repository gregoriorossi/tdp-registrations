import { Footer } from "../../components/admin/Footer";
import { Header } from "../../components/admin/Header";

export function AdminPageWrapper(props) {
    return (
        <div>
            <Header />
            <div>
                {props.children}
            </div>
            <Footer />
        </div>
    );
}