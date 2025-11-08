// Note: StrictMode can trigger double-mount of effects in development,
// which causes Chart.js to attempt to reuse an already-in-use canvas.
// We disable it here to avoid the Chart.js "Canvas is already in use" error.
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminPage from "./pages/Admin/AdminPage.jsx";

const router = createBrowserRouter([
    { path: "/admin", element: <AdminPage /> },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
