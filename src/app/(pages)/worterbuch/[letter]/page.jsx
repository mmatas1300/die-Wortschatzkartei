'use client'
import Link from 'next/link'
import { useContext, useEffect, useState } from "react";
import { useSession } from 'next-auth/react'
import { CircleArrowLeft as ArrowIcon } from 'lucide-react';
import { Fade } from "react-awesome-reveal";
import { getAppCardsByFirstLetter, getUserCardsByFirstLetter } from "@/libs/FetchAPI";
import CardsGrid from '@/app/(pages)/worterbuch/_components/letter/CardsGrid';
import { sortAlphaCards } from '@/libs/sortArrays';
import { cardAdapter } from '@/utils/cardAdapter';
import { AlertMessageContext } from '@/contexts/AlertMessageContext';
import { hexColor } from '@/utils/hexColors';

function WorterMitPage({ params }) {

    const { data: session, status } = useSession();
    const [cards, setCards] = useState(null);
    const { showNotification } = useContext(AlertMessageContext);

    useEffect(() => {
        const getCards = async () => {
            let resp
            try {
                if (status === "unauthenticated" || session?.user.config.cardsSet === "app")
                    resp = await getAppCardsByFirstLetter(params.letter);
                else
                    resp = await getUserCardsByFirstLetter(session.user._id, params.letter);
                setCards(sortAlphaCards(resp.cards.map((card) => cardAdapter(card))));
            } catch (error) {
                showNotification(error.message, hexColor.redCard);
            }
        }
        if(status != "loading")
            getCards();
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