import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import Karte from "../Karte";

const PlayScreen = ({ cards, progress }) => {

    const { data: session } = useSession();
    const [selectedCards, setSelectedCards] = useState([]);
    const [startGame, setStartGame] = useState();

    useEffect(() => {

        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

        if (session.user.config.cardsSet === "app") {
            //Obtener las tarjetas a estudiar
        } else if (session.user.config.cardsSet === "meine") {
            //5 tarjetas nuevas + las que hay que estudiar

            const newCards = cards.filter((card) => {
                const cardPracticeDate = new Date(card.practiceDate);
                const newCardsDate = new Date("2000");
                return cardPracticeDate.getTime() === newCardsDate.getTime();
            });
            const fiveNewCards = shuffleArray(newCards).slice(0, 5);

            const toStudyCards = cards.filter((card) => {
                const cardPracticeDate = new Date(card.practiceDate);
                cardPracticeDate.setDate(cardPracticeDate.getDate() + 1);
                const today = new Date();
                const newCardsDate = new Date("2000-01-02");
                return (cardPracticeDate.getTime() < today.getTime()) && (cardPracticeDate.getTime() != newCardsDate.getTime());
            })

            const todayCards = shuffleArray(toStudyCards.concat(fiveNewCards));
            setSelectedCards(todayCards);
        }
    }, [])


    return (
        selectedCards.length===0 ? (<Spinner className="mt-2.5 h-10 w-10" />) : 
        (
            <div className="flex flex-col justify-center items-center">
                <h2>Es gibt heute {selectedCards.length} drei Karten zu studieren</h2>
                <button onClick={()=>setStartGame()}>Los geht's!</button>
            </div>
        )
    );
}

export default PlayScreen;