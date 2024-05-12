'use client'
import Karte from "@/components/Karte";
import Link from 'next/link'
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { useSession } from 'next-auth/react'
import { CircleArrowLeft as ArrowIcon } from 'lucide-react';
import { Fade } from "react-awesome-reveal";
import { getLetterAppCards, getLetterMyCards } from "@/libs/data";

function WorterMitPage({ params }) {

    const { data: session, status } = useSession();
    const [cards, setCards] = useState(null);

    useEffect(() => {

        const getData = async ()=>{
            if(status === "unauthenticated" || session?.user.config.cardsSet === "app"){
                const appCards = await getLetterAppCards(params.letter);
                setCards(appCards);
            } else if(session?.user.config.cardsSet === "meine"){
                const myCards = await getLetterMyCards(params.letter,session.user._id);
                setCards(myCards);
            }
        };

        if(status !== "loading")
            getData();

    }, [status])

    return (
        <section className='my-12'>
            <Fade triggerOnce>
                <div className="flex flex-row justify-between items-center">
                    <Link href="/worterbuch" className='bg-orange-card hover:bg-yellow-card ms-12 h-10 w-10 rounded-full'>
                        <ArrowIcon size={40} />
                    </Link>
                    <h1 className="text-xl text-center mx-auto">Wörter mit {params.letter}</h1>
                    <div className="me-12 h-10 w-10"></div>
                </div>

                <div className="flex flex-row flex-wrap justify-center items-center mt-12">
                    {cards ? (cards.length != 0 ?
                        (cards.map(karte => <div key={karte._id} className="m-5"><Karte {...karte} /></div>)) : (
                            <h1 className="mt-[calc(30vh)]">Oh, es ist leer</h1>
                        )
                    ) : (<Spinner className="mt-[calc(30vh)] h-10 w-10" />)}
                </div>
            </Fade>
        </section>
    )
}

export default WorterMitPage;