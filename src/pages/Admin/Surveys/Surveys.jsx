import { Plus, ChevronDown, FileText } from "lucide-react";
import CardsContainer from "./CardsContainer";
import { useAuth } from "../../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { surveyAPI } from "../../../utils/api/models/survey";
import SurveysSkeleton from "./SurveysSkeleton";
import FailedToLoad from "../../../components/reusable/FailedToLoad";

const EmptyState = ({ statusFilter }) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 custom-sec-txt">
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                    <FileText className="w-10 h-10 opacity-50" />
                </div>
                <p className="text-lg font-semibold mb-2 custom-primary-txt">
                    No {statusFilter === "All" ? "" : statusFilter} Surveys
                    Found
                </p>
                <p className="text-sm max-w-md mx-auto">
                    {statusFilter === "All"
                        ? "There are no surveys yet. Create your first survey to get started."
                        : `There are no ${statusFilter.toLowerCase()} surveys at the moment.`}
                </p>
            </div>
        </div>
    );
};

const DropDown = ({ choices, selectedChoice, setSelectedChoice }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="custom-primary-txt text-sm z-20">
            <div
                className="relative dark:bg-base-100 bg-gray-100 border dark:border-gray-600 border-gray-300 w-fit px-4 py-2.5 rounded-md cursor-pointer hover:dark:bg-gray-800 hover:bg-gray-200 transition-colors shadow-sm"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="flex items-center gap-3">
                    <span className="font-medium min-w-[80px]">
                        {selectedChoice}
                    </span>
                    <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                        }`}
                    />
                </span>
                <div
                    className={`left-0 z-20 w-full top-full mt-2 absolute overflow-hidden transition-[max-height] duration-300 ease-in-out dark:bg-base-100 bg-white rounded-md shadow-lg ${
                        isOpen ? "max-h-96" : "max-h-0"
                    }`}
                >
                    {choices.map((choice, index) => {
                        const isSelected = choice === selectedChoice;
                        return (
                            <p
                                onClick={() => {
                                    setSelectedChoice(choice);
                                    setIsOpen(false);
                                }}
                                key={index}
                                className={`px-4 py-2.5 hover:dark:bg-gray-800 hover:bg-gray-100 cursor-pointer whitespace-nowrap transition-colors ${
                                    isSelected
                                        ? "dark:bg-gray-800 bg-gray-100 font-semibold"
                                        : ""
                                } ${index === 0 ? "rounded-t-lg" : ""} ${
                                    index === choices.length - 1
                                        ? "rounded-b-lg"
                                        : ""
                                }`}
                            >
                                {choice}
                            </p>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const Head = ({ statusFilter, setStatusFilter }) => {
    const { hasPermission } = useAuth();

    return (
        <div className="dark:text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b dark:border-white border-black pb-3 mb-5">
            <div className="">
                <DropDown
                    choices={["All", "Draft", "Published", "Archived"]}
                    selectedChoice={statusFilter}
                    setSelectedChoice={setStatusFilter}
                />
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
    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                setSurveysLoading(true);
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

    // Filter surveys based on status
    const filteredSurveys =
        statusFilter === "All"
            ? surveys
            : surveys.filter(
                  (s) => s.status.toLowerCase() === statusFilter.toLowerCase()
              );

    return (
        <div className="p-0 sm:p-1 md:p-3 dark:bg-base-100 bg-gray-100/70 flex-1 flex">
            <div className="custom-container flex-1 p-3 sm:p-4 lg:p-5 dark:bg-base-300 bg-white">
                <Head
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                />
                {filteredSurveys.length === 0 ? (
                    <EmptyState statusFilter={statusFilter} />
                ) : (
                    <CardsContainer surveys={filteredSurveys} />
                )}
            </div>
        </div>
    );
};

export default Surveys;
