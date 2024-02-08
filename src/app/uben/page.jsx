'use client'
import Karte from "@/components/Karte";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import card from "@material-tailwind/react/theme/components/card";

function UbenPage() {

    const { data: session, status } = useSession();
    const [cards, setCards] = useState();
    const [statistics, setStatistics] = useState();
    const [dom, setDom] = useState(<Spinner className="mt-2.5 h-10 w-10" />);
    const [cardNum, setCardNum] = useState(0);
    const [startPlay, setStartPlay] = useState(false);    
    const [isFlipped,setIsFlipped] = useState(false);

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

    const generateGameData = (cards,stats) => {
        if (cards.length >= 5) {
            if (stats.progress.length === 0) {
                //primera vez
                const cardsRandom = cards.sort(() => Math.random() - 0.5);
                const cardsToPlay = cardsRandom.slice(0, 5);
                const todayProgress = cardsToPlay.map((card) => {
                    return { cardId: card._id, phase: 0, date: Date.now() };
                })
                setStatistics(todayProgress)
                setCards(cardsToPlay)
                return [cardsToPlay, todayProgress];
            } else {
                //volver a jugar
            }
        } else {
            console.log("Necesitas más de 5 tarjetas para jugar")
        }
    }

    const cardCheck = () => {
        setIsFlipped(!isFlipped);
        setTimeout(()=>{},2000)
        setCardNum(cardNum+1)


    }



    const startPlayButton = () =>{
        setStartPlay(true);
    }

    const enterpoint = async () => {
        if (session.user.lastPlay === 0 || session.user.lastPlay + 86_400_000 < Date.now()) {
            const cards = await getCards();
            const stats = await getStats() //Trae stats
            const [cardsToPlay,todayProgress] = generateGameData(cards,stats);
            setDom(<><div className="my-5"><Karte karte={cardsToPlay[0]} status={isFlipped} /></div><button>Otra vez</button><button onClick={cardCheck}>Entendido</button></>)
        } else {
            console.log("Aún no puedo volver a jugar")
        }
    }

    useEffect(() => {//Config Inicial
        const loadData = async () => {
            if (status === "authenticated") {
                const stats = await getStats() //Trae stats
                setStatistics(stats);
                setDom((
                    <div>
                        <div>Es ist Zeit zu üben!</div>
                        <button onClick={startPlayButton}>Weiter</button>
                    </div>
                ));
            }
        }

        loadData();
    }, [status])



    useEffect(()=>{
        if(startPlay===true && cardNum===0){
            enterpoint();
            console.log("fin enterpoint")
        } else if(cardNum > 0){
            setDom(<><div className="my-5"><Karte karte={cards[cardNum]} status={isFlipped} /></div><button>Otra vez</button><button onClick={cardCheck}>Entendido</button></>)
        }
    },[startPlay,cardNum])





    return (
        <div className="flex flex-col justify-center items-center mt-12">
            {dom}
            <div className="text-4xl">{JSON.stringify(statistics)}</div>
            <div className="text-4xl">{JSON.stringify(cardNum)}</div>
        </div>
    );


}

export default UbenPage