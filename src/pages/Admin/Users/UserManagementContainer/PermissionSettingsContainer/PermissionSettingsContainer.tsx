import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import Permissions from "./Permissions";
import {
    permissionsAPI,
    rolesAPI,
} from "../../../../../utils/api/models/users";
import { useAuth } from "../../../../../context/AuthContext";

interface Role {
    id: number;
    name: string;
    description: string;
    userCount: number;
}

interface Permission {
    id: number;
    name: string;
    description: string;
    roleIds: number[];
}

const Cover = (): React.JSX.Element => {
    return (
        <div className="absolute inset-0 dark:bg-gray-900 bg-gray-200 bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm z-10 flex items-center justify-center rounded-md">
            <div className="text-center px-6 py-4 dark:bg-gray-800 bg-white rounded-lg shadow-lg border dark:border-gray-700 border-gray-300 max-w-md">
                <p className="text-lg font-semibold custom-primary-txt mb-2">
                    Admin Permissions Cannot Be Modified
                </p>
                <p className="text-sm custom-sec-txt">
                    The administrator role has full system access. Permission
                    changes are not allowed for this role.
                </p>
            </div>
        </div>
    );
};

interface RolesDropDownProps {
    roles: Role[];
    chosenRole: number;
    setChosenRole: (roleId: number) => void;
    rolesAreOpen: boolean;
    setRolesAreOpen: (isOpen: boolean) => void;
}

const RolesDropDown = ({
    roles,
    chosenRole,
    setChosenRole,
    rolesAreOpen,
    setRolesAreOpen,
}: RolesDropDownProps) => {
    return (
        <div className="custom-primary-txt text-xs z-20">
            <div
                className="relative border border-gray-600 w-fit px-3 py-1 rounded-md cursor-pointer"
                onClick={() => setRolesAreOpen(!rolesAreOpen)}
            >
                <span className="flex space-x-2 py-1 items-center">
                    <span>
                        {roles.find((role) => role.id === chosenRole)?.name}
                    </span>
                    <ChevronDown
                        size={18}
                        className={`transition-transform duration-200 ${
                            rolesAreOpen ? "rotate-180" : ""
                        }`}
                    />
                </span>
                <div
                    className={`left-0 z-20 top-full mt-1 absolute overflow-hidden transition-[max-height] duration-300 ease-in-out dark:bg-gray-900 bg-slate-200 rounded-sm ${
                        rolesAreOpen ? "max-h-96" : "max-h-0"
                    }`}
                >
                    {roles.map((r) => {
                        return (
                            <p
                                onClick={() => {
                                    setChosenRole(r.id);
                                    setRolesAreOpen(false);
                                }}
                                key={r.id}
                                className="px-3 py-2 hover:bg-slate-300 dark:hover:bg-gray-700 cursor-pointer whitespace-nowrap"
                            >
                                {r.name}
                            </p>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

interface PermissionSettingsContainerProps {
    permissionSettingsIsOpen: boolean;
    closePermissionSettings: () => void;
    roles: Role[];
    permissions: Permission[];
    setPermissions: (permissions: Permission[]) => void;
}

const PermissionSettingsContainer = ({
    permissionSettingsIsOpen,
    closePermissionSettings,
    roles,
    permissions,
    setPermissions,
}: PermissionSettingsContainerProps) => {
    const { toastSuccess, toastError } = useAuth();
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const [rolesAreOpen, setRolesAreOpen] = useState<boolean>(false);

    const [chosenRole, setChosenRole] = useState<number>(
        roles.length >= 2 ? roles[1].id : 1
    );
    // permission IDs assigned to the chosen role
    const [chosenPermissions, setChosenPermissions] = useState<Set<number>>(
        new Set()
    );

    // Update chosenPermissions when chosenRole changes
    useEffect(() => {
        const assignedPermissions = new Set<number>();

        permissions.forEach((p) => {
            if (p.roleIds.includes(chosenRole)) {
                assignedPermissions.add(p.id);
            }
        });

        setChosenPermissions(assignedPermissions);
    }, [chosenRole, permissionSettingsIsOpen]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await rolesAPI.updateRolePermissions(chosenRole, [
                ...chosenPermissions,
            ]);

            const newPermissions = await permissionsAPI.getPermissions();
            setPermissions(newPermissions.data);

            toastSuccess("Permissions updated successfully");
        } catch (error: any) {
            console.log(error);
            toastError(error.response?.data || "Failed to update permissions");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div>
            <RolesDropDown
                roles={roles}
                chosenRole={chosenRole}
                setChosenRole={setChosenRole}
                rolesAreOpen={rolesAreOpen}
                setRolesAreOpen={setRolesAreOpen}
            />

            <div className="relative">
                {chosenRole === 1 && <Cover />}

                <Permissions
                    chosenPermissions={chosenPermissions}
                    setChosenPermissions={setChosenPermissions}
                    permissions={permissions}
                />
                <div className=" flex space-x-2 justify-end text-sm">
                    <button
                        onClick={() => closePermissionSettings()}
                        className="transition-colors mb-1 border px-3 py-2 rounded-md border-gray-400 text-gray-700 dark:text-white dark:hover:text-gray-900 hover:text-white hover:bg-gray-400 dark:hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={isSaving}
                        onClick={() => handleSave()}
                        className={`transition-colors mb-1 border px-3 py-2 rounded-md ${
                            isSaving
                                ? "border-gray-400 bg-gray-400 cursor-not-allowed"
                                : "border-blue-600 bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700"
                        } text-white`}
                    >
                        {isSaving ? (
                            <>
                                <span className="loading loading-spinner loading-sm mr-2"></span>
                                Saving...
                            </>
                        ) : (
                            "Save"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PermissionSettingsContainer;
