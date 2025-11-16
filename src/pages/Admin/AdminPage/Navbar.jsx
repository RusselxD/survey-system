import { LogOut, Menu } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const { firstName } = useAuth().user;

    return (
        <div className="navbar dark:bg-base-300 bg-white shadow-md justify-between items-center p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <button
                    className="lg:hidden btn btn-ghost btn-sm p-1 sm:p-2"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <Menu size={20} className="sm:w-6 sm:h-6" />
                </button>
                <div className="min-w-0">
                    <p className="custom-primary-txt sm:text-lg font-semibold truncate">
                        Admin Dashboard
                    </p>
                    <p className="text-xs sm:text-sm custom-sec-txt truncate">
                        Welcome back, {firstName}
                    </p>
                </div>
            </div>

            

            {/* <button className="btn bg-red-500 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 hover:bg-red-600 flex-shrink-0">
                <LogOut size={16} className="sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Log Out</span>
            </button> */}
        </div>
    );
};

export default Navbar;
