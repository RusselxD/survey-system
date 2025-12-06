import { createRoot } from "react-dom/client";
import "./index.css";
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import AdminPage from "./pages/Admin/AdminPage/AdminPage";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Analytics from "./pages/Admin/Analytics/Analytics";
import Surveys from "./pages/Admin/Surveys/Surveys";
import Settings from "./pages/Admin/Settings/Settings";
import SurveyPage from "./pages/Admin/Surveys/SurveyPage/SurveyPage";
import { Login } from "./pages/Admin/Login/Login";
import { Unauthorized } from "./pages/Admin/Login/Unauthorized";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import UsersPage from "./pages/Admin/Users/UsersPage";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./components/NotFound";
import ForceUpdatePassword from "./pages/Admin/Login/ForceUpdatePassword";
import CreateNewSurvey from "./pages/Admin/Surveys/CreateNewSurvey/CreateNewSurvey";
import TakeSurvey from "./pages/User/Survey/TakeSurvey/TakeSurvey";
import SurveyView from "./pages/User/Survey/SurveyView/SurveyView";
import SurveyCompleted from "./pages/User/Survey/SurveyCompleted/SurveyCompleted";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/admin" replace />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />,
    },
    {
        path: "/update-password",
        element: <ForceUpdatePassword />,
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute>
                <AdminPage />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/admin/dashboard" replace />,
            },
            { path: "dashboard", element: <Dashboard /> },
            {
                path: "analytics",
                element: (
                    <ProtectedRoute
                        requiredAnyPermissions={[
                            "analytics.view",
                            "analytics.export",
                        ]}
                    >
                        <Analytics />
                    </ProtectedRoute>
                ),
            },
            { path: "surveys", element: <Surveys /> },
            {
                path: "surveys/:id/view-details",
                element: <SurveyPage />,
            },
            {
                path: "surveys/new",
                element: (
                    <ProtectedRoute
                        requiredPermissions={["survey.create", "survey.manage"]}
                    >
                        <CreateNewSurvey />
                    </ProtectedRoute>
                ),
            },
            {
                path: "surveys/:id/edit",
                element: (
                    <ProtectedRoute
                        requiredPermissions={["survey.create", "survey.manage"]}
                    >
                        <CreateNewSurvey />
                    </ProtectedRoute>
                ),
            },
            {
                path: "users",
                element: (
                    <ProtectedRoute
                        requiredAnyPermissions={[
                            "users.manage",
                            "roles.manage",
                        ]}
                    >
                        <UsersPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "settings",
                element: (
                    <ProtectedRoute requiredPermissions="system.manage">
                        <Settings />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: "/s/:id",
        element: <SurveyView />,
    },
    {
        path: "/s/:id/take",
        element: <TakeSurvey />,
    },
    {
        path: "/s/:id/completed",
        element: <SurveyCompleted />,
    },
    {
        path: "/not-found",
        element: <NotFound />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <ErrorBoundary>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </ErrorBoundary>
);
