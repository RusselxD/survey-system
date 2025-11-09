import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";

const AdminPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="h-screen w-screen overflow-x-hidden">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <main className="lg:ml-56 xl:ml-64 bg-white min-h-screen text-black flex flex-col">
                <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

                <Outlet />
            </main>
        </div>
    );
};

export default AdminPage;
