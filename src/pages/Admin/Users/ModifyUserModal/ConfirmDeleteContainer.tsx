import { AlertTriangle } from "lucide-react";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roleId: number;
    role?: string;
}

interface ConfirmDeleteContainerProps {
    confirmDeleteUserIsOpen: boolean;
    handleDeleteUser: () => void;
    isDeletingUser: boolean;
    user: User;
}

const ConfirmDeleteContainer = ({
    confirmDeleteUserIsOpen,
    handleDeleteUser,
    isDeletingUser,
    user,
}: ConfirmDeleteContainerProps): React.JSX.Element => {
    return (
        <div
            className={` mt-3 overflow-hidden w-full transition-[height] ${
                confirmDeleteUserIsOpen ? "h-40" : "h-0"
            }`}
        >
            <div className="custom-primary-txt text-xs space-y-2 flex flex-col justify-center py-3 w-full border-l-[6px] border-red-700 dark:bg-red-500 bg-red-200 px-4">
                <span className="flex items-center dark:text-red-200 text-red-700">
                    <AlertTriangle />
                    <span className="text-sm font-semibold ml-1">Warning</span>
                </span>
                <p className="custom-sec-txt ">This action cannot be undone.</p>
                <p className="break-all custom-sec-txt">
                    {user.firstName} will be deleted from the list of people who
                    have access.
                </p>
            </div>
            <button
                onClick={() => handleDeleteUser()}
                disabled={isDeletingUser}
                className={`text-white px-3 py-2 text-sm rounded-md mt-2 transition-colors ${
                    isDeletingUser
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                }`}
            >
                {isDeletingUser ? (
                    <>
                        <span className="loading loading-spinner loading-xs mr-2"></span>
                        Deleting...
                    </>
                ) : (
                    <span>Delete</span>
                )}
            </button>
        </div>
    );
};

export default ConfirmDeleteContainer;
