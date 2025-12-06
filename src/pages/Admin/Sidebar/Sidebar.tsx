import React from "react";
import {
    ShieldCheck,
    LayoutDashboard,
    ClipboardList,
    BarChart3,
    Users,
    Settings,
    LucideIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

interface MenuItem {
    name: string;
    icon: LucideIcon;
    path: string;
}

const menus: MenuItem[] = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Analytics", icon: BarChart3, path: "/admin/analytics" },
    { name: "Surveys", icon: ClipboardList, path: "/admin/surveys" },
    { name: "Users", icon: Users, path: "/admin/users" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
];

const appTitle: string = import.meta.env.VITE_APP_TITLE;

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps): React.JSX.Element => {
    const { hasPermission, hasAnyPermission } = useAuth();

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
                        if (
                            menu.name === "Users" &&
                            !hasAnyPermission(["users.manage", "roles.manage"])
                        ) {
                            return null;
                        }
                        if (
                            menu.name === "Settings" &&
                            !hasPermission("system.manage")
                        ) {
                            return null;
                        }
                        if (
                            menu.name === "Analytics" &&
                            !hasAnyPermission([
                                "analytics.view",
                                "analytics.export",
                            ])
                        ) {
                            return null;
                        }
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
