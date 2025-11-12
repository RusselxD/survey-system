import React, { useEffect, useState } from "react";
import { rolesAPI, usersAPI } from "../../../utils/api/users";
import UsersPageSkeleton from "./UsersPageSkeleton";
import ModifyUserModal from "./ModifyUserModal";
import UsersTable from "./UsersTable";
import UserManagementContainer from "./UserManagementContainer/UserManagementContainer";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [modifyUserModalisOpen, setModifyUserModalisOpen] = useState(false);
    const [selectedUserToModify, setSelectedUserToModify] = useState(null);

    const deleteUserFromList = (userId) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    };

    const updateUserInList = (updatedUser) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
            )
        );
    };

    const updateRoleInList = (updatedRole) => {
        setRoles((prevRoles) =>
            prevRoles.map((role) =>
                role.id === updatedRole.id ? updatedRole : role
            )
        );
        console.log(roles);
    };

    const addRoleInList = (newRole) => {
        setRoles((prevRoles) => [...prevRoles, newRole]);
    };

    const deleteRoleFromList = (roleId) => {
        setRoles((prevRoles) => prevRoles.filter((role) => role.id !== roleId));
    };

    const updateRoleCountInList = (roleName, increment = true) => {
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
                const usersRes = await usersAPI.getUsers();
                setUsers(usersRes.data);

                const rolesRes = await rolesAPI.getRoles();
                setRoles(rolesRes.data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return <UsersPageSkeleton />;
    }

    return (
        <div className="p-0 sm:p-1 md:p-3 dark:bg-base-100 bg-gray-100/70 flex-1 flex flex-col">
            <UserManagementContainer
                roles={roles}
                updateRoleInList={updateRoleInList}
                addRoleInList={addRoleInList}
                deleteRoleFromList={deleteRoleFromList}
            />
            <div className="container p-3 sm:p-4 lg:p-5 dark:bg-base-300 bg-white flex-1 mt-3">
                <UsersTable
                    users={users}
                    roles={roles}
                    setModifyUserModalisOpen={setModifyUserModalisOpen}
                    setSelectedUserToModify={setSelectedUserToModify}
                />
            </div>

            {modifyUserModalisOpen && (
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
