interface SurveyHeaderProps {
    survey: {
        coverImageUrl: string;
        title: string;
        description: string;
    };
}

const SurveyHeader = ({ survey }: SurveyHeaderProps): React.JSX.Element => {
    return (
        <div className="md:w-[80%] lg:w-[60%] xl:w-[50%]">
            {/* Survey Card */}
            <div className="dark:bg-base-300 bg-white rounded-xl overflow-hidden border dark:border-slate-700 border-gray-300">
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
                </div>
            </div>
        </div>
    );
};

export default SurveyHeader;
