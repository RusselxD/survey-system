const UsersPageSkeleton = () => {
    return (
        <div className="p-0 sm:p-1 md:p-3 lg:p-8 dark:bg-base-100 bg-gray-100/70 flex-1 flex flex-col items-center">
            <div className=" skeleton w-full h-28 mb-5"></div>
            <div className=" skeleton w-full h-12 mb-5"></div>
            <div className=" skeleton w-full h-12 mb-5"></div>
            <div className=" skeleton w-full h-12 mb-5"></div>
            <div className=" skeleton w-full h-12 mb-5"></div>
            <div className=" skeleton w-full h-12 mb-5"></div>
        </div>
    );
};

export default UsersPageSkeleton;
