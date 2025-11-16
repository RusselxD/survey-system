const Roles = ({ roles, role, setRole }) => {
    return (
        <div className="mt-2">
            <legend className="mb-0.5  fieldset-legend text-xs">Role</legend>
            <div className="text-xs flex gap-2">
                {roles.map((r) => {
                    return (
                        <button
                            onClick={() => {
                                if (r.name != role) {
                                    setRole(r.id);
                                }
                            }}
                            className={`transition-colors px-3 py-3 rounded-md ${
                                r.name === role
                                    ? "dark:bg-gray-900 bg-gray-300 dark:text-gray-100 text-gray-900 cursor-default"
                                    : "dark:bg-gray-800 bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-600 hover:bg-gray-200"
                            }`}
                            key={r.id}
                        >
                            {r.name}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Roles;
