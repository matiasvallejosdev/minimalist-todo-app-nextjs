
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function ListSkeleton() {
  return (
    <li
    className={`
    ${shimmer}
    relative overflow-hidden
    h-14
    w-full
    lg:h-full
    flex cursor-pointer
    rounded-md p-2
    dark:bg-gray-700
    justify-between bg-gray-200
    color-red-500 font-bold-400
    `}
  >
      <div className="flex items-center justify-start gap-2 flex-col lg:flex-row text-xs lg:text-sm w-full">
        <div className="h-5 w-5 px-2 rounded-full bg-gray-300 dark:bg-slate-800">
        </div>
        <div className="h-1 p-1 w-full rounded-full bg-gray-300 dark:bg-slate-800">
        </div>
      </div>
  </li>
  )
}

export function ListsSkeleton(){
  return <>
    <ListSkeleton />
    <ListSkeleton />
    <ListSkeleton />
  </>
}
