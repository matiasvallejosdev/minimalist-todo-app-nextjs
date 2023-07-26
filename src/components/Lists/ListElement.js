'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation';

const getLastPath = (fullUrl) => {
    if(!fullUrl) return 'inbox';
    const pathArray = fullUrl.split('/');
    return pathArray[pathArray.length - 1];
}

export default function ListElement({id,name,list_uuid, icon, deleteButton = false}) {
    const pathname = usePathname();
    const isSelected = getLastPath(pathname) === list_uuid;

    return <>
        <li key={id} className={`
        flex cursor-pointer
        rounded-md p-2 text-sm text-gray-700
        dark:text-white dark:hover:bg-gray-700
        dark:focus:ring-gray-700 justify-between hover:text-gray-900 hover:bg-gray-200 dark:hover:text-gray-300
        color-red-500 font-bold-400
        ${isSelected ? 'bg-white dark:bg-slate-900 text-primary-700 dark:text-primary-700' : ''}
        `}>
            <Link href={`/lists/${list_uuid}`} className="w-full">
                <div className="flex items-center justify-start gap-2">
                    {icon && icon}
                    {name}
                </div>
            </Link>
        </li>
    </>
}