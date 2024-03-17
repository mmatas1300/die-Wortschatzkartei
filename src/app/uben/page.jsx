'use client'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import PlayScreen from "@/components/PlayScreen";

function UbenPage() {

    const { data: session, status } = useSession();
    const [statistics, setStatistics] = useState();
    const [cards, setCards] = useState();
    const [startPlay, setStartPlay] = useState(false);
    const [isTimeToPlay, setIsTimeToPlay] = useState(false);
    const [buttonState, setButtonState] = useState(false);
    const [isGameFinish, setIsGameFinish] = useState(false);


    const getStats = async () => {
        const responseStatistics = await fetch('/api/user/progress', {
            method: "POST", // 
            body: JSON.stringify({ email: session.user.email }), // 
            headers: {
                "Content-Type": "application/json",
            },
        });
        const dataStatistics = await responseStatistics.json();
        setStatistics(dataStatistics.progress)
        return dataStatistics.progress;
    }

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


    const gameStart = async () => {
        setButtonState(true)
        await getCards()
        setStartPlay(true)
    }


    const finishGame = () => {
        setIsGameFinish(true)
    }

    useEffect(() => {//Config Inicial
        //Condiciones para jugar:
        //
        const loadData = async () => {
            if (status === "authenticated") {
                const stats = await getStats(); //Trae stats
                const now = new Date();
                if(stats.length !== 0){
                    const cardsToPlayToday = stats.filter((card)=>{
                        const lastPlay = new Date(card.date)
                        lastPlay.setDate(lastPlay.getDate()+1);
                        return lastPlay < now
                    })
    
                    console.log(cardsToPlayToday)
                } else if(stats.length ===0){
                    //primera vez jugando
                }
                

                // if ( < now) {
                //     setIsTimeToPlay(true)
                // }
            }
        }
        loadData();
    }, [status])

    return (
        <div className="flex flex-col justify-center items-center mt-12">
            {!isGameFinish ? (statistics ?
                (startPlay ?
                    (<PlayScreen stats={statistics} cards={cards} finishGame={finishGame} />) :
                    (isTimeToPlay ?
                        (<>

                            <div className="text-xl">Es ist Zeit zu üben!</div>
                            {buttonState ? (<Spinner className="mt-2.5 h-10 w-10" />) :
                            (<button className="bg-green-card rounded-lg py-2 px-6 text-sm mt-4" onClick={() => { gameStart() }}>Weiter</button>)}

                        </>) :
                        (<div>Für heute reicht das Üben!</div>)
                    )
                )
                : (<Spinner className="mt-2.5 h-10 w-10" />)) : (<div>Herzlichen Glückwunsch, gute Übung!</div>)}
        </div>
    );
}

export default UbenPage