import { useEffect, useState } from "react";
import {
    permissionsAPI,
    rolesAPI,
    usersAPI,
} from "../../../utils/api/models/users";
import UsersPageSkeleton from "./UsersPageSkeleton";
import ModifyUserModal from "./ModifyUserModal/ModifyUserModal";
import UsersTable from "./UsersTable";
import UserManagementContainer from "./UserManagementContainer/UserManagementContainer";
import { useAuth } from "../../../context/AuthContext";
import FailedToLoad from "../../../components/reusable/FailedToLoad";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roleId: number;
}

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

const UsersPage = (): React.JSX.Element => {
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [permissions, setPermissions] = useState<Permission[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorLoadingUsers, setErrorLoadingUsers] = useState<boolean>(false);

    const [modifyUserModalisOpen, setModifyUserModalisOpen] =
        useState<boolean>(false);
    const [selectedUserToModify, setSelectedUserToModify] =
        useState<User | null>(null);

    const { toastError, hasPermission } = useAuth();

    const addUserToList = (newUser: User): void => {
        setUsers((prevUsers) => [...prevUsers, newUser]);
    };

    const deleteUserFromList = (userId: string): void => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    };

    const updateUserInList = (updatedUser: User): void => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
            )
        );
    };

    const updateRoleInList = (updatedRole: Role): void => {
        setRoles((prevRoles) =>
            prevRoles.map((role) =>
                role.id === updatedRole.id ? updatedRole : role
            )
        );
        console.log(roles);
    };

    const addRoleInList = (newRole: Role): void => {
        setRoles((prevRoles) => [...prevRoles, newRole]);
    };

    const deleteRoleFromList = (roleId: number): void => {
        setRoles((prevRoles) => prevRoles.filter((role) => role.id !== roleId));
    };

    const updateRoleCountInList = (
        roleName: string,
        increment: boolean = true
    ): void => {
        setRoles((prevRoles) =>
            prevRoles.map((role) => {
                if (role.name === roleName) {
                    return {
                        ...role,
                        userCount: increment
                            ? role.userCount + 1
                            : role.userCount - 1,
                    };
                }
                return role;
            })
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                await new Promise((resolve) => setTimeout(resolve, 2000));
                const usersRes = await usersAPI.getUsers();
                setUsers(usersRes.data);

                const rolesRes = await rolesAPI.getRoles();
                setRoles(rolesRes.data);

                const permissionsRes = await permissionsAPI.getPermissions();
                setPermissions(permissionsRes.data);

                setErrorLoadingUsers(false);
            } catch (error: any) {
                setErrorLoadingUsers(true);
                toastError(error.message || "Something went wrong.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return <UsersPageSkeleton />;
    }

    if (errorLoadingUsers) {
        return <FailedToLoad />;
    }

    return (
        <div className="p-0 sm:p-1 md:p-3 dark:bg-base-100 bg-gray-100/70 flex-1 flex flex-col">
            <UserManagementContainer
                addUserToList={addUserToList}
                roles={roles}
                updateRoleInList={updateRoleInList}
                addRoleInList={addRoleInList}
                deleteRoleFromList={deleteRoleFromList}
                permissions={permissions}
                setPermissions={setPermissions}
            />

            <div className="custom-container p-3 sm:p-4 lg:p-5 dark:bg-base-300 bg-white flex-1">
                <UsersTable
                    users={users}
                    roles={roles}
                    setModifyUserModalisOpen={setModifyUserModalisOpen}
                    setSelectedUserToModify={setSelectedUserToModify}
                    hasPermission={hasPermission}
                />
            </div>

            {modifyUserModalisOpen &&
                hasPermission("users.manage") &&
                selectedUserToModify && (
                    <ModifyUserModal
                        roles={roles}
                        userPassed={selectedUserToModify}
                        onClose={() => setModifyUserModalisOpen(false)}
                        updateUserInList={updateUserInList}
                        deleteUserFromList={deleteUserFromList}
                        updateRoleCountInList={updateRoleCountInList}
                    />
                )}
        </div>
    );
};

export default UsersPage;
