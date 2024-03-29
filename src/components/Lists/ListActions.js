'use client'
import Image from 'next/image'
import useUser from '@/src/hooks/useUser';
import { IconDotsVertical, IconUserPlus } from '@tabler/icons-react';
import { useState } from 'react';
import ListDelete from './ListDelete';

export default function ListActions({list}) {
    const [actionOpen, setActionOpen] = useState(false);
    const { user } = useUser();

    const handleOpenShare = () => {
        setActionOpen(false);
    }
    
    return <>
        <div className="relative flex gap-2 items-center justify-center">
            {/* <IconUserPlus size={18} className="text-gray-400 cursor-pointer"
            onClick={() => handleOpenShare()}
            /> */}
            <IconDotsVertical size={18} 
            className="text-gray-400 cursor-pointer
            select-none
            " 
                onClick={() => setActionOpen(!actionOpen)}
            />
            {
                actionOpen && 
                <div className="absolute top-0 right-0 mt-4 md:mt-6 w-48 z-20
                flex flex-col gap-2 py-1.5 rounded-md bg-white dark:bg-slate-800 shadow-md
                dark:shadow-slate-900
                items-center justify-center
                ml-2.5
                select-none
                " onClick={() => setActionOpen(false)}>
                    <ListDelete list={list} />
                </div>
            }
        </div>
    </>
}