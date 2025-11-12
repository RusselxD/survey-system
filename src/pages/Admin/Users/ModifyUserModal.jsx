import { AlertTriangle, ChevronDown, X } from "lucide-react";
import { useEffect, useState } from "react";

import { rolesAPI, usersAPI } from "../../../utils/api/users";
import ModalXButton from "../../../components/ModalXButton";
import { useAuth } from "../../../context/AuthContext";

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

const RoleDropDown = ({
    roles,
    role,
    setRole,
    rolesDropdownOpen,
    setRolesDropdownOpen,
}) => {
    return (
        <fieldset className="fieldset w-full mt-3">
            <legend className="fieldset-legend mb-0.5">Role</legend>
            <div className="relative">
                <button
                    tabIndex={0}
                    onClick={() => setRolesDropdownOpen(!rolesDropdownOpen)}
                    className="dark:bg-gray-900 bg-gray-300 dark:text-gray-100 text-gray-800 min-w-32 py-3 px-4 space-x-2 flex items-center justify-between rounded-md"
                >
                    <span>{role}</span>
                    <ChevronDown
                        size={20}
                        className={`${
                            rolesDropdownOpen ? "rotate-180" : ""
                        } transition-transform duration-150`}
                    />
                </button>
                <div
                    className={`overflow-hidden absolute custom-primary-txt rounded-md mt-1 flex flex-col transition-[opacity] duration-150 ease-in-out ${
                        rolesDropdownOpen
                            ? "block opacity-100"
                            : "hidden opacity-0"
                    }`}
                >
                    {roles.map((r, i) => {
                        return (
                            <button
                                key={r.name}
                                onClick={() => {
                                    setRole(r.id);
                                    setRolesDropdownOpen(false);
                                }}
                                className={`px-3 py-2 text-left ${
                                    r.name === role
                                        ? "bg-gray-200 dark:bg-gray-600 cursor-default"
                                        : "dark:bg-gray-800 dark:hover:bg-gray-600"
                                }  ${
                                    i == roles.length - 1
                                        ? "mb-2 rounded-b-md"
                                        : ""
                                } `}
                            >
                                {r.name}
                            </button>
                        );
                    })}
                </div>
            </div>
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

const ConfirmDeleteContainer = ({
    confirmDeleteUserIsOpen,
    handleDeleteUser,
    isDeletingUser,
    user,
}) => {
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

const ModifyUserModal = ({
    roles,
    userPassed,
    onClose,
    updateUserInList,
    deleteUserFromList,
    updateRoleCountInList,
}) => {

    const { toastError, toastSuccess } = useAuth();

    const [rolesDropdownOpen, setRolesDropdownOpen] = useState(false);

    const oldRoleId = roles.find((r) => r.id === userPassed.roleId)?.id || "";

    const [user, setUser] = useState(userPassed);

    const [confirmDeleteUserIsOpen, setConfirmDeleteUserIsOpen] =
        useState(false);

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
            console.log(error)
            toastError(
                error.response?.data || "Something went wrong."
            );
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
                    <TextInput
                        val={user.firstName}
                        setVal={(value) =>
                            setUser({ ...user, firstName: value })
                        }
                        label="First Name"
                    />
                    <TextInput
                        val={user.lastName}
                        setVal={(value) =>
                            setUser({ ...user, lastName: value })
                        }
                        label="Last Name"
                    />
                </div>

                <TextInput
                    val={user.email}
                    setVal={(value) => setUser({ ...user, email: value })}
                    label="Email"
                />

                <RoleDropDown
                    roles={roles}
                    role={roles.find((r) => r.id === user.roleId)?.name || ""}
                    setRole={(value) => setUser({ ...user, roleId: value })}
                    rolesDropdownOpen={rolesDropdownOpen}
                    setRolesDropdownOpen={setRolesDropdownOpen}
                />

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
