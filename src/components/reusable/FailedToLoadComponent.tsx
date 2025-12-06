import { AlertCircle } from "lucide-react";

interface FailedToLoadComponentProps {
    dataName?: string;
    handleReloadComponent?: () => void;
    heightAndWidth?: string;
}

const FailedToLoadComponent = ({
    dataName = "data",
    handleReloadComponent,
    heightAndWidth,
}: FailedToLoadComponentProps) => {
    return (
        <div
            className={`custom-container ${heightAndWidth} flex flex-col items-center justify-center bg-red-100 dark:bg-red-400/30 border-2 border-red-500 text-red-700 dark:text-white rounded-lg shadow`}
        >
            <AlertCircle className="h-12 w-12 mb-3 text-red-500 dark:text-white" />
            <h2 className="text-lg font-semibold mb-1">
                Failed to load {dataName}
            </h2>
            <p className="text-sm mb-2">
                Please check your connection or try again later.
            </p>
            <div className="flex gap-3 mt-2 text-sm">
                <button
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                    onClick={() => window.location.reload()}
                >
                    Reload Page
                </button>
                <button
                    className="px-4 py-2 border-2 border-blue-600 text-blue-600 dark:text-blue-200 dark:border-blue-400 hover:bg-blue-100 dark:hover:bg-blue-300/20 rounded transition-colors"
                    onClick={handleReloadComponent}
                >
                    Try Again
                </button>
            </div>
        </div>
    );
};

export default FailedToLoadComponent;
