'use client';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { IconSun, IconMoon } from '@tabler/icons-react';

export default function ToggleDarkMode({ extendedMode }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOnClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant="ghost"
      className="text-xs lg:text-sm flex gap-2 items-center justify-start bg-inherit
            dark:hover:bg-gray-700 hover:bg-gray-200 font-normal w-full"
      onClick={handleOnClick}
    >
      {mounted && theme === 'dark' ? <IconMoon size={22} /> : <IconSun size={22} />}
      {extendedMode === true && (
        <span className="block text-xs lg:text-sm">{mounted && theme === 'dark' ? 'Light' : 'Dark'}</span>
      )}
    </Button>
  );
}
