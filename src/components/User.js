'use client';
import useUser from '@/src/hooks/useUser';
import Image from 'next/image';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useState } from 'react';
import SignOutButton from './auth/SignOutButton';
import { limitCharacters } from '@/utils/appUtils';

export default function User() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="relative flex flex-col lg:flex-row gap-3 items-center justify-start cursor-pointer p-0 sm:pt-4 lg:pt-0"
        onClick={() => setOpen(!open)}
      >
        <Image priority alt={user.name} width={100} height={100} src={user.picture} className="w-12 rounded-3xl" />
        <div className="hidden lg:flex flex-col gap-1 w-full">
          <h5 className="text-base">{`${user.name}`}</h5>
          <p className="text-sm text-gray-500 dark:text-gray-400">{limitCharacters(user.email, 20)}</p>
        </div>
        <div className="absolute right-0 flex justify-center items-center">
          {open ? (
            <IconChevronUp size={22} className="hidden lg:block ml-2" />
          ) : (
            <IconChevronDown size={22} className="hidden lg:block ml-2" />
          )}
        </div>
        {open && (
          <div
            className="hidden sm:absolute sm:-bottom-14 sm:-left-1 lg:-left-5 z-20
                w-52
                lg:w-72
                sm:flex flex-col gap-2 py-1.5 rounded-md bg-white dark:bg-slate-800 shadow-md
                dark:shadow-slate-900
                items-center justify-center
                "
            onClick={() => setOpen(false)}
          >
            <SignOutButton />
          </div>
        )}
      </div>
    </>
  );
}
