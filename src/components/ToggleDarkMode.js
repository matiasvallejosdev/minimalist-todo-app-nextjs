'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { IconSun, IconMoon } from '@tabler/icons-react';

export default function ToggleDarkMode({ extendedMode, styles }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOnClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={handleOnClick}
      className={`flex gap-2 cursor-pointer justify-center lg:justify-start
            rounded-md sm:p-2 text-sm text-gray-700
            dark:text-gray-400 sm:dark:hover:bg-gray-700
            dark:focus:ring-gray-700 hover:text-gray-500 sm:hover:bg-gray-200 dark:hover:text-gray-100
            color-red-500 font-bold-400
            ${extendedMode && 'w-full'}
            ${styles}
            h-auto
            sm:h-14
            w-full
            lg:h-full
            items-center
            flex-col
            lg:flex-row
            `}
    >
      {mounted && theme === 'dark' ? (
        <IconMoon size={22} />
      ) : (
        <IconSun size={22} />
      )}
      {extendedMode === true && (
        <span className="block text-xs lg:text-sm">{mounted && theme === 'dark' ? 'Light' : 'Dark'}</span>
      )}
    </button>
  );
}
