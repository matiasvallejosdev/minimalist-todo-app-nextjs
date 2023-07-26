import Header from "@/src/layouts/Header";
import Footer from "@/src/layouts/Footer";
import Image from 'next/image';
import {multiSection} from "@/src/data/HomeData";
import LoginButton from "@/src/components/SignInButton";

export default async function Home() {
    return (
        <main className="container max-w-6xl mx-auto">
            <Header/>
            <div className="flex flex-col items-center justify-center text-center">
                <section className="flex flex-col items-center justify-center gap-8 py-14">
                    <h1 className="font-bold text-7xl">
                        Simple, shareable todo lists
                    </h1>
                    <p className="text-2xl">
                        The easiest way to keep track of the stuff you want to do.
                    </p>
                    <LoginButton />
                    <Image src="/assets/minimalist.png" alt="Minimalist To Do" width={1080} height={720} priority/>
                </section>
                <section className="flex gap-20 items-center justify-between pb-20">
                    {
                        multiSection.map((section, index) => {
                            return (
                                <div key={index} className="w-full flex gap-2 flex-col">
                                    <h4 className="text-2xl text-left">{section.title}</h4>
                                    <p className="text text-left">{section.description}</p>
                                </div>
                            )
                        })
                    }
                </section>
            </div>
            <Footer/>
        </main>
    )
}