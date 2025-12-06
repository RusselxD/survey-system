const DashboardSkeleton = (): React.JSX.Element => {
    return (
        <div className="p-8 dark:bg-base-100 flex-1 flex flex-col bg-gray-100">
            <div className="grid grid-cols-3 gap-5 mb-5">
                <div className="skeleton w-full h-28 rounded-md"></div>
                <div className="skeleton w-full h-28 rounded-md"></div>
                <div className="skeleton w-full h-28 rounded-md"></div>
            </div>
            <div className="grid grid-cols-2 gap-5 mb-5">
                <div className="skeleton w-full h-32 rounded-md"></div>
                <div className="skeleton w-full h-32 rounded-md"></div>
                <div className="skeleton w-full h-32 rounded-md"></div>
                <div className="skeleton w-full h-32 rounded-md"></div>
            </div>
            <div className="skeleton w-full flex-1 rounded-md"></div>
        </div>
    );
};

export default DashboardSkeleton;
