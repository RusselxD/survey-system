import TextInput from "../../../../components/TextInput";
import { Globe, Save, Upload, X } from "lucide-react";

const Header = ({ handleSaveDraft, handlePublishSurvey, isSubmitting, isEdit }) => {
    return (
        <div className="flex items-start justify-between ">
            <h1 className="custom-primary-txt font-semibold">
                {isEdit ? "Edit Survey" : "Create New Survey"}
            </h1>
            <div className="flex items-center gap-3 text-xs">
                <button
                    onClick={handleSaveDraft}
                    disabled={isSubmitting !== null}
                    className="flex gap-2 transition-colors items-center justify-center px-3 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting === "draft" ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                        <Save size={22} />
                    )}
                    <span>Save Draft</span>
                </button>
                <button
                    onClick={handlePublishSurvey}
                    disabled={isSubmitting !== null}
                    className="flex gap-2 transition-colors items-center justify-center px-3 py-2 rounded-md bg-green-700 text-white hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting === "published" ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                        <Globe size={20} />
                    )}
                    <span>Publish</span>
                </button>
            </div>
        </div>
    );
};

const DropDown = ({ label, options, value, setValue }) => {
    return (
        <fieldset className="fieldset">
            <legend className="fieldset-legend mb-0.5">{label}</legend>
            <select
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full px-2 py-3  rounded-md dark:bg-gray-800 bg-gray-200 dark:text-gray-100 text-gray-800custom-sec-txt"
            >
                <option value={0}>Select {label}</option>
                {options.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                        {opt.name}
                    </option>
                ))}
            </select>
        </fieldset>
    );
};

const SurveyDetails = ({
    isEdit,
    title,
    description,
    setTitle,
    setDescription,
    serviceType,
    setServiceType,
    location,
    setLocation,
    locations,
    serviceTypes,
    coverImage,
    setCoverImage,
    askName,
    setAskName,
    askEmail,
    setAskEmail,
    handleSaveDraft,
    handlePublishSurvey,
    isSubmitting,
}) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImage(file);
        }
    };

    const handleRemoveImage = () => {
        setCoverImage(null);
    };

    return (
        <div className="custom-container flex-1 w-full p-3 sm:p-4 lg:p-5 dark:bg-base-300 bg-white">
            <Header
                handleSaveDraft={handleSaveDraft}
                handlePublishSurvey={handlePublishSurvey}
                isSubmitting={isSubmitting}
                isEdit={isEdit}
            />
            <TextInput val={title} setVal={setTitle} label={"Survey Title"} />
            <fieldset className="fieldset my-3">
                <legend className="fieldset-legend mb-0.5">
                    Survey Description
                </legend>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Survey Description"
                    className="p-2 rounded-md dark:bg-gray-800 bg-gray-200 dark:text-gray-100 text-gray-800 px-3 custom-sec-txt"
                    rows={4}
                />
            </fieldset>
            <div className="flex gap-6 mt-4 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={askName}
                        onChange={(e) => setAskName(e.target.checked)}
                        className="w-4 h-4 cursor-pointer"
                    />
                    <span className="custom-primary-txt">Ask for Name</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={askEmail}
                        onChange={(e) => setAskEmail(e.target.checked)}
                        className="w-4 h-4 cursor-pointer"
                    />
                    <span className="custom-primary-txt">Ask for Email</span>
                </label>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <DropDown
                    label="Service Type"
                    options={serviceTypes}
                    value={serviceType}
                    setValue={setServiceType}
                />
                <DropDown
                    label="Location"
                    options={locations}
                    value={location}
                    setValue={setLocation}
                />
            </div>

            <fieldset className="fieldset mt-4">
                <legend className="fieldset-legend mb-0.5">Cover Image</legend>
                {coverImage ? (
                    <div className="flex items-start gap-3">
                        <div className="relative group">
                            <img
                                src={
                                    typeof coverImage === "string"
                                        ? coverImage
                                        : URL.createObjectURL(coverImage)
                                }
                                alt="Cover preview"
                                className="w-32 h-32 object-cover rounded-md border-2 border-gray-300 dark:border-gray-600"
                            />
                            <button
                                onClick={handleRemoveImage}
                                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors shadow-md"
                                type="button"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="custom-primary-txt text-sm font-medium">
                                {typeof coverImage === "string"
                                    ? "Existing cover image"
                                    : coverImage.name}
                            </p>
                            {typeof coverImage !== "string" && (
                                <p className="custom-sec-txt text-xs">
                                    {(coverImage.size / 1024).toFixed(2)} KB
                                </p>
                            )}
                            <label className="border flex items-center gap-2 w-fit text-xs px-3 py-2 rounded-md transition-colors cursor-pointer border-gray-300 dark:border-slate-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-700 mt-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                <Upload size={16} />
                                <span>Change image</span>
                            </label>
                        </div>
                    </div>
                ) : (
                    <label className="border flex items-center gap-3 text-white p-3 rounded-md transition-colors cursor-pointer border-gray-300 dark:border-slate-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-700 w-fit">
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <Upload size={20} />
                        <span>Upload image</span>
                    </label>
                )}
            </fieldset>
        </div>
    );
};

export default SurveyDetails;
