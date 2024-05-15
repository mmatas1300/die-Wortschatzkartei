"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Karte from "@/components/Karte";
import { CircleArrowLeft as ArrowIcon } from "lucide-react";
import { Fade } from "react-awesome-reveal";
import { getSearchAppCards, getSearchMyCards } from "@/libs/data";

function WorterbuchPage() {

    const { data: session, status } = useSession();
    const [cards, setCards] = useState(null);
    const [warningMessage, setWarningMessage] = useState(null);
    const [buttonState, setButtonState] = useState(false);

    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    alpha.splice(23, 2);

    const handleSubmit = async (e) => {
        setButtonState(true);
        setWarningMessage(null);
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get("search");
        const searchRegex = /^[a-zA-ZäÄöÖüÜß\s]+$/;

        if (searchRegex.test(query)) {
            if (status === "unauthenticated" || session.user.config.cardsSet === "app") {
                const appCards = await getSearchAppCards(query);
                setCards(appCards);
            } else if (session.user.config.cardsSet === "meine") {
                const myCards = await getSearchMyCards(query, session.user._id);
                setCards(myCards);
            }
        } else {
            setWarningMessage(<p className="text-orange-card text-center">Bitte geben Sie nur Buchstaben ein</p>);
        }
        setButtonState(false);
    };

    return (
        <section className="my-12">
            <Fade triggerOnce>
                <h1 className="text-center">Wörterbuch</h1>
                <div className="flex flex-row justify-center items-center">
                    <div className="me-9 h-7 w-7">
                        {cards ? (<ArrowIcon size={40} onClick={() => {setCards(null);}} className="bg-orange-card hover:bg-yellow-card cursor-pointer ms-5 rounded-full"/>) : (
                            <p/>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="w-full max-w-md mx-4 mt-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-red-card" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input required type="search" name="search" id="default-search" className="block w-full p-4 ps-10 text-sm"/>
                            <button disabled={buttonState} type="submit" className="absolute end-2.5 bottom-2 bg-green-card cursor-pointer px-4 py-2">Suchen</button>
                        </div>
                    </form>

                    <div className="me-9 h-7 w-7" />
                </div>

                {warningMessage}

                {cards ? (
                    cards.length === 0 ? (
                        <h1 className="mt-[calc(30vh)] text-center">
                            Wir konnten keine Karte finden
                        </h1>
                    ) : (
                        <div className="flex flex-row flex-wrap justify-center items-center mt-4">
                            {" "}
                            {cards.map((karte) => (
                                <div key={karte._id} className="m-5 hover:scale-105 transition-all">
                                    <Karte {...karte} />
                                </div>
                            ))}
                        </div>
                    )
                ) : (
                    <div className="flex flex-row justify-center items-center flex-wrap mt-4">
                        {alpha.map((x) => {
                            return (
                                <Link key={x} href={`/worterbuch/${String.fromCharCode(x)}`} className="bg-orange-card hover:bg-yellow-card w-32 h-32 m-3 cursor-pointer text-base flex justify-center items-center rounded-xl transition duration-200 hover:scale-110">
                                    {String.fromCharCode(x)}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </Fade>
        </section>
    );
}

export default WorterbuchPage;