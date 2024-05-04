import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import FlipCard from "./FlipCard";
import axios from "axios";
import UbenMessages from "./UbenMessages";

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

        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

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
                cardPracticeDate.setDate(cardPracticeDate.getDate() + 1);
                const today = new Date();
                const newCardsDate = new Date("2000-01-02");
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
                cardPracticeDate.setDate(cardPracticeDate.getDate() + 1);
                const today = new Date();
                const newCardsDate = new Date("2000-01-02");
                return (cardPracticeDate.getTime() < today.getTime()) && (cardPracticeDate.getTime() != newCardsDate.getTime());
            })

            const todayCards = shuffleArray(toStudyCards.concat(fiveNewCards));
            setSelectedCards(todayCards);
        }
    }, [])

    const postMyCards = async () => {
        try {
            await axios.put('/api/user/cards', { userId: session.user._id, cards: [...studiedCards, selectedCards[reviewedCardNum]], update: "play" });
        } catch (error) {
            console.log(error)
        }
    }

    const postAppCards = async () => {
        try {
            await axios.put('/api/user/game-data', { userId: session.user._id, progress: [...studiedCards, selectedProgress[reviewedCardNum]]})
        } catch (error) {
            console.log(error)
        }
    };

    const calcNextPracticeDate = () => {
        let nextPracticeDate;
        switch (selectedCards[reviewedCardNum].level) {
            case 1:
                nextPracticeDate = 86_400_000;
                break;
            case 2:
                nextPracticeDate = 86_400_000 * 3;
                break;
            case 3:
                nextPracticeDate = 86_400_000 * 6;
                break;
            case 4:
                nextPracticeDate = 86_400_000 * 12;
                break;
            case 5:
                nextPracticeDate = 86_400_000 * 24;
                break;
            case 6:
                nextPracticeDate = 86_400_000 * 48;
                break;
            case 7:
                nextPracticeDate = 86_400_000 * 72;
                break;
            default:
                break;
        }
        return nextPracticeDate
    };

    const richtigButton = () => {
        if (session.user.config.cardsSet === "app") {
            if (selectedProgress[reviewedCardNum].level < 7)
                selectedProgress[reviewedCardNum].level++; //Aumenta nivel
            let nextPracticeDate;
            switch (selectedProgress[reviewedCardNum].level) {
                case 1:
                    nextPracticeDate = 86_400_000;
                    break;
                case 2:
                    nextPracticeDate = 86_400_000 * 3;
                    break;
                case 3:
                    nextPracticeDate = 86_400_000 * 6;
                    break;
                case 4:
                    nextPracticeDate = 86_400_000 * 12;
                    break;
                case 5:
                    nextPracticeDate = 86_400_000 * 24;
                    break;
                case 6:
                    nextPracticeDate = 86_400_000 * 48;
                    break;
                case 7:
                    nextPracticeDate = 86_400_000 * 72;
                    break;
                default:
                    break;
            }
            selectedProgress[reviewedCardNum].practiceDate = new Date(Date.now() + nextPracticeDate);
            setStudiedCards((studiedCards) => studiedCards.concat([selectedProgress[reviewedCardNum]]))
        } else if (session.user.config.cardsSet === "meine") {
            if (selectedCards[reviewedCardNum].level < 7)
                selectedCards[reviewedCardNum].level++; //Aumenta nivel
            const nextPracticeDate = calcNextPracticeDate();
            selectedCards[reviewedCardNum].practiceDate = new Date(Date.now() + nextPracticeDate);
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
            if (session.user.config.cardsSet === "app")
                postAppCards();
            else if (session.user.config.cardsSet === "meine")
                postMyCards();

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
        selectedCards.length === 0 ? (<Spinner className="mt-2.5 h-10 w-10" />) :
            (
                <div className="flex flex-col justify-center items-center">
                    {gameStart ? (!gameFinish ? (<><FlipCard card={selectedCards[reviewedCardNum]} setFlipCard={setFlipCard} flipCard={flipCard} vanish={vanish} richtigButton={richtigButton} falschButton={falschButton} /></>) :
                        (<UbenMessages message={"Herzlichen Glückwunsch, genug für heute"} />)
                    ) :
                        (
                            <UbenMessages message={
                                <div className="flex flex-col justify-center items-center">
                                    <h2>Es gibt heute {selectedCards.length} Karten zu studieren</h2>
                                    <button onClick={() => setGameStart(true)}>Los geht&apos;s!</button>
                                </div>
                            } />
                        )
                    }
                </div >
            )
    );
}

export default PlayScreen;