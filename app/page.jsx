import Header from '@/src/layouts/Header';
import Footer from '@/src/layouts/Footer';
import Image from 'next/image';
import { multiSection } from '@/src/data/HomeData';

import GoogleSignInButton from '@/src/components/auth/social/GoogleSignInButton';
import GithubSignInButton from '@/src/components/auth/social/GithubSignInButton';

export default async function Home() {
  return (
    <main className="container max-w-6xl mx-auto px-10 md:px-4">
      <Header />
      <div className="flex flex-col items-center justify-center text-center">
        <section className="flex flex-col items-center justify-center gap-8 pt-12 pb-24 md:py-14">
          <h1 className="font-bold text-6xl md:text-7xl">Simple, shareable todo lists</h1>
          <p className="text-lg md:text-2xl">The easiest way to keep track of the stuff you want to do.</p>
          <div className="flex gap-4">
            <GoogleSignInButton />
            <GithubSignInButton />
          </div>
          <Image
            src="/minimalist.gif"
            alt="Minimalist To Do"
            width={1080}
            height={720}
            priority
            className="rounded-xl"
          />
        </section>
        <section className="flex flex-col gap-10 items-center justify-between pb-20 md:flex-row md:gap-20">
          {multiSection.map((section, index) => {
            return (
              <div key={index} className="w-full flex gap-2 flex-col text-left">
                <h4 className="text-2xl">{section.title}</h4>
                <p className="text text-left">{section.description}</p>
              </div>
            );
          })}
        </section>
      </div>
      <Footer />
    </main>
  );
}
