"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { CircleArrowLeft as ArrowIcon } from "lucide-react";
import { Fade } from "react-awesome-reveal";
import { getAppCardsByQuery, getUserCardsByQuery } from "@/libs/data";
import SearchForm from "@/components/SearchForm";
import LettersGrid from "@/app/ui/worterbuch/LettersGrid";
import SearchCardsGrid from "@/app/ui/worterbuch/SearchCardsGrid";
import { sortAlphaCards } from "@/libs/sortArrays";

function WorterbuchPage() {

    const { data: session, status } = useSession();
    const [cards, setCards] = useState(null);
    const [warningMessage, setWarningMessage] = useState(null);
    const [buttonState, setButtonState] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonState(true);
        setWarningMessage(null);
        const formData = new FormData(e.currentTarget);
        const query = formData.get("search");
        const searchRegex = /^[a-zA-ZäÄöÖüÜß\s]+$/;
        
        if (!searchRegex.test(query)) setWarningMessage(<p className="text-orange-card text-center">Bitte geben Sie nur Buchstaben ein</p>);
        else{
            if (status === "unauthenticated" || session.user.config.cardsSet === "app") {
                const appCards = await getAppCardsByQuery(query);
                setCards(sortAlphaCards(appCards));
            } else if (session.user.config.cardsSet === "meine") {
                const myCards = await getUserCardsByQuery(query, session.user._id);
                
                setCards(sortAlphaCards(myCards));
            }
        }
        setButtonState(false);
    };

    return (
        <section className="my-12">
            <Fade triggerOnce>
                <h1 className="text-center">Wörterbuch</h1>
                <div className="flex flex-row justify-center items-center">
                    <div className="me-9 h-7 w-7">
                        {cards ? (<ArrowIcon size={40} onClick={() => { setCards(null); }} className="bg-orange-card hover:bg-yellow-card cursor-pointer ms-5 rounded-full" />) : (
                            <p />
                        )}
                    </div>
                    <SearchForm handleSubmit={handleSubmit} buttonState={buttonState} style={"w-full max-w-md mx-4 mt-4"}/>
                    <div className="me-9 h-7 w-7" />
                </div>
                {warningMessage}
                {cards ? 
                    (cards.length === 0 ? 
                        (<h1 className="mt-[calc(30vh)] text-center">Wir konnten keine Karte finden</h1>) :
                        (<SearchCardsGrid cards={cards} />)
                    ) : (<LettersGrid />)}
            </Fade>
        </section>
    );
}

export default WorterbuchPage;