import React from "react";

export const TextInput = ({ val, setVal, label, withLabel = true }) => {
    return (
        <fieldset className="fieldset w-full">
            {withLabel && (
                <legend className="fieldset-legend mb-0.5">{label}</legend>
            )}
            <input
                type="text"
                className="input dark:bg-gray-800 bg-gray-200 dark:text-gray-100 text-gray-800 px-3 custom-sec-txt"
                placeholder={label}
                value={val}
                onChange={(e) => setVal(e.target.value)}
            />
        </fieldset>
    );
};

export default TextInput;
