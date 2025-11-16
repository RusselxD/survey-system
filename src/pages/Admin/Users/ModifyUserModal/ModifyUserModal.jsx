import { useState } from "react";

import { usersAPI } from "../../../../utils/api/users";
import ModalXButton from "../../../../components/ModalXButton";
import { useAuth } from "../../../../context/AuthContext";
import ConfirmDeleteContainer from "./ConfirmDeleteContainer";
import Roles from "./Roles";
import { is } from "date-fns/locale";

const TextInput = ({ val, setVal, label }) => {
    return (
        <fieldset className="fieldset w-full">
            <legend className="fieldset-legend mb-0.5">{label}</legend>
            <input
                type="text"
                className="input dark:bg-gray-900 bg-gray-300 dark:text-gray-100 text-gray-800 px-3 custom-sec-txt"
                placeholder={label}
                value={val}
                onChange={(e) => setVal(e.target.value)}
            />
        </fieldset>
    );
};

const DynamicDeleteUserButton = ({
    confirmDeleteUserIsOpen,
    setConfirmDeleteUserIsOpen,
    isUpdatingUser,
}) => {
    return (
        <button
            disabled={isUpdatingUser}
            onClick={() => setConfirmDeleteUserIsOpen(!confirmDeleteUserIsOpen)}
            className={` px-4 py-2 rounded-md transition-colors ${
                confirmDeleteUserIsOpen
                    ? "border dark:border-gray-300 border-gray-500 dark:hover:text-gray-800 hover:text-white dark:hover:bg-gray-300 hover:bg-gray-500"
                    : isUpdatingUser
                    ? "bg-red-600 text-white cursor-not-allowed opacity-50"
                    : "bg-red-600 hover:bg-red-700 text-white"
            }`}
        >
            {confirmDeleteUserIsOpen ? "Cancel" : "Delete User"}
        </button>
    );
};

const ModifyUserModal = ({
    roles,
    userPassed,
    onClose,
    updateUserInList,
    deleteUserFromList,
    updateRoleCountInList,
}) => {
    const { toastError, toastSuccess } = useAuth();

    const oldRoleId = roles.find((r) => r.id === userPassed.roleId)?.id || "";

    const [user, setUser] = useState(userPassed);

    const [confirmDeleteUserIsOpen, setConfirmDeleteUserIsOpen] =
        useState(false);

    const [errors, setErrors] = useState({});
    const [isDeletingUser, setIsDeletingUser] = useState(false);
    const [isUpdatingUser, setIsUpdatingUser] = useState(false);

    const handleDeleteUser = async () => {
        setIsDeletingUser(true);

        try {
            await usersAPI.deleteUser(user.id);
            deleteUserFromList(user.id);
            updateRoleCountInList(user.role, false);
            onClose();
            toastSuccess("User deleted successfully.");
        } catch (error) {
            toastError(
                error.response?.data?.message || "Something went wrong."
            );
        } finally {
            setIsDeletingUser(false);
        }
    };

    const handleUpdateUser = async () => {
        if (isUpdatingUser) return;

        // Validate form
        const newErrors = {};

        if (!user.firstName?.trim()) {
            newErrors.firstName = "First name is required";
        }

        if (!user.lastName?.trim()) {
            newErrors.lastName = "Last name is required";
        }

        if (!user.email?.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!user.roleId) {
            newErrors.roleId = "Please select a role";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        setIsUpdatingUser(true);

        // configuration based on UserAdminUpdateDto in backend
        const newUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roleId: roles.find((role) => role.id === user.roleId)?.id,
        };

        try {
            await usersAPI.updateUser(user.id, newUser);

            updateUserInList(newUser);

            if (oldRoleId !== newUser.roleId) {
                updateRoleCountInList(
                    roles.find((r) => r.id === oldRoleId)?.name || "",
                    false
                );
                updateRoleCountInList(
                    roles.find((r) => r.id === newUser.roleId)?.name || "",
                    true
                );
            }
            toastSuccess("User updated successfully.");
            onClose();
        } catch (error) {
            console.log(error);
            toastError(error.response?.data || "Something went wrong.");
        } finally {
            setIsUpdatingUser(false);
        }
    };

    return (
        <div className="modal modal-open" onClick={onClose}>
            <div
                className="modal-box pb-3 dark:bg-gray-700 lg:max-w-[45vw] max-h-[80vh] bg-white relative flex flex-col items-start px-4 sm:px-5"
                onClick={(e) => e.stopPropagation()}
            >
                <ModalXButton onClose={onClose} />

                <div className="custom-primary-txt -mt-2 border-b pb-2 border-base-content w-full">
                    <p className="truncate max-w-[90%]">
                        Edit User: {user.firstName}
                    </p>
                </div>

                <div className="w-full flex justify-between space-x-5 my-3">
                    <div className="w-full">
                        <TextInput
                            val={user.firstName}
                            setVal={(value) =>
                                setUser({ ...user, firstName: value })
                            }
                            label="First Name"
                        />
                        {errors.firstName && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.firstName}
                            </p>
                        )}
                    </div>
                    <div className="w-full">
                        <TextInput
                            val={user.lastName}
                            setVal={(value) =>
                                setUser({ ...user, lastName: value })
                            }
                            label="Last Name"
                        />
                        {errors.lastName && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.lastName}
                            </p>
                        )}
                    </div>
                </div>

                <div className="w-full">
                    <TextInput
                        val={user.email}
                        setVal={(value) => setUser({ ...user, email: value })}
                        label="Email"
                    />
                    {errors.email && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.email}
                        </p>
                    )}
                </div>

                <Roles
                    roles={roles}
                    role={roles.find((r) => r.id === user.roleId)?.name || ""}
                    setRole={(value) => setUser({ ...user, roleId: value })}
                />
                {errors.roleId && (
                    <p className="text-xs text-red-500 mt-1">{errors.roleId}</p>
                )}

                <div className="flex items-center justify-between custom-primary-txt text-[0.800rem] mt-5 w-full">
                    <DynamicDeleteUserButton
                        confirmDeleteUserIsOpen={confirmDeleteUserIsOpen}
                        setConfirmDeleteUserIsOpen={setConfirmDeleteUserIsOpen}
                        isUpdatingUser={isUpdatingUser}
                    />
                    <div className="space-x-3 flex">
                        <button
                            onClick={() => onClose()}
                            disabled={confirmDeleteUserIsOpen}
                            className={` px-4 py-2 rounded-md transition-colors border dark:border-gray-300 border-gray-500  ${
                                confirmDeleteUserIsOpen
                                    ? "cursor-not-allowed opacity-50"
                                    : "dark:hover:text-gray-800 hover:text-white dark:hover:bg-gray-300 hover:bg-gray-500"
                            }`}
                        >
                            Cancel
                        </button>
                        <button
                            disabled={confirmDeleteUserIsOpen || isUpdatingUser}
                            onClick={() => handleUpdateUser()}
                            className={`bg-green-600  text-white px-4 py-2 rounded-md transition-colors  ${
                                confirmDeleteUserIsOpen
                                    ? "bg-gray-400  cursor-not-allowed opacity-50"
                                    : "hover:bg-green-700"
                            }`}
                        >
                            {isUpdatingUser ? (
                                <>
                                    <span className="loading loading-spinner loading-xs mr-2"></span>
                                    Saving...
                                </>
                            ) : (
                                <span>Save Changes</span>
                            )}
                        </button>
                    </div>
                </div>

                <ConfirmDeleteContainer
                    confirmDeleteUserIsOpen={confirmDeleteUserIsOpen}
                    handleDeleteUser={handleDeleteUser}
                    isDeletingUser={isDeletingUser}
                    user={user}
                />
            </div>
        </div>
    );
};

export default ModifyUserModal;
