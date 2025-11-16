
const GroupedPermissions = ({
    permissions,
    title,
    chosenPermissions,
    setChosenPermissions,
}) => {
    return (
        <div className="border dark:bg-gray-800 bg-gray-100 dark:border-gray-600 border-gray-300 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-base mb-3 border-b dark:border-gray-600 border-gray-300 pb-2">
                {title}
            </h3>
            {permissions.map((permission) => {
                var isChecked = chosenPermissions.has(permission.id);

                return (
                    <label
                        key={permission.id}
                        className="flex items-center cursor-pointer space-x-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                                if (isChecked) {
                                    setChosenPermissions((prev) => {
                                        const newSet = new Set(prev);
                                        newSet.delete(permission.id);
                                        return newSet;
                                    });
                                } else {
                                    setChosenPermissions((prev) => {
                                        const newSet = new Set(prev);
                                        newSet.add(permission.id);
                                        return newSet;
                                    });
                                }
                            }}
                            className="w-4 h-4 rounded border-2 border-gray-400 dark:border-gray-500 checked:bg-blue-600 checked:border-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                        />
                        <span className=" text-sm flex-1">
                            {permission.description}
                        </span>
                    </label>
                );
            })}
        </div>
    );
};

export default GroupedPermissions;
