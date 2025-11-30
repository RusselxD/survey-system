import { Archive, Info } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const SurveyArchived = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { title, coverImageUrl } = location.state || {};

    if (!title) {
        navigate("/not-found");
    }

    console.log(title);
    console.log(coverImageUrl);

    return (
        <div className="min-h-screen dark:bg-base-100 bg-gray-100/70 p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Survey Card */}
                <div className="dark:bg-base-300 bg-white rounded-xl shadow-xl overflow-hidden">
                    {/* Image Section (conditional) */}
                    {coverImageUrl && (
                        <div className="relative h-64 sm:h-80 overflow-hidden">
                            <img
                                src={coverImageUrl}
                                alt="Survey cover"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                    )}

                    {/* Content Section */}
                    <div className="p-6 sm:px-10 sm:py-8">
                        <h1 className="text-3xl font-bold custom-primary-txt mb-4">
                            {title}
                        </h1>

                        <div className="p-6 sm:px-10 sm:py-8 text-center">
                            {/* Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="dark:bg-gray-700 bg-gray-100 rounded-full p-6">
                                    <Archive className="w-10 h-10 custom-sec-txt" />
                                </div>
                            </div>

                            {/* Title */}
                            <h2 className="text-2xl font-bold custom-primary-txt mb-3">
                                Survey Archived
                            </h2>

                            {/* Description */}
                            <p className="custom-sec-txt mb-6 max-w-md mx-auto leading-relaxed">
                                This survey has been archived and is no longer
                                accepting responses.
                            </p>

                            {/* Info Box */}
                            <div className="dark:bg-gray-700 bg-gray-100 rounded-lg p-5 w-full">
                                <div className="flex items-start gap-3 text-left">
                                    <Info className="w-5 h-5 custom-sec-txt mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-semibold custom-primary-txt mb-2">
                                            What does this mean?
                                        </p>
                                        <p className="text-sm custom-sec-txt leading-relaxed">
                                            The survey creator has closed this
                                            survey. If you believe this is an
                                            error or need to submit a response,
                                            please contact the survey
                                            administrator.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SurveyArchived;
