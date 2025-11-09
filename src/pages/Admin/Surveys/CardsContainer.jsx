import Card from "./Card/SurveyCard";

const CardsContainer = ({ surveys }) => {
    return (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 w-full ">
            {surveys.map((survey, i) => {
                return (
                    <div
                        key={i}
                        className="break-inside-avoid mb-3 md:mb-4 lg:mb-4"
                    >
                        <Card survey={survey} />
                    </div>
                );
            })}
        </div>
    );
};

export default CardsContainer;
