import { useState, useEffect } from "react";
import Karte from "./Karte";
import { Spinner } from "@material-tailwind/react";

function PlayScreen({stats,cards}) {

    const [cardsToPlay, setCardsToPlay] = useState();
    const [todayProgress, setTodayProgress] = useState();
    const [cardPlayed, setCardPlayed] = useState(0);
    const [flip, setFlip] = useState(false);

    const generateGameData = (cards,stats) => {
        if (cards.length >= 5) {
            if (stats.progress.length === 0) {
                //primera vez
                const cardsSelection = cards.sort(() => Math.random() - 0.5).slice(0, 5);
                const progress = cardsSelection.map((card) => {
                    return { cardId: card._id, phase: 0, date: Date() };
                })
                setTodayProgress(progress)
                setCardsToPlay(cardsSelection)
            } else {
                //volver a jugar
            }
        } else {
            console.log("Necesitas más de 5 tarjetas para jugar")
        }
    }

    const nextCard = ()=>{
        closeCard();
        const progressContainer = todayProgress;
        const cardsContainer = cardsToPlay;
        const index = progressContainer.findIndex(card => card.cardId === cardsContainer[cardPlayed]._id)
        progressContainer[index].phase = progressContainer[index].phase + 1;
        setTodayProgress(progressContainer);
        if(cardsToPlay.length-1 !== cardPlayed){
            setTimeout(()=>{
                setCardPlayed(cardPlayed+1);
            },450)
        }else{
            console.log("fin de la ronda")
        }

    }

    const repeatCard = ()=>{
        closeCard();
        const progressContainer = todayProgress;
        const cardsContainer = cardsToPlay;
        const index = progressContainer.findIndex(card => card.cardId === cardsContainer[cardPlayed]._id)
        progressContainer[index].phase = progressContainer[index].phase - 1;
        setTodayProgress(progressContainer);
        cardsContainer.push(cardsContainer[cardPlayed])
        setCardsToPlay(cardsContainer);
        setTimeout(()=>{
            setCardPlayed(cardPlayed+1);
        },450)
    }


    const closeCard = ()=>{
        setFlip(false);
    }

    useEffect(() => {
      generateGameData(cards,stats);
    }, [])
    

    return(
        <div className="flex flex-col justify-center items-center">
            {cardsToPlay?(<><Karte karte={cardsToPlay[cardPlayed]} flip={flip} /><button className={` ${flip ? "hidden" : ""} mt-4`} onClick={() => { setFlip(true) }}>Umdrehen</button></>)
            :(<Spinner className="mt-2.5 h-10 w-10" />)}
            
            <div className="grid grid-cols-2">
                <button className="mx-2 mt-4" onClick={repeatCard}>Wiederholen</button>
                <button className="mx-2 mt-4" onClick={nextCard}>Nächste</button>
                <div>{JSON.stringify(todayProgress)}</div>
            </div>

        </div>
    );
}

export default PlayScreen