import React, { useState } from "react";
import TextInput from "../../../../../components/TextInput";
import Password from "./Password";
import { usersAPI } from "../../../../../utils/api/users";
import { useAuth } from "../../../../../context/AuthContext";

const Roles = ({ roles, role, setRole }) => {
    return (
        <div>
            <legend className="mb-0.5 fieldset-legend text-xs">Role</legend>
            <div className="text-xs flex flex-wrap gap-2">
                {roles.map((r) => {
                    return (
                        <button
                            onClick={() => {
                                if (r.name != role) {
                                    setRole(r.id);
                                }
                            }}
                            className={`transition-colors px-3 py-3 rounded-md ${
                                r.id === role
                                    ? "dark:bg-green-800 bg-green-300 dark:text-gray-100 text-gray-900 cursor-default"
                                    : "dark:bg-gray-700 bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-600 hover:bg-gray-200"
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

const AddUserContainer = ({ roles, addUserToList }) => {
    const { toastError, toastSuccess } = useAuth();

    const [role, setRole] = useState(roles[0]?.id || null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [requirePasswordChange, setRequirePasswordChange] = useState(true);

    const [errors, setErrors] = useState({});

    const [isCreating, setIsCreating] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        // Validate first name
        if (!firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        // Validate last name
        if (!lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }

        // Validate email
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Validate password
        if (!password.trim()) {
            newErrors.password = "Password is required";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        // Validate confirm password
        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        // Validate role
        if (!role) {
            newErrors.role = "Please select a role";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateUser = async () => {
        if (isCreating) return;

        // Validate form
        if (!validateForm()) {
            return;
        }

        // Clear any previous errors
        setErrors({});

        setIsCreating(true);

        try {
            await usersAPI.createUser({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                roleId: role,
                forceUpdatePassword: requirePasswordChange,
            });

            const newUser = await usersAPI.getUserByEmail(email);
            addUserToList(newUser.data);

            // Clear form
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setRequirePasswordChange(true);
            setRole(roles[0]?.id || null);

            toastSuccess("User created successfully");
        } catch (error) {
            toastError(error.response?.data || "Failed to create user");
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="pl-2 pb-2">
            <div className="grid md:grid-cols-2">
                <div className="flex flex-col space-y-2">
                    <div>
                        <TextInput
                            val={firstName}
                            setVal={setFirstName}
                            label="First Name"
                            withLabel={true}
                        />
                        {errors.firstName && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.firstName}
                            </p>
                        )}
                    </div>
                    <div>
                        <TextInput
                            val={lastName}
                            setVal={setLastName}
                            label="Last Name"
                            withLabel={true}
                        />
                        {errors.lastName && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.lastName}
                            </p>
                        )}
                    </div>
                    <div>
                        <TextInput
                            val={email}
                            setVal={setEmail}
                            label="Email"
                            withLabel={true}
                        />
                        {errors.email && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>
                    <div>
                        <Roles roles={roles} role={role} setRole={setRole} />
                        {errors.role && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.role}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex flex-col justify-between">
                    <Password
                        password={password}
                        setPassword={setPassword}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                        requirePasswordChange={requirePasswordChange}
                        setRequirePasswordChange={setRequirePasswordChange}
                        errors={errors}
                    />
                    <div className="mt-2 flex justify-end gap-2 text-xs">
                        <button className="px-3 py-2 dark:border-gray-300 border-gray-500 transition-colors rounded-md border dark:hover:text-gray-800 hover:text-white dark:hover:bg-gray-300 hover:bg-gray-500 w-fit dark:text-white text-gray-600">
                            Cancel
                        </button>
                        <button
                            onClick={() => handleCreateUser()}
                            disabled={isCreating}
                            className={`px-3 transition-colors py-2 rounded-md w-fit text-white ${
                                isCreating
                                    ? "bg-green-400 cursor-not-allowed"
                                    : "bg-green-500 hover:bg-green-600"
                            }`}
                        >
                            {isCreating && (
                                <span className="loading loading-spinner loading-xs mr-2"></span>
                            )}
                            <span>Create User</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUserContainer;
