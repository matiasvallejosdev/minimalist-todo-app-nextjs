'use client';
import { IconDoorExit } from '@tabler/icons-react';
import { deleteCookie } from 'cookies-next';
import { signOut } from 'next-auth/react';

import { Button } from '../ui/button';

export default function SignOutButton() {
  const handleLogout = () => {
    deleteCookie(process.env.JWT_NAME);
    signOut({ callbackUrl: '/login' }).then(() => console.log('logged out'));
  };

  return (
    <Button
      variant="ghost"
      className="text-xs lg:text-sm flex gap-2 items-center justify-start bg-inherit
              dark:hover:bg-gray-700 hover:bg-gray-200 font-normal w-full"
      onClick={handleLogout}
    >
      <IconDoorExit size="18" />
      Sign Out
    </Button>
  );
}
