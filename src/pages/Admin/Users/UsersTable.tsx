import { Pencil } from "lucide-react";

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

interface UsersTableProps {
    users: User[];
    roles: Role[];
    setModifyUserModalisOpen: (isOpen: boolean) => void;
    setSelectedUserToModify: (user: User) => void;
    hasPermission: (permission: string) => boolean;
}

const UsersTable = ({
    users,
    roles,
    setModifyUserModalisOpen,
    setSelectedUserToModify,
    hasPermission,
}: UsersTableProps): React.JSX.Element => {
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                {/* head */}
                <thead className="">
                    <tr className="font-normal">
                        <th></th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        {hasPermission("users.manage") && <th></th>}
                    </tr>
                </thead>
                <tbody className="custom-primary-txt">
                    {users.map((user, i) => {
                        const role =
                            roles.find((role) => role.id === user.roleId)
                                ?.name || "Unknown";

                        return (
                            <tr key={user.id || i}>
                                <th className=" text-center ">{i + 1}</th>
                                <td className="  break-all">
                                    {user.firstName} {user.lastName}
                                </td>
                                <td className=" text-sm  break-words">
                                    {user.email}
                                </td>
                                <td className="w-40">{role}</td>
                                {hasPermission("users.manage") && (
                                    <td className="text-center">
                                        {role == "Super Admin" ? null : (
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
                                        )}
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
