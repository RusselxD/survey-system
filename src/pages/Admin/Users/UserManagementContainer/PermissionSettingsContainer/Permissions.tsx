import React from "react";
import GroupedPermissions from "./GroupedPermissions";

interface Permission {
    id: number;
    name: string;
    description: string;
    roleIds: number[];
}

interface PermissionsProps {
    chosenPermissions: Set<number>;
    setChosenPermissions: React.Dispatch<React.SetStateAction<Set<number>>>;
    permissions: Permission[];
}

const Permissions = ({
    chosenPermissions,
    setChosenPermissions,
    permissions,
}: PermissionsProps): React.JSX.Element => {
    const groups = [
        {
            title: "Responses & Analytics",
            permissionsIncluded: permissions.filter(
                (p) =>
                    p.name.includes("responses") || p.name.includes("analytics")
            ),
        },
        {
            title: "User and Role Management",
            permissionsIncluded: permissions.filter(
                (p) => p.name.includes("user") || p.name.includes("role")
            ),
        },
        {
            title: "Survey Management",
            permissionsIncluded: permissions.filter((p) =>
                p.name.includes("survey")
            ),
        },
        {
            title: "System Management",
            permissionsIncluded: permissions.filter((p) =>
                p.name.includes("system")
            ),
        },
    ];

    return (
        <div className="custom-primary-txt mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map((group) => {
                return (
                    <GroupedPermissions
                        key={group.title}
                        chosenPermissions={chosenPermissions}
                        setChosenPermissions={setChosenPermissions}
                        title={group.title}
                        permissions={group.permissionsIncluded}
                    />
                );
            })}
        </div>
    );
};

export default Permissions;
