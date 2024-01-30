'use client';

import Link from "next/link";
import ToggleDarkMode from "@/src/components/ToggleDarkMode";

export default function Header() {
    return (
        <header className="w-full py-10 px-2 flex justify-between items-center bg-inherit">
            <div className="text-2xl font-bold dark:text-white">
                <Link href="#" alt="home">
                    minimalist
                </Link>
            </div>
            <div className="flex items-center justify-center flex-row gap-3">
                <span className="text-md font-bold dark:text-white">
                    Made with by <Link href=" https://www.linkedin.com/in/matiasvallejos/" target="_blank"
                                       className="text-bold text-primary-600">Matias Vallejos</Link>
                </span>
                <ToggleDarkMode/>
            </div>
        </header>
    )
}