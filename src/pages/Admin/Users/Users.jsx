import React, { useEffect, useState } from "react";
import { usersAPI } from "../../../utils/api/users";
import { Edit, Pencil } from "lucide-react";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);

            try {
                const res = await usersAPI.getUsers();
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
        return (
            <div className="p-0 sm:p-1 md:p-3 lg:p-8 dark:bg-base-100 bg-gray-100/70 flex-1 flex flex-col items-center">
                {/* <div className="container p-3 sm:p-4 lg:p-5 dark:bg-base-300 bg-white flex-1"> */}
                <div className=" skeleton w-[95%] h-10 mb-5"></div>
                <div className=" skeleton w-[95%] h-10 mb-5"></div>
                <div className=" skeleton w-[95%] h-10 mb-5"></div>
                <div className=" skeleton w-[95%] h-10 mb-5"></div>
                <div className=" skeleton w-[95%] h-10 mb-5"></div>
                {/* </div> */}
            </div>
        );
    }

    return (
        <div className="p-0 sm:p-1 md:p-3 lg:p-8 dark:bg-base-100 bg-gray-100/70 flex-1">
            <div className="container p-3 sm:p-4 lg:p-5 dark:bg-base-300 bg-white">
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
                                        <th className=" text-center border">
                                            {i + 1}
                                        </th>
                                        <td className=" border break-all">
                                            {user.firstName} {user.lastName}
                                        </td>
                                        <td className=" text-sm border break-words">
                                            {user.email}
                                        </td>
                                        <td className="] border">
                                            <span className="bg-green-600 px-2 py-1 rounded-lg text-white text-xs">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="border  text-center">
                                            <button className="transition-colors dark:hover:text-white dark:text-gray-400 text-gray-600 hover:text-black p-2">
                                                <Pencil size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;
