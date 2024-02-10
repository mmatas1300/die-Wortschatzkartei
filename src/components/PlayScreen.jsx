import { useState, useEffect } from "react";
import Karte from "./Karte";
import { Spinner } from "@material-tailwind/react";
import axios from "axios";
import { useSession } from "next-auth/react";

function PlayScreen({stats,cards,finishGame}) {


    const{data:session}= useSession();
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
                //Extraer las que hay que repasar
                //phase1 -> 1 día desde que se jugó
                //phase2 -> 3 días desde que se jugó
                //phase3-> 7 días desde que se jugó
                //phase4-> 15 días desde que se jugó
                //phase5-> 30 días desde que se jugó
                //phase6-> 60 días desde que se jugó
                //phase7-> 90 días desde que se jugó
                //phase8-> 120 días desde que se jugó
                //phase9-> 150 días desde que se jugó                


            }
        } else {
            console.log("Necesitas más de 5 tarjetas para jugar")
        }
    }

    const nextCard = async ()=>{
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
            await sendProgress();
            finishGame();
        }

    }

    const sendProgress = async ()=>{
        try {
            const userData = await axios({
                method: 'put',
                url: '/api/user/progress',
                data: {
                    email: session.user.email,
                    progress: todayProgress,
                    lastPlay: Date()
                }
            });
            console.log(userData)
        } catch (error) {
            console.log(error)
        }
    }

    const repeatCard = ()=>{
        closeCard();
        const progressContainer = todayProgress;
        const cardsContainer = cardsToPlay;
        const index = progressContainer.findIndex(card => card.cardId === cardsContainer[cardPlayed]._id)
        if(progressContainer[index].phase > 0){
            progressContainer[index].phase = progressContainer[index].phase - 1;
        }
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
            {cardsToPlay?(<><Karte karte={cardsToPlay[cardPlayed]} flip={flip} /><button className={` ${flip ? "hidden" : ""} mt-4 bg-black-card rounded-lg py-2 px-6 text-sm`} onClick={() => { setFlip(true) }}>Umdrehen</button></>)
            :(<Spinner className="mt-2.5 h-10 w-10" />)}
            
            <div className="flex flex-row justify-center items-center">
                <button className="mx-2 mt-4 bg-black-card rounded-lg py-2 px-6 text-sm hover:bg-red-card" onClick={repeatCard}>Wiederholen</button>
                <button className="mx-2 mt-4 bg-black-card rounded-lg py-2 px-6 text-sm hover:bg-green-card" onClick={nextCard}>Nächste</button>
            </div>
            <div>{JSON.stringify(todayProgress)}</div>

        </div>
    );
}

export default PlayScreen