'use client';
import {useState, useEffect} from 'react';
import {useTheme} from 'next-themes';
import {IconSun, IconMoon} from '@tabler/icons-react';

export default function ToggleDarkMode({extendedMode, styles}) {
    const [mounted, setMounted] = useState(false);
    const {theme, setTheme} = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleOnClick = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    };

    return (
        <button
            onClick={handleOnClick}
            className={`flex gap-2 cursor-pointer justify-start
            rounded-md p-2 text-sm text-gray-700
            dark:text-gray-400 dark:hover:bg-gray-700
            dark:focus:ring-gray-700 hover:text-gray-900 hover:bg-gray-200 dark:hover:text-gray-100
            color-red-500 font-bold-400
            ${extendedMode && 'w-full'}
            ${styles}
            `}
        >
            {mounted && theme === 'dark' ? <IconMoon className="h-5 w-5"/> : <IconSun className="h-5 w-5"/>}
            {extendedMode === true && <span>
            {mounted && theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>}
        </button>
    );
}

