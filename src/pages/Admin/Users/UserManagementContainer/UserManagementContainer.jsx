import { Pencil, Shield, UserPlus, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { rolesAPI } from "../../../../utils/api/users";
import ManageRolesContainer from "./ManageRolesContainer/ManageRolesContainer";
import PermissionSettingsContainer from "./PermissionSettingsContainer/PermissionSettingsContainer";
import { useAuth } from "../../../../context/AuthContext";
import AddUserContainer from "./AddUserContainer/AddUserContainer";

const ButtonsContainer = ({
    addUserIsOpen,
    setAddUserIsOpen,
    manageRolesIsOpen,
    setManageRolesIsOpen,
    permissionSettingsIsOpen,
    setPermissionSettingsIsOpen,

    hasPermission,
}) => {
    return (
        <div className="flex gap-4 mt-2 custom-primary-txt">
            {hasPermission("users.manage") && (
                <button
                    onClick={() => {
                        setManageRolesIsOpen(false);
                        setPermissionSettingsIsOpen(false);
                        setAddUserIsOpen(!addUserIsOpen);
                    }}
                    className={`custom-primary-btn px-4 text-xs space-x-2 rounded-md py-2.5 ${
                        addUserIsOpen ? "bg-green-500 hover:bg-green-600" : ""
                    }`}
                >
                    <UserPlus size={20} />
                    <span>Add User</span>
                </button>
            )}
            {hasPermission("roles.manage") && (
                <>
                    <button
                        onClick={() => {
                            setAddUserIsOpen(false);
                            setPermissionSettingsIsOpen(false);
                            setManageRolesIsOpen(!manageRolesIsOpen);
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
                            setPermissionSettingsIsOpen(
                                !permissionSettingsIsOpen
                            );
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
                </>
            )}
        </div>
    );
};

const UserManagementContainer = ({
    addUserToList,

    roles,
    updateRoleInList,
    addRoleInList,
    deleteRoleFromList,

    permissions,
    setPermissions,
}) => {
    const { hasPermission } = useAuth();

    const [addUserIsOpen, setAddUserIsOpen] = useState(false);
    const [manageRolesIsOpen, setManageRolesIsOpen] = useState(false);
    const [permissionSettingsIsOpen, setPermissionSettingsIsOpen] =
        useState(false);

    return (
        <div className="custom-container p-3 sm:p-4 lg:p-5 mb-3 dark:bg-base-300 bg-white h-fit">
            <h1 className="custom-primary-txt font-semibold">
                Users Management
            </h1>
            <ButtonsContainer
                addUserIsOpen={addUserIsOpen}
                setAddUserIsOpen={setAddUserIsOpen}
                manageRolesIsOpen={manageRolesIsOpen}
                setManageRolesIsOpen={setManageRolesIsOpen}
                permissionSettingsIsOpen={permissionSettingsIsOpen}
                setPermissionSettingsIsOpen={setPermissionSettingsIsOpen}
                hasPermission={hasPermission}
            />
            <div
                className={`mt-3 transition-[max-height] duration-300 ease-in-out overflow-hidden ${
                    manageRolesIsOpen ||
                    addUserIsOpen ||
                    permissionSettingsIsOpen
                        ? "max-h-[1000rem]"
                        : "max-h-0"
                }`}
            >
                {hasPermission("users.manage") && addUserIsOpen && (
                    <AddUserContainer
                        roles={roles}
                        addUserToList={addUserToList}
                        setAddUserIsOpen={setAddUserIsOpen}
                    />
                )}
                {hasPermission("roles.manage") && (
                    <>
                        {manageRolesIsOpen && (
                            <ManageRolesContainer
                                roles={roles}
                                updateRoleInList={updateRoleInList}
                                addRoleInList={addRoleInList}
                                deleteRoleFromList={deleteRoleFromList}
                            />
                        )}
                        {permissionSettingsIsOpen && (
                            <PermissionSettingsContainer
                                permissionSettingsIsOpen={
                                    permissionSettingsIsOpen
                                }
                                closePermissionSettings={() =>
                                    setPermissionSettingsIsOpen(false)
                                }
                                roles={roles}
                                permissions={permissions}
                                setPermissions={setPermissions}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default UserManagementContainer;
