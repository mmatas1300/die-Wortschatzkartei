'use client'
import Karte from "@/components/Karte";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";

function UbenPage() {

    const { data: session, status } = useSession();
    const [cards, setCards] = useState();
    const [statistics, setStatistics] = useState();
    const [dom, setDom] = useState(<Spinner className="mt-2.5 h-10 w-10" />); 
    const [play,setPlay] = useState();

    const startPlay = ()=>{
        setPlay(true);
    }

    useEffect(() => {

        const getStats = async () => {
            const responseStatistics = await fetch('/api/user/progress', {
                method: "POST", // 
                body: JSON.stringify({ email: session.user.email }), // 
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const dataStatistics = await responseStatistics.json();
            return dataStatistics//Trae progreso

        }

        const loadData = async () => {
            if (status === "authenticated") {
                const stats = await getStats() //Trae stats
                setDom((
                    <div>
                        <div>Es ist Zeit zu üben!</div>
                        <button onClick={startPlay}>Weiter</button>
                    </div>));
                setStatistics(stats);
            }
        }

        loadData();
    }, [status])


    useEffect(()=>{
        const getCards = async () => {
            //trae cartas
            if (session.user.config.cardsSet === "app") {
                const responseCards = await fetch('/api/cards');
                const dataCards = await responseCards.json();
                setCards(dataCards)
                return dataCards
            } else { //personal cards
                const responseCards = await fetch('/api/user/cards', {
                    method: "POST", // 
                    body: JSON.stringify({ email: session.user.email }), // 
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                const dataCards = await responseCards.json()
                setCards(dataCards)
                return dataCards
            }
        }
    
        const mapCards = (cards) => {
            if (cards.length >= 5) {
                if (statistics.progress.length === 0) {
                    //primera vez
                    const cardsRandom = cards.sort(() => Math.random() - 0.5);
                    const cardsToPlay = cardsRandom.slice(0, 5);
                    const todayProgress = cardsToPlay.map((card) => {
                        return { cardId: card._id, phase: 0, date: Date.now() };
                    })
                    setStatistics(todayProgress)
                    setCards(cardsToPlay)
                    setDom(cardsToPlay.map((karte) => {
                        return (<div key={karte._id} className="my-5"><Karte {...karte} /></div>)
                    }))
                } else {
                    //volver a jugar
                }
            } else {
                console.log("Necesitas más de 5 tarjetas para jugar")
            }
    
        }
        
        
    const start = async ()=>{
        if (session.user.lastPlay === 0 || session.user.lastPlay + 86_400_000 < Date.now()) {
            const cards = await getCards();
            mapCards(cards)
        } else {
            console.log("Aún no puedo volver a jugar")
        }
    }
    if (status === "authenticated") {
        start();
    }

    },[play])


    return (
        <div className="flex flex-col justify-center items-center mt-12">
            {dom}
            <div className="text-4xl">{JSON.stringify(statistics)}</div>

            {/* {cards.map((karte) => {
                return (<div key={karte._id} className="my-5"><Karte {...karte} /></div>)
            })} */}
        </div>
    );


}

export default UbenPage