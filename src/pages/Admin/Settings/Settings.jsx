import LocationAndServiceTypeSettings from "./LocationAndServiceTypeSettings";
import TextSettingsContainer from "./TextSettingsContainer";

const Settings = () => {
    return (
        <div className="p-0 sm:p-1 md:p-3 dark:bg-base-100 bg-gray-100/70 flex-1 space-y-3">
            <TextSettingsContainer />
            <LocationAndServiceTypeSettings/>
        </div>
    );
};

export default Settings;
