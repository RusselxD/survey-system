import { X } from "lucide-react";

const PreviewSurveyModal = ({ surveyUUID, onClose }) => {
    return (
        <div className="modal modal-open" onClick={onClose}>
            <div
                className="modal-box max-w-2xl bg-white"
                onClick={(e) => e.stopPropagation()}
            >                
                {/* Close button (X) at top right */}
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 sm:right-4 sm:top-4 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                >
                    <X size={20} className="sm:w-6 sm:h-6" />
                </button>

                {/* Header */}
                <h3 className="font-bold text-xl mb-4">Preview Questions</h3>

                {/* Content */}
                <div className="space-y-4">
                    <p className="text-gray-600">Survey UUID: {surveyUUID}</p>

                    {/* Add your survey details here */}
                    <div>
                        <p className="font-semibold">Survey Information</p>
                        <p className="text-sm text-gray-500">
                            Details for survey {surveyUUID} will be displayed
                            here
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewSurveyModal;
