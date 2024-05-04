'use client'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useState } from 'react';
import Karte from "@/components/Karte";
import { CircleArrowLeft as ArrowIcon } from 'lucide-react';
import { Spinner } from "@material-tailwind/react";


function WorterbuchPage() {

    const searchButton = (<button type="submit" className="absolute end-2.5 bottom-2 bg-green-card cursor-pointer px-4 py-2">
        Suchen
    </button>);

    const { data: session, status } = useSession();
    const [cardsSuchen, setCardsSuchen] = useState(null);
    const [suchenWarning, setSuchenWarning] = useState(null);
    const [suchenButton, setSuchenButton] = useState(searchButton);


    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    alpha.splice(23, 2)

    const handleSuchen = (e) => {
        setSuchenButton(<Spinner className="mt-[calc(30vh)] h-10 w-10" />)
        setSuchenWarning(null)
        e.preventDefault();
        const suchen = new FormData(e.currentTarget)
        const mySuch = suchen.get("search");

        const searchRegex = /^[a-zA-ZäÄöÖüÜß\s]+$/;

        if (searchRegex.test(mySuch)) {
            if (status === "authenticated") {
                if (session.user.config.cardsSet === "app") {
                    fetchAppCards(mySuch);
                } else { //personal cards
                    fetchPersonalCards(mySuch);
                }
            } else if (status === "unauthenticated") {
                fetchAppCards(mySuch);
            }
        } else {
            setSuchenWarning(<p className='text-orange-card text-center'>Bitte geben Sie nur Buchstaben ein</p>)
        }
        setSuchenButton(searchButton);
    };

    const fetchAppCards = (such) => {
        fetch(`/api/cards/search/${such}`)
            .then((res) => res.json())
            .then((data) => { setCardsSuchen(data) })
    }

    const fetchPersonalCards = (such) => {
        fetch(`/api/user/cards/search/${such}`, {
            method: "POST", // 
            body: JSON.stringify({ userId: session.user._id }), // 
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json())
            .then((data) => setCardsSuchen(data))
    }

    return (
        <section className='my-12'>
            <h1 className='text-center'>Wörterbuch</h1>
            <div className='flex flex-row justify-center items-center'>
                <div className='me-9 h-7 w-7'>
                    {cardsSuchen ? (<ArrowIcon size={40} onClick={() => { setCardsSuchen(null) }} className='bg-orange-card hover:bg-yellow-card cursor-pointer ms-5 rounded-full' />) : (<p></p>)}
                </div>

                <form onSubmit={handleSuchen} className="w-full max-w-md mx-4 mt-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-red-card" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input required type="search" name="search" id="default-search" className="block w-full p-4 ps-10 text-sm" />
                        {suchenButton}
                    </div>
                </form>
                <div className="me-9 h-7 w-7" />
            </div>
            {suchenWarning}

            {cardsSuchen ?
                (cardsSuchen.length === 0 ? (<h1 className='mt-[calc(30vh)] text-center'>Wir konnten keine Karte finden</h1>) :
                    (<div className="flex flex-row flex-wrap justify-center items-center mt-4"> {cardsSuchen.map(karte => <div key={karte._id} className="m-5"><Karte {...karte} /></div>)}</div>)
                ) : (<div className="flex flex-row justify-center items-center flex-wrap mt-4">
                    {alpha.map((x) => {
                        return (
                            <Link key={x} href={`/worterbuch/${String.fromCharCode(x)}`} className='bg-orange-card hover:bg-yellow-card w-32 h-32 m-3 cursor-pointer text-base flex justify-center items-center rounded-xl transition duration-200 hover:scale-110'>
                                {String.fromCharCode(x)}
                            </Link>
                        )
                    })
                    }</div>)
            }
        </section>
    );
}

export default WorterbuchPage
