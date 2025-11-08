import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Dashboard from "./Dashboard/Dashboard";
import Surveys from "./Surveys/Surveys";
import Responses from "./Responses/Responses";
import Analytics from "./Analytics/Analytics";
import Users from "./Users/Users";
import Settings from "./Settings/Settings";
import { LogOut } from "lucide-react";

const AdminPage = () => {
    const [selected, setSelected] = useState(0);

    return (
        <div className="h-screen w-screen overflow-x-hidden">
            <Sidebar
                chosenCategory={selected}
                setChosenCategory={setSelected}
            />
            <main className="ml-64 bg-white min-h-screen text-black">
                <div className="navbar bg-white shadow-md justify-between items-start p-4">
                    <div>
                        <p className="text-lg font-semibold">Admin Dashboard</p>
                        <p className="text-sm text-gray-500 ">
                            Welcome back, User
                        </p>
                    </div>

                    <button className="btn bg-red-500 text-white text-sm px-3 py-1 hover:bg-red-600">
                        <LogOut size={20} />
                        <span>Log Out</span>
                    </button>
                </div>

                {selected === 0 && <Dashboard setChosenCategory={setSelected} />}
                {selected === 1 && <Surveys />}
                {selected === 2 && <Responses />}
                {selected === 3 && <Analytics />}
                {selected === 4 && <Users />}
                {selected === 5 && <Settings />}
            </main>
        </div>
    );
};

export default AdminPage;
