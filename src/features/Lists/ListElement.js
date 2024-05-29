'use client';
import { Button } from '@/src/components/ui/button';

import { usePathname } from 'next/navigation';
import { limitCharacters } from '@/src/utils/appUtils';
import useLargeScreen from '@/src/hooks/useLargeScreen';

import { useRouter } from 'next/navigation';

const getLastPath = (fullUrl) => {
  if (!fullUrl) return 'inbox';
  const pathArray = fullUrl.split('/');
  return pathArray[pathArray.length - 1];
};

export default function ListElement({ id, name, list_uuid, icon }) {
  const pathname = usePathname();
  const { isLargeScreen } = useLargeScreen();
  const router = useRouter();

  const isSelected = getLastPath(pathname) === list_uuid;

  return (
    <Button
      variant="ghost"
      className={`w-full text-xs lg:text-sm flex gap-3 items-center justify-start bg-inherit
                    dark:hover:bg-gray-700 hover:bg-gray-200 font-normal
                    ${
                      isSelected
                        ? 'lg:bg-white dark:bg-black text-primary-700 dark:text-primary-500'
                        : ' dark:text-white'
                    }
                  `}
      onClick={() => router.push(`/lists/${list_uuid}`)}
    >
      {icon && icon}
      {!isLargeScreen ? limitCharacters(name, 10) : limitCharacters(name, 28)}
    </Button>
  );
}
