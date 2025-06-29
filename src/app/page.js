'use client'
import FAQ from "@/app/(pages)/hilfe/_components/FAQ";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";
import { useSession } from "next-auth/react";

export default function Home() {

    const { status } = useSession();

    return (
        <section className="flex flex-col items-center justify-between my-12 mx-4">
            <Fade triggerOnce>
                <h1 className="p-5 rounded-2xl my-3 mx-10 text-center text-3xl shadow-xl">die Wortschatzkartei</h1>

                <div className="flex flex-col lg:flex-row justify-center items-center my-5 lg:mx-32">
                    <img src="/imgs/Uben.gif" alt="Uben demo" width={250} className="rounded-2xl mt-4  shadow-md  shadow-orange-card" />
                    <div>
                        <h1 className="p-5 rounded-2xl mx-10 text-center">Study with our cards or with the ones you create</h1>
                        <p className="mx-10 text-center text-base">Review the cards once a day using spaced repetition to memorize the vocabulary</p>
                    </div>
                </div>

                <div className="flex flex-col-reverse lg:flex-row justify-center items-center my-5 lg:mx-32">
                    <div>
                        <h1 className="p-5 rounded-2xl mx-10 text-center">Translate your card with PONS</h1>
                        <p className="mx-10 text-center text-base">Connect your PONS account and look up translations directly from the dictionary</p>
                        <p className="mx-10 text-center text-base">For more information, check the &apos;hilfe&apos; section</p>
                    </div>
                    <img src="/imgs/PONS.gif" alt="PONS demo" width={250} className="rounded-2xl mt-4  shadow-md  shadow-blue-card" />
                </div>

                <div className="flex flex-col lg:flex-row justify-center items-center my-12 lg:mx-32">
                    <img src="/imgs/Karteneditor.gif" alt="Kartenenditor" className="rounded-2xl mt-4 mx-auto shadow-md  shadow-green-card w-96" />
                    <div>
                        <h1 className="p-5 rounded-2xl mx-10 text-center">Create your own cards</h1>
                        <p className="mx-10 text-center text-base">Use the card editor to create your own cards. You can create cards with nouns, verbs, words that have variations for men and women, and any other category</p>
                    </div>
                </div>

                <div className="flex flex-col-reverse lg:flex-row justify-center items-center my-12 lg:mx-32">
                    <div>
                        <h1 className="p-5 rounded-2xl mx-10 text-center">Manage your cards</h1>
                        <p className="mx-10 text-center text-base">You can review or reset your progress, and edit or delete your cards</p>
                    </div>
                    <img src="/imgs/KarteneditorVerwalten.jpg" alt="Kartenenditor Verwalten" className="rounded-2xl mt-4 shadow-md  shadow-yellow-card w-96" />
                </div>

                <div className="flex flex-col lg:flex-row justify-center items-center my-12 lg:mx-32">
                    <img src="/imgs/Worterbuch.jpg" alt="Worterbuch" className="rounded-2xl mt-4 shadow-md  shadow-red-card w-96" />
                    <div>
                        <h1 className="p-5 rounded-2xl mx-10 text-center">Review your cards in alphabetical order</h1>
                        <p className="mx-10 text-center text-base">If you want to study your cards without affecting your progress, review the dictionary</p>
                    </div>
                </div>

                {status === "unauthenticated" ? (<div className="p-5 rounded-2xl my-3 mx-10 text-center text-base lg:text-xl">Ready to learn? <Link href="/login"><button className="bg-red-card mx-1 text-base lg:text-xl">Register</button></Link> now and get started!</div>) :
                    (<div className="p-5 rounded-2xl my-3 mx-10 text-center text-base lg:text-xl">Ready to learn? <Link href="/uben"><button className="bg-red-card mx-1 text-base lg:text-xl">Let&apos;s practice</button></Link></div>)}

                <FAQ />
            </Fade>
        </section>
    );
}