import {
    ShieldCheck,
    LayoutDashboard,
    ClipboardList,
    MessageSquare,
    BarChart3,
    Users,
    Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const menus = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Analytics", icon: BarChart3, path: "/admin/analytics" },
    { name: "Surveys", icon: ClipboardList, path: "/admin/surveys" },
    { name: "Responses", icon: MessageSquare, path: "/admin/responses" },
    { name: "Users", icon: Users, path: "/admin/users" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
];

const appTitle = import.meta.env.VITE_APP_TITLE;

const Sidebar = ({ isOpen, setIsOpen }) => {
    const { hasPermission } = useAuth();

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`w-64 lg:w-56 xl:w-64  top-0 bottom-0 left-0 fixed dark:bg-gray-900 bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0`}
            >
                {/* Top Section */}
                <div className="flex items-center justify-center px-3 py-5 border-b border-gray-500 space-x-2">
                    <ShieldCheck className="text-blue-500" size={35} />
                    <div className="flex-1">
                        <p className="text-lg text-white font-bold">
                            Admin Panel
                        </p>
                        <p className="text-gray-300 text-xs break-all">
                            {appTitle}
                        </p>
                    </div>
                </div>

                {/* Menu Items */}
                <ul className="menu space-y-3 font-light w-full px-4 py-5">
                    {menus.map((menu, i) => {
                        if(menu.name == "Users" && !hasPermission("users.manage")){return null}
                        return (
                            <li key={i}>
                                <NavLink
                                    to={menu.path}
                                    end // makes sure only exact path matches
                                    className={({ isActive }) =>
                                        `flex rounded-lg text-white space-x-1 text-lg px-3 py-3 ${
                                            isActive
                                                ? "bg-primary cursor-default font-medium"
                                                : ""
                                        }`
                                    }
                                >
                                    <menu.icon size={23} />
                                    <span className="text-sm">{menu.name}</span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>

                <div className="absolute w-full bottom-0 text-xs text-gray-300 border-t border-gray-500 py-3 text-center">
                    &copy; {new Date().getFullYear()} Survey System
                </div>
            </div>
        </>
    );
};

export default Sidebar;
