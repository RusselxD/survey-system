import { useState } from "react";
import TextInput from "../../../../../components/TextInput";

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    role?: string;
}

interface PasswordProps {
    password: string;
    setPassword: (password: string) => void;
    confirmPassword: string;
    setConfirmPassword: (password: string) => void;
    requirePasswordChange: boolean;
    setRequirePasswordChange: (require: boolean) => void;
    errors?: FormErrors;
}

type PasswordMode = "custom" | "random";

const Password = ({
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    requirePasswordChange,
    setRequirePasswordChange,
    errors,
}: PasswordProps): React.JSX.Element => {
    const [passwordMode, setPasswordMode] = useState<PasswordMode>("custom");

    const generateRandomPassword = () => {
        const length = 10;
        const charset =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        let generatedPassword = "";
        for (let i = 0; i < length; i++) {
            generatedPassword += charset.charAt(
                Math.floor(Math.random() * charset.length)
            );
        }
        setPassword(generatedPassword);
        setConfirmPassword(generatedPassword);
    };

    const handlePasswordModeChange = (mode: PasswordMode) => {
        setPasswordMode(mode);
        if (mode === "random") {
            generateRandomPassword();
        } else {
            setPassword("");
            setConfirmPassword("");
        }
    };

    return (
        <div className="md:mt-2 lg:mt-0">
            <legend className="mb-0.5 fieldset-legend text-xs">
                Password Setup
            </legend>

            <div className="flex gap-2 mt-2 mb-3">
                <button
                    onClick={() => handlePasswordModeChange("random")}
                    className={`text-xs transition-colors px-3 py-2 rounded-md ${
                        passwordMode === "random"
                            ? "dark:bg-blue-800 bg-blue-300 dark:text-gray-100 text-gray-900 cursor-default"
                            : "dark:bg-gray-700 bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-600 hover:bg-gray-200"
                    }`}
                >
                    Generate random password
                </button>
                <button
                    onClick={() => handlePasswordModeChange("custom")}
                    className={`text-xs transition-colors px-3 py-2 rounded-md ${
                        passwordMode === "custom"
                            ? "dark:bg-blue-800 bg-blue-300 dark:text-gray-100 text-gray-900 cursor-default"
                            : "dark:bg-gray-700 bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-600 hover:bg-gray-200"
                    }`}
                >
                    Set custom password
                </button>
            </div>

            {/* Password inputs - always show */}
            <div className="flex flex-col space-y-2">
                <div>
                    <TextInput
                        val={password}
                        setVal={setPassword}
                        label="Password"
                        withLabel={true}
                        type="password"
                        disabled={passwordMode === "random"}
                    />
                    {errors?.password && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.password}
                        </p>
                    )}
                </div>
                <div>
                    <TextInput
                        val={confirmPassword}
                        setVal={setConfirmPassword}
                        label="Confirm Password"
                        withLabel={true}
                        type="password"
                        disabled={passwordMode === "random"}
                    />
                    {errors?.confirmPassword && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>
            </div>

            {/* Require password change checkbox */}
            <div className="mt-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={requirePasswordChange}
                        onChange={(e) =>
                            setRequirePasswordChange(e.target.checked)
                        }
                        className="w-4 h-4 rounded border-2 border-gray-400 dark:border-gray-500 checked:bg-blue-600 checked:border-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="text-xs dark:text-gray-200 text-gray-700">
                        Require password change on first log in
                    </span>
                </label>
            </div>
        </div>
    );
};

export default Password;
