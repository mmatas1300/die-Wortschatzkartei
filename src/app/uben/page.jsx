'use client'
import Karte from "@/components/Karte";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";

function UbenPage() {

    const { data: session, status } = useSession();
    const [cards, setCards] = useState(null);
    const [progress, setProgress] = useState("Hola");

    useEffect(() => {

        const getData = async () => {
            const responseProgress = await fetch('/api/user/progress', {
                method: "POST", // 
                body: JSON.stringify({ email: session.user.email }), // 
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const dataProgress = await responseProgress.json();
            setProgress(dataProgress)

            if (session.user.config.cardsSet === "app") {
                const responseCards = await fetch('/api/cards');
                const dataCards = await responseCards.json();
                mapCards(dataCards,dataProgress)
            } else { //personal cards
                const responseCards = fetch('/api/user/cards', {
                    method: "POST", // 
                    body: JSON.stringify({ email: session.user.email }), // 
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                const dataCards = await responseCards.json()
                mapCards(dataCards,dataProgress)
            }

        
        }



        const mainFlux = async () =>{
            if (status === "authenticated") {
                await getData()
            } 
        }

        mainFlux();




        const mapCards = (cards,progress) => {
            if(progress.length === 0){
                const cardsRandom = cards.sort(() => Math.random() - 0.5);
                const cardsToPlay = cardsRandom.slice(0,5);
                const todayProgress = cardsToPlay.map((card)=>{
                    return {cardId: card._id, phase:1, date: Date.now()};
                })
                console.log(todayProgress)
                setCards(cardsToPlay);
            } else{

            }

        }
    }, [status])


    return (
        <div className="flex flex-col justify-center items-center mt-12">
            <div>{JSON.stringify(progress)}</div>
            {cards ? cards.map((karte) => {
                return (<div key={karte._id} className="my-5"><Karte {...karte} /></div>)
            }) : (<Spinner className="mt-2.5 h-10 w-10" />)}
        </div>
    );


}

export default UbenPage