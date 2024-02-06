'use client'
import Karte from "@/components/KarteWorterbuch";
import arrow from '@/app/ui/arrow.png';
import Link from 'next/link'
import style from "@/app/ui/worterbuch.module.css"
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";

function WorterMitPage({ params }) {

    const [cards, setCards] = useState(null);

    useEffect(()=>{
        fetch('/api/cards')
            .then((res)=>res.json())
            .then((data)=>{
                const dataFilter = data.filter((card) => {
                    return card.wort.charAt(0) === params.letter
                })
                setCards(dataFilter);
            })
    },[])

    return (
        <section>
            <div className="flex flex-row justify-between items-center mt-12"> 
                <Link href="/worterbuch" className={`${style.card} ms-12 h-10 w-10 rounded-full`}>
                    <img className="" src={arrow.src} alt="Back" />
                </Link>
                <h1 className="text-lg text-center mx-auto">Wörter mit {params.letter}</h1>
                <div className="me-12 h-10 w-10"></div>
            </div>

            <div className="flex flex-row flex-wrap justify-center items-center mt-12">
                {cards?(cards.map(karte => <div key={karte._id} className="m-5"><Karte {...karte} /></div>)):(<Spinner className="mt-2.5 h-10 w-10" />)}
            </div>
        </section>

    )

}

export default WorterMitPage