import React, { useState } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import { Check, Pencil, Trash, X } from "lucide-react";
import { TextInput } from "./ManageRolesContainer";
import ConfirmDeleteModal from "../../../../../components/ConfirmDeleteModal";
import { rolesAPI } from "../../../../../utils/api/users";
import { is } from "date-fns/locale";

const DynamicButtons = ({
    isUpdating,
    editingRoleId,
    role,
    handleCloseEditing,
    handleSaveEdit,
    handleOpenEditing,
}) => {
    return (
        <>
            {editingRoleId == role.id ? (
                <div className="flex text-xs">
                    <button
                        onClick={() => handleCloseEditing()}
                        className="transition-color bg-gray-500 hover:bg-gray-600 text-white flex items-center justify-center w-8 h-8 rounded-md mr-2"
                    >
                        <X size={15} />
                    </button>
                    <button
                        onClick={() => handleSaveEdit()}
                        disabled={isUpdating}
                        className={`transition-colors px-2 text-white w-fit h-8 flex items-center justify-center rounded-md ${
                            isUpdating
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600 "
                        }`}
                    >
                        {isUpdating ? (
                            <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                            <span>Save</span>
                        )}
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => handleOpenEditing(role.id)}
                    className="transition-colors dark:hover:text-white dark:text-gray-400 text-gray-600 hover:text-black p-2"
                >
                    <Pencil size={15} />
                </button>
            )}
        </>
    );
};

const TableHead = ({ editingRoleId }) => {
    return (
        <thead className="">
            <tr className="font-normal">
                {editingRoleId && <th className=""></th>}
                <th>Role Name</th>
                <th>Description</th>
                <th>Users</th>
                <th className="w-"></th>
            </tr>
        </thead>
    );
};

const RolesTable = ({ roles, updateRoleInList, deleteRoleFromList }) => {
    const { toastError, toastSuccess } = useAuth();

    const [deletingRoleId, setDeletingRoleId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteRole = async () => {
        setIsDeleting(true);
        try {
            await rolesAPI.deleteRole(deletingRoleId);
            deleteRoleFromList(deletingRoleId);
            toastSuccess("Role deleted successfully.");
        } catch (error) {
            toastError(error.response?.data || "Something went wrong.");
        } finally {
            setIsDeleting(false);
        }
    };

    // ====================================================== //
    const [editingRoleId, setEditingRoleId] = useState(null);
    const [newRoleName, setNewRoleName] = useState("");
    const [newRoleDescription, setNewRoleDescription] = useState("");

    const [isUpdating, setIsUpdating] = useState(false);
    // ====================================================== //

    const handleOpenEditing = (roleId) => {
        setEditingRoleId(roleId);

        setNewRoleName(roles.find((role) => role.id === roleId)?.name || "");
        setNewRoleDescription(
            roles.find((role) => role.id === roleId)?.description || ""
        );
    };

    const handleCloseEditing = () => {
        setEditingRoleId(null);

        setNewRoleName("");
        setNewRoleDescription("");
    };

    const handleSaveEdit = async () => {
        if (!newRoleName.trim()) {
            toastError("Role name cannot be empty.");
            return;
        }

        setIsUpdating(true);

        try {
            await rolesAPI.updateRole(editingRoleId, {
                name: newRoleName,
                description: newRoleDescription,
            });

            updateRoleInList({
                id: editingRoleId,
                name: newRoleName,
                description: newRoleDescription,
                userCount: roles.find((role) => role.id === editingRoleId)
                    .userCount,
            });

            toastSuccess("Role updated successfully.");
        } catch (error) {
            console.log(error);
            toastError(
                error.response?.data?.message || "Something went wrong."
            );
        } finally {
            handleCloseEditing();
            setIsUpdating(false);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                <TableHead editingRoleId={editingRoleId} />
                <tbody className="custom-primary-txt">
                    {roles.map((role) => {
                        return (
                            <tr key={role.id}>
                                {editingRoleId && (
                                    <td className="w-2">
                                        {isDeleting &&
                                            editingRoleId == role.id && (
                                                <span className="loading loading-spinner loading-xs"></span>
                                            )}

                                        {!isDeleting &&
                                            (editingRoleId == role.id ? (
                                                <Trash
                                                    onClick={() =>
                                                        setDeletingRoleId(
                                                            role.id
                                                        )
                                                    }
                                                    size={30}
                                                    className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-md cursor-pointer"
                                                />
                                            ) : null)}
                                    </td>
                                )}

                                <td className="break-words">
                                    {editingRoleId == role.id ? (
                                        <TextInput
                                            val={newRoleName}
                                            setVal={setNewRoleName}
                                            label="Role Name"
                                        />
                                    ) : (
                                        <span> {role.name}</span>
                                    )}
                                </td>

                                <td className=" text-sm  break-words">
                                    {editingRoleId == role.id ? (
                                        <TextInput
                                            val={newRoleDescription}
                                            setVal={setNewRoleDescription}
                                            label="Role Description"
                                        />
                                    ) : (
                                        <span> {role.description}</span>
                                    )}
                                </td>
                                <td>{role.userCount}</td>
                                <td className="flex justify-end">
                                    <DynamicButtons
                                        isUpdating={isUpdating}
                                        editingRoleId={editingRoleId}
                                        role={role}
                                        handleCloseEditing={handleCloseEditing}
                                        handleSaveEdit={handleSaveEdit}
                                        handleOpenEditing={handleOpenEditing}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {deletingRoleId && (
                <ConfirmDeleteModal
                    toBeDeleted={"this role"}
                    handleDelete={() => handleDeleteRole()}
                    onClose={() => setDeletingRoleId(null)}
                />
            )}
        </div>
    );
};

export default RolesTable;
