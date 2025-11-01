import { Link } from "react-router-dom";

export function Navbar() {
    return (
        <ul>
            <li>
                <Link to="/admin">Home</Link>
            </li>
        </ul>
    );
}