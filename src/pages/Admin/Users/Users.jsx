import React, { useEffect, useState } from "react";
import { usersAPI } from "../../../utils/api/users";
import { Edit, Pencil } from "lucide-react";
import UsersPageSkeleton from "./UsersPageSkeleton";
import ModifyUserModal from "./ModifyUserModal";

const Users = () => {
    const [users, setUsers] = useState([]);
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

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);

            try {
                const res = await usersAPI.getUsers();
                console.log(res);
                setUsers(res.data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (isLoading) {
        return <UsersPageSkeleton />;
    }

    return (
        <div className="p-0 sm:p-1 md:p-3 dark:bg-base-100 bg-gray-100/70 flex-1 flex">
            <div className="container p-3 sm:p-4 lg:p-5 dark:bg-base-300 bg-white flex-1">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead className="">
                            <tr className="font-normal">
                                <th></th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="custom-primary-txt">
                            {users.map((user, i) => {
                                return (
                                    <tr key={user.id || i}>
                                        <th className=" text-center ">
                                            {i + 1}
                                        </th>
                                        <td className="  break-all">
                                            {user.firstName} {user.lastName}
                                        </td>
                                        <td className=" text-sm  break-words">
                                            {user.email}
                                        </td>
                                        <td className="w-40">
                                            {/* <span className="bg-green-600 px-2 py-1 rounded-lg text-white text-xs">
                                                
                                            </span> */}
                                            {user.role}
                                        </td>
                                        <td className="text-center">
                                            <button
                                                onClick={() => {
                                                    setSelectedUserToModify(
                                                        user
                                                    );
                                                    setModifyUserModalisOpen(
                                                        true
                                                    );
                                                }}
                                                className="transition-colors dark:hover:text-white dark:text-gray-400 text-gray-600 hover:text-black p-2"
                                            >
                                                <Pencil size={15} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {modifyUserModalisOpen && (
                <ModifyUserModal
                    userPassed={selectedUserToModify}
                    onClose={() => setModifyUserModalisOpen(false)}
                    updateUserInList={updateUserInList}
                    deleteUserFromList={deleteUserFromList}
                />
            )}
        </div>
    );
};

export default Users;
