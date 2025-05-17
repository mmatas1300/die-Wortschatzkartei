'use client'
import Link from 'next/link'
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react'
import { CircleArrowLeft as ArrowIcon } from 'lucide-react';
import { Fade } from "react-awesome-reveal";
import { getLetterAppCards, getUserCardsByFirstLetter } from "@/libs/data";
import CardsGrid from '@/app/ui/worterbuch/letter/CardsGrid';
import { sortAlphaCards } from '@/libs/sortArrays';

function WorterMitPage({ params }) {

    const { data: session, status } = useSession();
    const [cards, setCards] = useState(null);

    useEffect(() => {
        const getData = async ()=>{
            if(status === "unauthenticated" || session?.user.config.cardsSet === "app"){
                const appCards = await getLetterAppCards(params.letter);
                setCards(appCards);
            } else if(session?.user.config.cardsSet === "meine"){
                const myCards = await getUserCardsByFirstLetter(session.user._id,params.letter);
                setCards(sortAlphaCards(myCards));
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
                <CardsGrid cards={cards} />
            </Fade>
        </section>
    )
}

export default WorterMitPage;