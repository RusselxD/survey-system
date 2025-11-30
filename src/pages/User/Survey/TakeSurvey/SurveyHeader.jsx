import React from "react";

const SurveyHeader = ({ survey }) => {

    console.log(survey)

    return (
        <div className="md:w-[80%] lg:w-[60%] xl:w-[50%] ">
            {/* Survey Card */}
            <div className="dark:bg-base-300 bg-white rounded-xl overflow-hidden">
                {/* Image Section (conditional) */}
                {survey.coverImageUrl && (
                    <div className="relative h-32 md:h-40 overflow-hidden">
                        <img
                            src={survey.coverImageUrl}
                            alt="Survey cover"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                )}

                {/* Content Section */}
                <div className="p-2 sm:p-3 md:p-5">
                    <h1 className="text-xl md:text-2xl lg:text-3xl break-words font-bold custom-primary-txt mb-2">
                        {survey.title}
                    </h1>

                    {survey.description && (
                        <p className="custom-sec-txt text-xs md:text-sm mb-3 leading-6 md:leading-8">
                            {survey.description}
                        </p>
                    )}

                    {/* <div className="flex items-center text-xs md:text-sm gap-2 mb-3 md:mb-4 custom-sec-txt">
                            <ListChecks className="w-5 h-5 md:w-6 md:h-6" />
                            <span>{survey.questionCount} Questions</span>
                        </div> */}
                </div>
            </div>
        </div>
    );
};

export default SurveyHeader;
