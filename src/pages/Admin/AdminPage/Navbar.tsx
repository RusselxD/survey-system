import React from "react";
import { Menu, Star, Shield } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

interface RoleBadgeProps {
    role: string | undefined;
}

const RoleBadge = ({ role }: RoleBadgeProps): React.JSX.Element => {
    const isSuperAdmin = role?.toLowerCase() === "super admin";

    if (isSuperAdmin) {
        return (
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg">
                <Star size={16} fill="currentColor" />
                <span className="font-semibold text-sm">{role}</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 px-4 py-3 rounded-lg dark:bg-base-100 bg-gray-100 border dark:border-gray-600 border-gray-300 shadow-sm">
            <Shield size={16} className="custom-primary-txt" />
            <span className="font-medium text-sm custom-primary-txt">
                {role}
            </span>
        </div>
    );
};

interface NavbarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({
    isSidebarOpen,
    setIsSidebarOpen,
}: NavbarProps): React.JSX.Element => {
    const { user } = useAuth();
    const firstName = user?.firstName || "";
    const lastName = user?.lastName || "";
    const role = user?.role || "";

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
                        Welcome Back,
                    </p>
                    <p className="text-xs sm:text-sm custom-sec-txt truncate">
                        {firstName} {lastName}
                    </p>
                </div>
            </div>

            <RoleBadge role={role} />
        </div>
    );
};

export default Navbar;
