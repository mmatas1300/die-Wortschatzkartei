import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import CardsListRow from "@/app/(pages)/karteneditor/_components/verwalten/CardsListRow";
import { RefreshCcw } from 'lucide-react';
import { getAppCards, getUserCards, getUserProgressAppCards } from "@/libs/FetchAPI";
import SearchForm from '@/components/SearchForm';
import { sortCardsByLevel } from "@/libs/sortArrays";
import { Spinner } from "@material-tailwind/react";
import { cardAdapter } from "@/utils/cardAdapter";
import { hexColor } from "@/utils/hexColors";
import { AlertMessageContext } from "@/contexts/AlertMessageContext";

export const CardsList = () => {

    const { data: session, status } = useSession();
    const [cards, setCards] = useState(null);
    const [cardsBackup, setCardsBackup] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const {showNotification} = useContext(AlertMessageContext);

    const searchCard = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const search = formData.get("search");
        const regExp = new RegExp(`.*${search.toLowerCase()}.*`);
        const filteredCards = cardsBackup.filter((card) => { return regExp.test(card.word.toLowerCase()) })
        setCards(filteredCards);
    };

    useEffect(() => {
        const init = async () => {
            try {
                let cards = [];
                switch (session.user.config.cardsSet) {
                    case "app":
                        const respAppCards = await getAppCards();
                        const respProgressApp = await getUserProgressAppCards(session.user._id);

                        respProgressApp.userProgressAppCards.forEach(element => {
                            const cardFound = respAppCards.cards.filter((card) => {
                                return card._id === element.cardId;
                            })
                            cards.push({ ...cardFound[0], level: element.level, lastPlayedDate: element.lastPlayedDate });
                        });
                        break;

                    case "user":
                        const respUserCards = await getUserCards(session.user._id);
                        cards = respUserCards.cards;
                        break;
                }
                const sortedCards = sortCardsByLevel(cards.map(card => cardAdapter(card)));
                setCards(sortedCards);
                setCardsBackup(sortedCards);
            } catch (error) {
                showNotification(error.message,hexColor.redCard);
            }  
        }
        if (status === "authenticated") {
            init();
        }
    }, [status, refresh])

    return (
        <div className="mb-12 mt-4">
            <h2 className="text-center my-2">Karten verwalten</h2>
            <div className="flex flex-col justify-center items-center bg-red-card p-3 rounded-3xl">

                <SearchForm handleSubmit={searchCard} buttonState={false} style={"w-60 lg:w-full max-w-md -ms-10 mt-4 -mb-16 p-4 rounded-xl bg-black-card"} />

                <div className={`self-end flex flex-row me-8`}>
                    <button onClick={() => { setRefresh(!refresh) }} className={`bg-black-card p-2 z-0 rounded-none rounded-t-lg transition duration-200 hover:scale-105 hover:bg-yellow-card px-3`}><RefreshCcw /></button>
                </div>
                <div className="bg-black-card rounded-3xl w-96 lg:w-[640px] flex flex-col justify-center items-center p-4 z-10 mb-3">
                    <div className="flex flex-row w-full">
                        <div className="w-20 mx-1 text-base text-center">Stufe</div>
                        <div className="w-28 mx-1 flex-1 text-base text-center">Wort</div>

                        {session.user.config.cardsSet == "app" ? (<>
                            <div className="w-36 mx-1 text-base text-center hidden lg:block">Übersetzung</div>
                            <div className="w-6 mx-2 mr-10" />
                        </>
                        ) : (<>
                            <div className="w-28 mx-1 text-base text-center hidden lg:block">Übersetzung</div>
                            <div className="w-20 mx-2 mr-10" />
                        </>)
                        }
                    </div>

                    {cards === null ?
                        (<Spinner className="mt-2.5 mb-4 h-9 w-9" />) :
                        (cards.length != 0 ?
                            (<>{cards.map((card) => <CardsListRow key={card._id} card={card} setRefresh={setRefresh} refresh={refresh} />)}</>) :
                            (<h2 className="mt-6">Oh, es ist leer</h2>))}

                </div>
            </div>
        </div>
    );
};