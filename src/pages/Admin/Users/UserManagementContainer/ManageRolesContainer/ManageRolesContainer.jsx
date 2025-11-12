import { Check, Pencil, Plus, Trash, X } from "lucide-react";
import { useState } from "react";
import { rolesAPI } from "../../../../../utils/api/users";
import { useAuth } from "../../../../../context/AuthContext";
import RolesTable from "./RolesTable";

export const TextInput = ({ val, setVal, label, withLabel = false }) => {
    return (
        <fieldset className="fieldset w-full">
            {withLabel && (
                <legend className="fieldset-legend mb-0.5">{label}</legend>
            )}
            <input
                type="text"
                className="input dark:bg-gray-800 bg-gray-300 dark:text-gray-100 text-gray-800 px-3 custom-sec-txt"
                placeholder={label}
                value={val}
                onChange={(e) => setVal(e.target.value)}
            />
        </fieldset>
    );
};

const AddNewRole = ({ addRoleInList }) => {
    const { toastError, toastSuccess } = useAuth();

    const [addNewRoleIsOpen, setAddNewRoleIsOpen] = useState(false);

    const [newRoleName, setNewRoleName] = useState("");
    const [newRoleDescription, setNewRoleDescription] = useState("");

    const [isAdding, setIsAdding] = useState(false);

    const handleAddNewRole = async () => {
        if (!newRoleName.trim()) {
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
            toastError(
                error.response?.data?.message || "Something went wrong."
            );
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

const ManageRolesContainer = ({
    manageRolesIsOpen,
    roles,
    updateRoleInList,
    addRoleInList,
    deleteRoleFromList
}) => {
    return (
        <div
            className={`${
                manageRolesIsOpen ? "max-h-[1000rem]" : "max-h-0"
            } overflow-hidden transition-[max-height] duration-300 ease-in-out`}
        >
            <RolesTable
                roles={roles}
                updateRoleInList={updateRoleInList}
                deleteRoleFromList={deleteRoleFromList}
            />
            <AddNewRole addRoleInList={addRoleInList} />
        </div>
    );
};

export default ManageRolesContainer;
