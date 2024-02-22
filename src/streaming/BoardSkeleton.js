export function TaskSkeleton() {
    const selectWidth = () => {
        const array = ['96', 'full', '72'];
        const selected = array[Math.floor(Math.random() * array.length)];
        return selected;
    };

    return (
        <>
            <li
                className={`
            flex gap-3 items-center justify-between
            bg-gray-100 rounded-md
            dark:bg-gray-700
            w-full
            pr-3
            mt-0.5
            h-6
            pl-2
        `}
            >
                <div className="flex items-center justify-start gap-3 w-full">
                    <div className="h-4 w-4 p-2 rounded-md bg-gray-200 dark:bg-slate-800"></div>
                    <div className={`h-1 p-1 w-${selectWidth()} rounded-full bg-gray-200 dark:bg-slate-800`}></div>
                </div>
                <div className="flex items-center justify-end">
                    <div className="flex justify-end items-center">
                        <div className="h-2 w-2 p-2 ml-2 w- rounded-lg bg-gray-200 dark:bg-slate-800"></div>
                        <div className="h-2 w-2 p-2 ml-2 rounded-lg bg-gray-200 dark:bg-slate-800"></div>
                    </div>
                </div>
            </li>
        </>
    );
}

export function BoardSkeleton() {
    return (
        <>
            <ul className="flex flex-col items-start justify-center w-full gap-1">
                <TaskSkeleton />
                <TaskSkeleton />
                <TaskSkeleton />
            </ul>
        </>
    );
}
