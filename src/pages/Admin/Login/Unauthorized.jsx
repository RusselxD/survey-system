import { Link } from "react-router-dom";

export function Unauthorized() {
    return (
        <div
            style={{ padding: "20px", textAlign: "center", marginTop: "100px" }}
        >
            <h2>403 - Access Denied</h2>
            <p>You don't have permission to access this page.</p>
            <p>Admin privileges are required.</p>
            <Link
                to="/login"
                style={{ color: "blue", textDecoration: "underline" }}
            >
                Go to Login
            </Link>
        </div>
    );
}
