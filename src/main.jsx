// Note: StrictMode can trigger double-mount of effects in development,
// which causes Chart.js to attempt to reuse an already-in-use canvas.
// We disable it here to avoid the Chart.js "Canvas is already in use" error.
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
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
import Settings from "./pages/Admin/Settings/Settings.jsx";
import SurveyPage from "./pages/Admin/Surveys/SurveyPage/SurveyPage.jsx";
import { Login } from "./pages/Admin/Login/Login.jsx";
import { Unauthorized } from "./pages/Admin/Login/Unauthorized.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import UsersPage from "./pages/Admin/Users/UsersPage.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import NotFound from "./components/NotFound.jsx";
import ForceUpdatePassword from "./pages/Admin/Login/ForceUpdatePassword.jsx";
import CreateNewSurvey from "./pages/Admin/Surveys/CreateNewSurvey/CreateNewSurvey.jsx";
import TakeSurvey from "./pages/User/Survey/TakeSurvey/TakeSurvey.jsx";
import SurveyView from "./pages/User/Survey/SurveyView/SurveyView.jsx";

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
        path: "/update-password",
        element: <ForceUpdatePassword />,
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute>
                <ErrorBoundary>
                    <AdminPage />
                </ErrorBoundary>
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
            { path: "surveys/:id/view-details", element: <SurveyPage /> },
            { path: "surveys/new", element: <CreateNewSurvey /> },
            { path: "surveys/:id/edit", element: <CreateNewSurvey /> },
            {
                path: "responses",
                element: <Responses />,
            },
            {
                path: "users",
                element: <UsersPage />,
            },
            { path: "settings", element: <Settings /> },
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
        path: "/not-found",
        element: <NotFound />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
);
