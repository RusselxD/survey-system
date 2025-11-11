const UsersPageSkeleton = () => {
    return (
        <div className="p-0 sm:p-1 md:p-3 lg:p-8 dark:bg-base-100 bg-gray-100/70 flex-1 flex flex-col items-center">
            {/* <div className="container p-3 sm:p-4 lg:p-5 dark:bg-base-300 bg-white flex-1"> */}
            <div className=" skeleton w-[95%] h-10 mb-5"></div>
            <div className=" skeleton w-[95%] h-10 mb-5"></div>
            <div className=" skeleton w-[95%] h-10 mb-5"></div>
            <div className=" skeleton w-[95%] h-10 mb-5"></div>
            <div className=" skeleton w-[95%] h-10 mb-5"></div>
            {/* </div> */}
        </div>
    );
};

export default UsersPageSkeleton;
