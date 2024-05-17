'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { limitCharacters } from '@/src/utils/Utils';
import useLargeScreen from '@/src/hooks/useLargeScreen';

const getLastPath = (fullUrl) => {
  if (!fullUrl) return 'inbox';
  const pathArray = fullUrl.split('/');
  return pathArray[pathArray.length - 1];
};

export default function ListElement({ id, name, list_uuid, icon }) {
  const pathname = usePathname();
  const { isLargeScreen } = useLargeScreen();

  const isSelected = getLastPath(pathname) === list_uuid;

  return (
    <>
      <li
        key={id}
        className={`
        h-14
        w-full
        lg:h-full
        flex cursor-pointer
        rounded-md p-2 text-gray-700
        dark:hover:bg-gray-700
        dark:focus:ring-gray-700 justify-between hover:text-gray-900 hover:bg-gray-200 dark:hover:text-gray-300
        color-red-500 font-bold-400
        ${isSelected ? 'lg:bg-white dark:bg-slate-900 text-primary-700 dark:text-primary-500' : ' dark:text-white'}
        `}
      >
        <Link href={`/lists/${list_uuid}`} className="w-full">
          <div className="flex items-center justify-start gap-2 flex-col lg:flex-row text-xs lg:text-sm">
            {icon && icon}
            {!isLargeScreen ? limitCharacters(name, 10) : limitCharacters(name, 28)}
          </div>
        </Link>
      </li>
    </>
  );
}
