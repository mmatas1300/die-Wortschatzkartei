import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import FlipCard from "./FlipCard";
import CardNotification from "@/app/(pages)/uben/_components/CardNotification";
import { shuffleArray } from "@/libs/sortArrays";
import { saveAppCardsProgress, saveUserCardsProgress } from "@/libs/FetchAPI";
import ProgressBar from "@ramonak/react-progress-bar";
import { useSoundEffect } from "@/hooks/useSoundEffect";
import { hexColor } from "@/utils/hexColors";
import { useGameState } from "@/hooks/useGameState";
import { useGameCardState } from "@/hooks/useGameCardState";
import { AlertMessageContext } from "@/contexts/AlertMessageContext";

const GameScreen = ({cards}) => {

    const { data: session } = useSession();
    const [selectedCards, setSelectedCards] = useState([]);
    const [currentCard, setCurrentCard] = useState(0);
    const [correctCards, setCorrectCards] = useState([]);
    const { gameStarted, gameFinished, setGameStarted, setGameFinished } = useGameState();
    const { vanish, setVanish, flipCard, setFlipCard } = useGameCardState();
    const {showNotification} = useContext(AlertMessageContext);
    const { winSound, correctSound, incorrectSound } = useSoundEffect();
    const practiceTime = [86_400_000, 86_400_000 * 3, 86_400_000 * 6, 86_400_000 * 12, 86_400_000 * 24, 86_400_000 * 48, 86_400_000 * 72];

    useEffect(() => {
        //new cards + due cards
        const newCards = cards.filter((card) => {
            const cardlastPlayedDate = new Date(card.lastPlayedDate);
            const newCardslastPlayedDate = new Date("2000");
            return cardlastPlayedDate.getTime() === newCardslastPlayedDate.getTime();
        });
        const newCardsSelected = shuffleArray(newCards).slice(0, session.user.config.cardsPerDay); //Select random cards and choose a number of cards

        const dueCards = cards.filter((card) => {
            const cardlastPlayedDate = new Date(card.lastPlayedDate);
            const today = new Date();
            const newCardslastPlayedDate = new Date("2000");
            return (cardlastPlayedDate.getTime() < today.getTime()) && (cardlastPlayedDate.getTime() != newCardslastPlayedDate.getTime());
        })
        setSelectedCards(shuffleArray(dueCards.concat(newCardsSelected)));
    }, [])


    const saveProgress = async () => {
        try {
            switch (session.user.config.cardsSet) {
                case "app":
                    const cardsPlayed = [...correctCards, selectedCards[currentCard]];
                    const progress= cardsPlayed.map((card)=>{
                        return {cardId: card._id, level: card.level, lastPlayedDate: card.lastPlayedDate};
                    })
                    await saveAppCardsProgress(session.user._id, progress);
                    break;

                case "user":
                    await saveUserCardsProgress(session.user._id, [...correctCards, selectedCards[currentCard]]);
                    break;
            }
        } catch (error) {
            showNotification(error.message,hexColor.redCard);
        }
    };

    const correctButton = async () => {
        if (selectedCards[currentCard].level < 7)
            selectedCards[currentCard].level++; //next level
        const nextPracticeDate = practiceTime[selectedCards[currentCard].level-1];
        selectedCards[currentCard].lastPlayedDate = new Date(Date.now() + nextPracticeDate);
        selectedCards[currentCard].lastPlayedDate.setHours(0, 0, 0);
        setCorrectCards((correctCards) => correctCards.concat([selectedCards[currentCard]]))
        correctSound();
        setFlipCard(false);
        setVanish(true);
        if (currentCard < selectedCards.length - 1) {
            setTimeout(() => {
                setCurrentCard(currentCard + 1);
                setVanish(false);
            }, 200);
        } else {
            await saveProgress();
            winSound();
            setGameFinished(true);
        }
    };

    const incorrectButton = () => {
        if (0 < selectedCards[currentCard].level)
            selectedCards[currentCard].level = 0; //reset level
        setSelectedCards(selectedCards.concat([selectedCards[currentCard]]));
        incorrectSound();
        setFlipCard(false);
        setVanish(true);
        setTimeout(() => {
            setCurrentCard(currentCard + 1);
            setVanish(false);
        }, 200);
    };

    return (
        selectedCards.length === 0 ? (<CardNotification>Wir haben heute keine Karten zum Lernen gefunden</CardNotification>) :
            (
                <>
                    {gameStarted ? (!gameFinished ? (<>
                        <div className="mb-6 w-80 mx-14">
                            <ProgressBar completed={currentCard} maxCompleted={selectedCards.length - 1} baseBgColor={hexColor.whiteCard} bgColor={hexColor.greenCard} isLabelVisible={false} />
                        </div>

                        <FlipCard card={selectedCards[currentCard]} setFlipCard={setFlipCard} flipCard={flipCard} vanish={vanish} correctButton={correctButton} incorrectButton={incorrectButton} />
                    </>) :
                        (<CardNotification>Herzlichen Glückwunsch, genug für heute</CardNotification>)
                    ) :
                        (
                            <CardNotification>
                                <div className="flex flex-col justify-center items-center">
                                    <div className="text-base">Es gibt heute {selectedCards.length} Karten zu studieren</div>
                                    <button onClick={() => setGameStarted(true)}>Los geht&apos;s!</button>
                                </div>
                            </CardNotification>
                        )
                    }
                </>
            )
    );
}

export default GameScreen;