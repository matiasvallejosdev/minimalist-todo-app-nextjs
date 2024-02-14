import Header from '@/src/layouts/Header';
import Footer from '@/src/layouts/Footer';
import Image from 'next/image';
import { multiSection } from '@/src/data/HomeData';
import LoginButton from '@/src/components/SignInButton';

export default async function Home() {
  return (
    <main className="container max-w-6xl mx-auto px-2 md:px-4">
      <Header />
      <div className="flex flex-col items-center justify-center text-center">
        <section className="flex flex-col items-center justify-center gap-8 py-10 pb-20 md:py-14">
          <h1 className="font-bold text-6xl md:text-7xl">Simple, shareable todo lists</h1>
          <p className="text-xl md:text-2xl">The easiest way to keep track of the stuff you want to do.</p>
          <LoginButton />
          <Image
            src="/assets/minimalist.png"
            alt="Minimalist To Do"
            width={1080}
            height={720}
            priority
            className="hidden md:block"
          />
        </section>
        <section className="flex flex-col gap-10 items-center justify-between pb-20 md:flex-row md:gap-20">
          {multiSection.map((section, index) => {
            return (
              <div key={index} className="w-full flex gap-2 flex-col text-center md:text-left">
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
