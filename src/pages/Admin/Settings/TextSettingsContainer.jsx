import { useEffect, useState } from "react";
import { settingsAPI } from "../../../utils/api/pages/settingsPage";

const TextSetting = ({ title, val, setVal, originalVal, settingKey }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setVal(originalVal);
        setIsEditing(false);
    };

    const handleSubmit = () => {
        // API call will be implemented later
        const payload = {
            key: settingKey,
            value: JSON.stringify({ text: val }),
        };
        console.log(`Submitting ${title}:`, payload);
        setIsEditing(false);
    };

    return (
        <div className="">
            <label className="block text-sm md:text-base font-medium custom-primary-txt mb-2">
                {title}
            </label>
            {!isEditing ? (
                <div className="w-full px-3 py-2 text-sm border rounded-md dark:bg-base-100 dark:border-gray-600 min-h-[100px] custom-sec-txt">
                    {val || "No text set"}
                </div>
            ) : (
                <textarea
                    className="w-full custom-sec-txt px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-base-100 dark:border-gray-600 min-h-[100px]"
                    placeholder={`Enter ${title.toLowerCase()}...`}
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                />
            )}
            <div className="flex justify-end gap-2 mt-2">
                {!isEditing ? (
                    <button
                        onClick={handleEdit}
                        className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-6 text-sm rounded-md transition-colors"
                    >
                        Edit
                    </button>
                ) : (
                    <>
                        <button
                            onClick={handleCancel}
                            className="text-sm bg-gray-600 hover:bg-gray-700 text-white py-2 px-5 rounded-md transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-md transition-colors"
                        >
                            Submit
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

const TextSettingsContainer = () => {
    const [isFetching, setIsFetching] = useState(false);

    const [privacyText, setPrivacyText] = useState("");
    const [consentText, setConsentText] = useState("");
    const [originalPrivacyText, setOriginalPrivacyText] = useState("");
    const [originalConsentText, setOriginalConsentText] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true);
                const res = await settingsAPI.getSystemSettings();

                const consentSetting = res.data.find(
                    (s) => s.key === "consent_text"
                ).value;
                const privacySetting = res.data.find(
                    (s) => s.key === "privacy_text"
                ).value;

                if (consentSetting) {
                    const text = JSON.parse(consentSetting).text;
                    setConsentText(text);
                    setOriginalConsentText(text);
                }

                if (privacySetting) {
                    const text = JSON.parse(privacySetting).text;
                    setPrivacyText(text);
                    setOriginalPrivacyText(text);
                }
            } catch (error) {
            } finally {
                setIsFetching(false);
            }
        };

        fetchData();
    }, []);

    if (isFetching) {
        return (
            <div className="p-0 sm:p-1 md:p-3 dark:bg-base-100 bg-gray-100/70 flex-1">
                <div className="custom-container w-full sm:p-4 lg:p-5 dark:bg-base-300 bg-white">
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
                        <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="custom-container w-full sm:p-4 lg:p-5 dark:bg-base-300 bg-white">
            <h1 className="text-lg font-semibold custom-primary-txt mb-3">
                Privacy and Consent
            </h1>

            <TextSetting
                title="Consent Message"
                val={consentText}
                setVal={setConsentText}
                originalVal={originalConsentText}
                settingKey="consent_text"
            />

            <TextSetting
                title="Privacy Text"
                val={privacyText}
                setVal={setPrivacyText}
                originalVal={originalPrivacyText}
                settingKey="privacy_text"
            />
        </div>
    );
};

export default TextSettingsContainer;
