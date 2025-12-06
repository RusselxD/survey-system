import { Archive, Info } from "lucide-react";

const SurveyArchivedMessage = () => {
    return (
        <div className="sm:px-5 lg:mb-3 text-center">
            {/* Icon */}
            <div className="flex justify-center mb-3">
                <div className="dark:bg-gray-700 bg-gray-100 rounded-full p-4">
                    <Archive className="w-5 h-5 sm:w-7 sm:h-7 custom-sec-txt" />
                </div>
            </div>

            {/* Title */}
            <h2 className="text-lg md:text-xl font-bold custom-primary-txt mb-2">
                Survey Archived
            </h2>

            {/* Description */}
            <p className="italic text-xs md:text-sm custom-sec-txt mb-3 leading-relaxed">
                This survey has been archived and is no longer accepting
                responses.
            </p>

            {/* Info Box */}
            <div className="dark:bg-gray-700 bg-gray-100 rounded-lg p-3 lg:p-4 w-full">
                <div className="flex items-start gap-3 text-left">
                    <Info className="w-5 h-5 custom-sec-txt mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-sm lg:text-base font-medium custom-primary-txt mb-1">
                            What does this mean?
                        </p>
                        <p className="text-xs lg:text-sm custom-sec-txt leading-relaxed lg:leading-loose">
                            The survey creator has closed this survey. If you
                            believe this is an error or need to submit a
                            response, please contact the survey administrator.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SurveyArchivedMessage;
