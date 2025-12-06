import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
    requiredPermissions?: string | string[];
    requiredAnyPermissions?: string | string[];
}

export function ProtectedRoute({
    children,
    requiredPermissions,
    requiredAnyPermissions,
}: ProtectedRouteProps) {
    const {
        user,
        hasPermission,
        hasAllPermissions,
        hasAnyPermission,
        loading,
    } = useAuth();

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

    if (requiredAnyPermissions) {
        let allowed = false;

        if (Array.isArray(requiredAnyPermissions)) {
            allowed = hasAnyPermission(requiredAnyPermissions);
        } else {
            allowed = hasPermission(requiredAnyPermissions);
        }

        if (!allowed) {
            return <Navigate to="/unauthorized" replace />;
        }
    }

    return children;
}
