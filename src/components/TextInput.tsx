interface TextInputProps {
    val: string;
    setVal: (value: string) => void;
    label: string;
    withLabel?: boolean;
    type?: string;
    disabled?: boolean;
}

export const TextInput = ({
    val,
    setVal,
    label,
    withLabel = true,
    type = "text",
    disabled = false,
}: TextInputProps): React.JSX.Element => {
    return (
        <fieldset className="fieldset w-full">
            {withLabel && (
                <legend className="fieldset-legend mb-0.5">{label}</legend>
            )}
            <input
                type={type}
                className="input dark:bg-gray-800 bg-gray-200 dark:text-gray-100 text-gray-800 px-3 custom-sec-txt"
                placeholder={label}
                value={val}
                onChange={(e) => setVal(e.target.value)}
                disabled={disabled}
            />
        </fieldset>
    );
};

export default TextInput;
