import { Link, useParams } from "react-router-dom";
import SurveyMainDetails from "./SurveyMainDetails/SurveyMainDetails";
import { ArrowLeft } from "lucide-react";

const SurveyPage = () => {
    const { id } = useParams();

    return (
        <div className="p-0 sm:p-1 md:p-3 dark:bg-base-100 bg-gray-100/70 flex-1">
            <Link to="/admin/surveys" className="flex items-center gap-2 mb-2 w-fit pr-3 py-2 rounded-md  custom-sec-txt hover:custom-primary-txt transition-colors">
                <ArrowLeft/>
                <span >Back to Surveys</span>
            </Link>
            <SurveyMainDetails id={id} />
        </div>
    );
};

export default SurveyPage;
