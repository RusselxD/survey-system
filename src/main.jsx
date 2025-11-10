// Note: StrictMode can trigger double-mount of effects in development,
// which causes Chart.js to attempt to reuse an already-in-use canvas.
// We disable it here to avoid the Chart.js "Canvas is already in use" error.
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import AdminPage from "./pages/Admin/AdminPage/AdminPage.jsx";
import Dashboard from "./pages/Admin/Dashboard/Dashboard.jsx";
import Analytics from "./pages/Admin/Analytics/Analytics.jsx";
import Surveys from "./pages/Admin/Surveys/Surveys.jsx";
import Responses from "./pages/Admin/Responses/Responses.jsx";
import Users from "./pages/Admin/Users/Users.jsx";
import Settings from "./pages/Admin/Settings/Settings.jsx";
import SurveyPage from "./pages/Admin/Surveys/SurveyPage/SurveyPage.jsx";
import { Login } from "./pages/Admin/Login/Login.jsx";
import { Unauthorized } from "./pages/Admin/Login/Unauthorized.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />,
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute requiredRole="Admin">
                <AdminPage />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/admin/dashboard" replace />,
            },
            { path: "dashboard", element: <Dashboard /> },
            { path: "analytics", element: <Analytics /> },
            { path: "surveys", element: <Surveys /> },
            { path: "surveys/:uuid", element: <SurveyPage /> },
            { path: "responses", element: <Responses /> },
            { path: "users", element: <Users /> },
            { path: "settings", element: <Settings /> },
        ],
    },
    {
        path: "/",
        element: <Navigate to="/admin/dashboard" replace />,
    },
]);

createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
);
