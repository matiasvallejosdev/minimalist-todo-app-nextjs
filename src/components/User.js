'use client'
import useUser from '@/src/hooks/useUser';
import Image from 'next/image';
import {IconChevronDown, IconChevronUp} from '@tabler/icons-react';
import { useState } from 'react';
import SignOutButton from './SignOutButton';

export default function User(){
    const {user} = useUser();
    const [open, setOpen] = useState(false);

    const limitEmailCharacter = (email, limit) => {
        if(String(email).length < limit) return email;
        return String(email).substring(0,limit) + '...'
    }

    return<>
        <div className="flex gap-3 items-center justify-start cursor-pointer" 
            onClick={() => setOpen(!open)}
        >
            <Image alt={user.name} width={150} height={150} src={user.picture} className="w-11 rounded-3xl"/>
            <div className="flex flex-col gap-1">
                <h5 className="text-md">{`${user.name}`}</h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {
                        limitEmailCharacter(user.email, 20)
                    }
                </p>
            </div>
            {
                open ? <IconChevronUp className="inline-block ml-2" /> : <IconChevronDown className="inline-block ml-2" />
            }
            {
                open && <div className="absolute top-20 w-72 left-0 z-20
                flex flex-col gap-2 py-1.5 rounded-md bg-white dark:bg-slate-800 shadow-md
                dark:shadow-slate-900
                items-center justify-center
                ml-2.5
                " onClick={() => setOpen(false)}>
                    <SignOutButton />
                </div>
            }
        </div>
    </>
}