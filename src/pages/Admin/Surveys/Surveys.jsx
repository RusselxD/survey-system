import { Plus } from "lucide-react";
import CardsContainer from "./CardsContainer";
import { useAuth } from "../../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { surveyAPI } from "../../../utils/api/models/survey";
import SurveysSkeleton from "./SurveysSkeleton";
import FailedToLoad from "../../../components/reusable/FailedToLoad";

const DropDown = ({ title, choices }) => {
    return (
        <div className="dropdown dropdown-bottom p-0">
            <div
                tabIndex={0}
                role="button"
                className="btn font-medium m-1 dark:bg-gray-800 bg-gray-200"
            >
                Choose {title}
            </div>
            <ul
                tabIndex="-1"
                className="dropdown-content menu p-0 bg-base-100 rounded-sm z-1 w-fit shadow-sm"
            >
                {choices.map((choice, index) => (
                    <li className="px-2 py-2 w-full h-full" key={index}>
                        <a>{choice}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Head = () => {
    const { hasPermission } = useAuth();

    return (
        <div className="dark:text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b dark:border-white border-black pb-3 mb-5">
            <div className="">
                <DropDown title="Status" choices={["Published", "Draft"]} />
            </div>
            {hasPermission("survey.create") && (
                <NavLink
                    to={"/admin/surveys/new"}
                    className="custom-primary-btn p-3 gap-1 text-sm    "
                >
                    <Plus size={18} />
                    <span>New Survey</span>
                </NavLink>
            )}
        </div>
    );
};

const Surveys = () => {
    const { toastError } = useAuth();

    const [surveys, setSurveys] = useState([]);
    const [surveysLoading, setSurveysLoading] = useState(false);
    const [errorLoadingSurveys, setErrorLoadingSurveys] = useState(false);

    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                setSurveysLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                const res = await surveyAPI.getSurveys();
                setSurveys(res.data);
                setErrorLoadingSurveys(false);
            } catch (error) {
                setErrorLoadingSurveys(true);
                toastError(error.message || "Failed to load surveys.");
            } finally {
                setSurveysLoading(false);
            }
        };
        fetchSurveys();
    }, []);

    if (surveysLoading) {
        return <SurveysSkeleton />;
    }

    if (errorLoadingSurveys) {
        return <FailedToLoad />;
    }

    return (
        <div className="p-0 sm:p-1 md:p-3 dark:bg-base-100 bg-gray-100/70 flex-1">
            <div className="custom-container p-3 sm:p-4 lg:p-5 dark:bg-base-300 bg-white">
                <Head />
                <CardsContainer surveys={surveys} />
                <p className="mt-6 text-sm sm:text-base text-center sm:text-left">
                    View Archived Surveys -
                </p>
            </div>
        </div>
    );
};

export default Surveys;
