import Sidebar from "../Sidebar/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";

const AdminPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className="h-screen w-screen overflow-x-hidden">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <main className="lg:ml-56 xl:ml-64 bg-white min-h-screen text-black flex flex-col">
                <Navbar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                <Outlet />
            </main>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={true}
            />
        </div>
    );
};

export default AdminPage;
