import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children, requiredPermissions }) {
    const { user, hasPermission, hasAllPermissions, loading } = useAuth();

    // Show nothing while checking authentication
    if (loading) {
        return null;
    }

    // Not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Role check
    if (!user.role) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Force update password check
    if (user.forceUpdatePassword) {
        return <Navigate to="/update-password" replace />;
    }

    if (requiredPermissions) {
        let allowed = false;

        if (Array.isArray(requiredPermissions)) {
            allowed = hasAllPermissions(requiredPermissions);
        } else {
            allowed = hasPermission(requiredPermissions);
        }

        if (!allowed) {
            return <Navigate to="/unauthorized" replace />;
        }
    }

    return children;
}
