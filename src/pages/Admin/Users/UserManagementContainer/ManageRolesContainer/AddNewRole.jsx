import React, { useState } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import { Plus } from "lucide-react";
import TextInput from "../../../../../components/TextInput";
import { rolesAPI } from "../../../../../utils/api/models/users";

const AddNewRole = ({ addRoleInList }) => {
    const { toastError, toastSuccess } = useAuth();

    const [addNewRoleIsOpen, setAddNewRoleIsOpen] = useState(false);

    const [newRoleName, setNewRoleName] = useState("");
    const [newRoleDescription, setNewRoleDescription] = useState("");

    const [isAdding, setIsAdding] = useState(false);

    const handleAddNewRole = async () => {
        if (!newRoleName.trim()) {
            toastError("Role name cannot be empty.");
            return;
        }

        setIsAdding(true);

        try {
            const res = await rolesAPI.createRole({
                name: newRoleName,
                description: newRoleDescription,
            });
            addRoleInList(res.data);
            setAddNewRoleIsOpen(false);
            toastSuccess("Role added successfully.");
            setNewRoleName("");
            setNewRoleDescription("");
        } catch (error) {
            console.log(error);
            toastError(error.message || "Something went wrong.");
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div>
            <div className="flex items-center space-x-3 mt-3">
                <button
                    onClick={() => setAddNewRoleIsOpen(!addNewRoleIsOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-white text-sm bg-green-500 hover:bg-green-600"
                >
                    <Plus size={17} />
                    <span>New Role</span>
                </button>
            </div>

            <div
                className={`pl-2 flex flex-col space-y-3 overflow-hidden mt-2 transition-[max-height] ${
                    addNewRoleIsOpen ? "max-h-96" : "max-h-0"
                }`}
            >
                <TextInput
                    val={newRoleName}
                    setVal={setNewRoleName}
                    label="Role Name"
                    withLabel={true}
                />
                <TextInput
                    val={newRoleDescription}
                    setVal={setNewRoleDescription}
                    label="Role Description"
                    withLabel={true}
                />
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => setAddNewRoleIsOpen(false)}
                        className="px-3 py-2 dark:border-gray-300 border-gray-500 transition-colors rounded-md border dark:hover:text-gray-800 hover:text-white dark:hover:bg-gray-300 hover:bg-gray-500 w-fit dark:text-white text-gray-600 text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => handleAddNewRole()}
                        className="px-3 transition-colors py-2 rounded-md bg-green-500 hover:bg-green-600 w-fit text-sm text-white"
                    >
                        {isAdding && (
                            <span className="loading loading-spinner loading-xs mr-2"></span>
                        )}
                        <span>Confirm</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNewRole;
