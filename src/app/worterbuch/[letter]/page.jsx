'use client'
import Karte from "@/components/KarteWorterbuch";
import arrow from '@/app/ui/arrow.png';
import Link from 'next/link'
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { useSession } from 'next-auth/react'

function WorterMitPage({ params }) {

    const { data: session, status } = useSession();
    const [cards, setCards] = useState(null);

    useEffect(() => {

        const fetchAppCards = ()=>{
            fetch('/api/cards')
            .then((res) => res.json())
            .then((data) => mapCards(data))
        }

        const fetchPersonalCards =()=>{
            fetch('/api/user/cards', {
                method: "POST", // 
                body: JSON.stringify({ email: session.user.email }), // 
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => res.json())
                .then((data) => mapCards(data))
        }

        if (status==="authenticated") {
            if (session.user.config.cardsSet === "app") {
                fetchAppCards();
            } else { //personal cards
                fetchPersonalCards();
            }
        } else if(status==="unauthenticated"){
            fetchAppCards();
        }

        const mapCards = (data) => {
            const dataFilter = data.filter((card) => {
                return card.wort.charAt(0) === params.letter
            })
            setCards(dataFilter);
        }
    }, [status])

    return (
        <section>
            <div className="flex flex-row justify-between items-center mt-12">
                <Link href="/worterbuch" className='bg-orange-card hover:bg-yellow-card ms-12 h-10 w-10 rounded-full'>
                    <img className="" src={arrow.src} alt="Back" />
                </Link>
                <h1 className="text-lg text-center mx-auto">Wörter mit {params.letter}</h1>
                <div className="me-12 h-10 w-10"></div>
            </div>

            <div className="flex flex-row flex-wrap justify-center items-center mt-12">
                {cards ? (cards.map(karte => <div key={karte._id} className="m-5"><Karte {...karte} /></div>)) : (<Spinner className="mt-2.5 h-10 w-10" />)}
            </div>
        </section>

    )

}

export default WorterMitPage