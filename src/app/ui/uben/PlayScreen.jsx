import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import FlipCard from "./FlipCard";
import CardMessage from "@/components/CardMessage";
import { shuffleArray } from "@/libs/shuffleArray";
import { calcNextPracticeDate } from "@/libs/calcNextPracticeDate";
import { saveAppProgress, saveMyProgress } from "@/libs/data";
import ProgressBar from "@ramonak/react-progress-bar";

const PlayScreen = ({ cards, progress }) => {

    const { data: session } = useSession();
    const [selectedCards, setSelectedCards] = useState([]);
    const [selectedProgress, setSelectedProgress] = useState([]);
    const [reviewedCardNum, setReviewedCardNum] = useState(0);
    const [studiedCards, setStudiedCards] = useState([]);
    const [gameStart, setGameStart] = useState(false);
    const [gameFinish, setGameFinish] = useState(false);
    const [flipCard, setFlipCard] = useState(false);
    const [vanish, setVanish] = useState(false);

    useEffect(() => {
        if (session.user.config.cardsSet === "app") {
            //5 tarjetas nuevas + las que hay que estudiar
            const newCardsIds = progress.filter((card) => {
                const cardPracticeDate = new Date(card.practiceDate);
                const newCardsDate = new Date("2000");
                return cardPracticeDate.getTime() === newCardsDate.getTime();
            });
            const fiveNewCardsIds = shuffleArray(newCardsIds).slice(0, 5);

            const toStudyCardsIds = progress.filter((card) => {
                const cardPracticeDate = new Date(card.practiceDate);
                const today = new Date();
                const newCardsDate = new Date("2000");
                return (cardPracticeDate.getTime() < today.getTime()) && (cardPracticeDate.getTime() != newCardsDate.getTime());
            })

            const todayProgress = shuffleArray(toStudyCardsIds.concat(fiveNewCardsIds));
            const todayCards = [];
            todayProgress.forEach((element) => {
                const cardFound = cards.find((card) => {
                    return card._id === element.cardId
                });
                todayCards.push(cardFound);
            })
            setSelectedCards(todayCards);
            setSelectedProgress(todayProgress);

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
                const today = new Date();
                const newCardsDate = new Date("2000");
                return (cardPracticeDate.getTime() < today.getTime()) && (cardPracticeDate.getTime() != newCardsDate.getTime());
            })

            const todayCards = shuffleArray(toStudyCards.concat(fiveNewCards));
            setSelectedCards(todayCards);
        }
    }, [])


    const saveProgress = async ()=>{
        if (session.user.config.cardsSet === "app")
            await saveAppProgress(session.user._id, [...studiedCards, selectedProgress[reviewedCardNum]]);
        else if (session.user.config.cardsSet === "meine")
            await saveMyProgress(session.user._id, [...studiedCards, selectedCards[reviewedCardNum]]);
    };

    const richtigButton = () => {
        if (session.user.config.cardsSet === "app") {
            if (selectedProgress[reviewedCardNum].level < 7)
                selectedProgress[reviewedCardNum].level++; //Aumenta nivel
            const nextPracticeDate = calcNextPracticeDate(selectedProgress[reviewedCardNum].level);
            selectedProgress[reviewedCardNum].practiceDate = new Date(Date.now() + nextPracticeDate);
            selectedProgress[reviewedCardNum].practiceDate.setHours(0, 0, 0);
            setStudiedCards((studiedCards) => studiedCards.concat([selectedProgress[reviewedCardNum]]))
        } else if (session.user.config.cardsSet === "meine") {
            if (selectedCards[reviewedCardNum].level < 7)
                selectedCards[reviewedCardNum].level++; //Aumenta nivel
            const nextPracticeDate = calcNextPracticeDate(selectedCards[reviewedCardNum].level);
            selectedCards[reviewedCardNum].practiceDate = new Date(Date.now() + nextPracticeDate);
            selectedCards[reviewedCardNum].practiceDate.setHours(0, 0, 0);
            setStudiedCards((studiedCards) => studiedCards.concat([selectedCards[reviewedCardNum]]))
        }
        setFlipCard(false);
        setVanish(true);

        if (reviewedCardNum < selectedCards.length - 1) {
            setTimeout(() => {
                setReviewedCardNum(reviewedCardNum + 1);
                setVanish(false);
            }, 200);
        } else {
            saveProgress();
            setGameFinish(true);
        }
    };

    const falschButton = () => {
        if (session.user.config.cardsSet === "app") {
            if (0 < selectedProgress[reviewedCardNum].level)
                selectedProgress[reviewedCardNum].level--; //Disminuir nivel
            setSelectedCards(selectedCards.concat([selectedCards[reviewedCardNum]]));
            setSelectedProgress(selectedProgress.concat([selectedProgress[reviewedCardNum]]));
        } else if (session.user.config.cardsSet === "meine") {
            if (0 < selectedCards[reviewedCardNum].level)
                selectedCards[reviewedCardNum].level--; //Disminuir nivel
            setSelectedCards(selectedCards.concat([selectedCards[reviewedCardNum]]));
        }
        setFlipCard(false);
        setVanish(true);
        setTimeout(() => {
            setReviewedCardNum(reviewedCardNum + 1);
            setVanish(false);
        }, 200);
    };

    return (
        selectedCards.length === 0 ? (<CardMessage message={"Wir haben heute keine Karten zum Lernen gefunden"} />) :
            (
                <>
                    {gameStart ? (!gameFinish ? (<>
                                                    <div className="mt-4 mb-6 w-80 mx-14">
                                                        <ProgressBar completed={reviewedCardNum}  maxCompleted={selectedCards.length-1}  baseBgColor="#F8F9FA" bgColor="#4CAB2A" isLabelVisible={false} />
                                                    </div>
                                                   
                                                    <FlipCard card={selectedCards[reviewedCardNum]} setFlipCard={setFlipCard} flipCard={flipCard} vanish={vanish} richtigButton={richtigButton} falschButton={falschButton} />
                                                </>) :
                        (<CardMessage message={"Herzlichen Glückwunsch, genug für heute"} />)
                    ) :
                        (
                            <CardMessage message={
                                <div className="flex flex-col justify-center items-center">
                                    <div className="text-base">Es gibt heute {selectedCards.length} Karten zu studieren</div>
                                    <button onClick={() => setGameStart(true)}>Los geht&apos;s!</button>
                                </div>
                            } />
                        )
                    }
                </>
            )
    );
}

export default PlayScreen;