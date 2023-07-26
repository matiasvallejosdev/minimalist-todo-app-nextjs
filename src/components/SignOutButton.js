'use client'
import {IconDoorExit} from "@tabler/icons-react";
import { deleteCookie } from 'cookies-next';
import {signOut} from "next-auth/react";

export default function SignOutButton() {
    const handleLogout = () => {
        deleteCookie("token");
        signOut({callbackUrl: "/login"}).then(() => console.log("logged out"));
    }

    return (
        <button className="flex gap-3 cursor-pointer justify-start
        rounded-md p-4 text-sm text-gray-700
        dark:text-white dark:hover:bg-slate-700
        dark:focus:ring-gray-700 hover:text-gray-900 hover:bg-gray-200 dark:hover:text-gray-100
        color-red-500 font-bold-400 w-full
        items-center
        h-8
        " onClick={(e) => handleLogout(e)}>
            <IconDoorExit size="18"/>
            Sign Out
        </button>
    )
}