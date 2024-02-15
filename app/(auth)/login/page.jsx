import SignInButton from '../../../src/components/SignInButton';
import Link from 'next/link';

export default function LoginPage({ searchParams }) {
  return (
    <div className="h-full dark:text-white flex items-center justify-center">
      <div
        className="flex flex-col items-center justify-center gap-3 bg-white
            dark:bg-slate-800
            rounded-md shadow-md
            max-w-sm
            md:max-w-lg
            xl:max-w-2xl
            p-8
            md:p-16"
      >
        <div className="flex flex-col gap-3 pb-3 text-center">
          <div className="text-2xl font-bold dark:text-white">
            <Link href="#" alt="home">
              minimalist
            </Link>
          </div>
          <p className="text p-0 text-sm">
            A community of over hundred of members, where you can improve your productivity managing the tasks.
          </p>
        </div>
        <SignInButton />
      </div>
    </div>
  );
}
