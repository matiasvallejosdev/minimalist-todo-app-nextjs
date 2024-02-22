'use client';
import useUser from '@/src/hooks/useUser';
import Image from 'next/image';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useState } from 'react';
import SignOutButton from './SignOutButton';
import { limitCharacters } from '@/src/utils/Utils';

export default function User() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="relative flex flex-col lg:flex-row gap-3 items-center justify-start cursor-pointer p-0 sm:pt-4 lg:pt-0"
        onClick={() => setOpen(!open)}
      >
        <Image alt={user.name} width={100} height={100} src={user.picture} className="w-12 rounded-3xl" />
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
            className="absolute top-20 w-72 left-0 z-20
                flex flex-col gap-2 py-1.5 rounded-md bg-white dark:bg-slate-800 shadow-md
                dark:shadow-slate-900
                items-center justify-center
                ml-2.5
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
