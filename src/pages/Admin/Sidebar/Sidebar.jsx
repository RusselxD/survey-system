import {
    ShieldCheck,
    LayoutDashboard,
    ClipboardList,
    MessageSquare,
    BarChart3,
    Users,
    Settings,
} from "lucide-react";

const menus = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Manage Surveys", icon: ClipboardList },
    { name: "Responses", icon: MessageSquare },
    { name: "Analytics", icon: BarChart3 },
    { name: "Users", icon: Users },
    { name: "Settings", icon: Settings },
];

const appTitle = import.meta.env.VITE_APP_TITLE;

const Sidebar = ({ chosenCategory, setChosenCategory }) => {
    return (
        <div className="w-64 top-0 bottom-0 left-0 fixed bg-gray-900">
            {/* Top Section */}
            <div className="flex items-center justify-center px-3 py-5 border-b border-gray-500 space-x-2">
                <ShieldCheck className="text-blue-500" size={35} />
                <div className="flex-1">
                    <p className="text-lg font-bold">Admin Panel</p>
                    <p className="text-gray-300 text-xs break-all">{appTitle}</p>
                </div>
            </div>

            {/* Menu Items */}
            <ul className="menu space-y-3 font-light w-full px-4 py-5">
                {menus.map((menu, i) => {
                    return (
                        <li key={i}>
                            <button
                                className={`flex rounded-lg space-x-1 text-lg px-3 py-3 ${
                                    chosenCategory == i
                                        ? "bg-blue-600 cursor-default font-medium"
                                        : ""
                                }`}
                                onClick={() => setChosenCategory(i)}
                            >
                                <menu.icon size={23} />
                                <span className="text-sm">{menu.name}</span>
                            </button>
                        </li>
                    );
                })}
            </ul>

            <div className="absolute w-full bottom-0 text-xs text-gray-300 border-t border-gray-500 py-3 text-center">
                &copy; {new Date().getFullYear()} Survey System
            </div>
        </div>
    );
};

export default Sidebar;
