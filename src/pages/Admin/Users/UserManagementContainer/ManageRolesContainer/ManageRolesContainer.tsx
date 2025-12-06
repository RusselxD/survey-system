import RolesTable from "./RolesTable";
import AddNewRole from "./AddNewRole";

interface Role {
    id: number;
    name: string;
    description: string;
    userCount: number;
}

interface ManageRolesContainerProps {
    roles: Role[];
    updateRoleInList: (updatedRole: Role) => void;
    addRoleInList: (newRole: Role) => void;
    deleteRoleFromList: (roleId: number) => void;
}

const ManageRolesContainer = ({
    roles,
    updateRoleInList,
    addRoleInList,
    deleteRoleFromList,
}: ManageRolesContainerProps): React.JSX.Element => {
    return (
        <div>
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
