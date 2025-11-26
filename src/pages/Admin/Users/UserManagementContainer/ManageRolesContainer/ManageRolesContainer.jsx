import RolesTable from "./RolesTable";
import AddNewRole from "./AddNewRole";

// export const TextInput = ({ val, setVal, label, withLabel = false }) => {
//     return (
//         <fieldset className="fieldset w-full">
//             {withLabel && (
//                 <legend className="fieldset-legend mb-0.5">{label}</legend>
//             )}
//             <input
//                 type="text"
//                 className="input dark:bg-gray-800 bg-gray-300 dark:text-gray-100 text-gray-800 px-3 custom-sec-txt"
//                 placeholder={label}
//                 value={val}
//                 onChange={(e) => setVal(e.target.value)}
//             />
//         </fieldset>
//     );
// };

const ManageRolesContainer = ({
    roles,
    updateRoleInList,
    addRoleInList,
    deleteRoleFromList,
}) => {
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
