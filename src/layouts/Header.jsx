'use client';
import Link from 'next/link';
import MadeWith from '@/src/components/MadeWith'

export default function Header() {
  return (
    <header className="w-full py-10 px-2 flex justify-center items-center bg-inherit flex-col md:flex-row md:justify-between">
      <div className="text-3xl font-bold dark:text-white transition duration-150 hover:scale-105">
        <Link href="#" alt="home">
          minimalist
        </Link>
      </div>
      <MadeWith />
    </header>
  );
}
