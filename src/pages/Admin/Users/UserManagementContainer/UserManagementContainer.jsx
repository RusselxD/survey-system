import { Pencil, Shield, UserPlus, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { rolesAPI } from "../../../../utils/api/users";
import ManageRolesContainer from "./ManageRolesContainer/ManageRolesContainer";

const AddUserContainer = ({ addUserIsOpen }) => {
    return (
        <div
            className={`overflow-hidden transition-[height] ${
                addUserIsOpen ? "h-32" : "h-0"
            }`}
        >
            <h1>Add New User</h1>
        </div>
    );
};

const PermissionSettingsContainer = ({ permissionSettingsIsOpen }) => {
    return (
        <div
            className={`overflow-hidden transition-[height] duration-300 ease-in-out ${
                permissionSettingsIsOpen ? "h-32" : "h-0"
            }`}
        >
            <h1>Permission Settings</h1>
        </div>
    );
};

const UserManagementContainer = ({
    roles,
    updateRoleInList,
    addRoleInList,
    deleteRoleFromList
}) => {
    const [addUserIsOpen, setAddUserIsOpen] = useState(false);
    const [manageRolesIsOpen, setManageRolesIsOpen] = useState(false);
    const [permissionSettingsIsOpen, setPermissionSettingsIsOpen] =
        useState(false);

    return (
        <div className="container p-3 sm:p-4 lg:p-5 dark:bg-base-300 bg-white h-fit">
            <h1 className="custom-primary-txt font-semibold">
                Users Management
            </h1>
            <div className="flex gap-4 mt-2 custom-primary-txt">
                <button
                    onClick={() => {
                        setAddUserIsOpen(!addUserIsOpen);
                        setManageRolesIsOpen(false);
                        setPermissionSettingsIsOpen(false);
                    }}
                    className={`custom-primary-btn px-4 text-xs space-x-2 rounded-md py-2.5 ${
                        addUserIsOpen ? "bg-green-500 hover:bg-green-600" : ""
                    }`}
                >
                    <UserPlus size={20} />
                    <span>Add User</span>
                </button>
                <button
                    onClick={() => {
                        setAddUserIsOpen(false);
                        setManageRolesIsOpen(!manageRolesIsOpen);
                        setPermissionSettingsIsOpen(false);
                    }}
                    className={`custom-primary-btn px-4 text-xs space-x-2 rounded-md py-2.5 ${
                        manageRolesIsOpen
                            ? "bg-green-500 hover:bg-green-600"
                            : ""
                    }`}
                >
                    <Users size={20} />
                    <span>Manage Roles</span>
                </button>
                <button
                    onClick={() => {
                        setAddUserIsOpen(false);
                        setManageRolesIsOpen(false);
                        setPermissionSettingsIsOpen(!permissionSettingsIsOpen);
                    }}
                    className={`custom-primary-btn px-4 text-xs space-x-2 rounded-md py-2.5 ${
                        permissionSettingsIsOpen
                            ? "bg-green-500 hover:bg-green-600"
                            : ""
                    }`}
                >
                    <Shield size={20} />
                    <span>Permission Settings</span>
                </button>
            </div>
            <div
                className={`mt-3 transition-[max-height] duration-300 ease-in-out overflow-hidden ${
                    manageRolesIsOpen ||
                    addUserIsOpen ||
                    permissionSettingsIsOpen
                        ? "max-h-[1000rem]"
                        : "max-h-0"
                }`}
            >
                <AddUserContainer addUserIsOpen={addUserIsOpen} />
                <ManageRolesContainer
                    manageRolesIsOpen={manageRolesIsOpen}
                    roles={roles}
                    updateRoleInList={updateRoleInList}
                    addRoleInList={addRoleInList}
                    deleteRoleFromList={deleteRoleFromList}
                />
                <PermissionSettingsContainer
                    permissionSettingsIsOpen={permissionSettingsIsOpen}
                />
            </div>
        </div>
    );
};

export default UserManagementContainer;
