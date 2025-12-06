import { Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
}

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }: NavbarProps) => {
    const { user } = useAuth();
    const firstName = user?.firstName || "User";

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
        </div>
    );
};

export default Navbar;
