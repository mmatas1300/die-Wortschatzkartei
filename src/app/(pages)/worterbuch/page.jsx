"use client";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { CircleArrowLeft as ArrowIcon } from "lucide-react";
import { Fade } from "react-awesome-reveal";
import { getAppCardsByQuery, getUserCardsByQuery } from "@/libs/FetchAPI";
import SearchForm from "@/components/SearchForm";
import LettersGrid from "@/app/(pages)/worterbuch/_components/LettersGrid";
import { sortAlphaCards } from "@/libs/sortArrays";
import { hexColor } from "@/utils/hexColors";
import { AlertMessageContext } from "@/contexts/AlertMessageContext";
import CardsFoundGrid from "@/app/(pages)/worterbuch/_components/CardsFoundGrid";
import { cardAdapter } from "@/utils/cardAdapter";

function WorterbuchPage() {

    const { data: session, status } = useSession();
    const [cards, setCards] = useState(null);
    const { showNotification } = useContext(AlertMessageContext);
    const [buttonDisable, setButtonDisable] = useState(false);

    const searchCard = async (e) => {
        e.preventDefault();
        setButtonDisable(true);
        const formData = new FormData(e.currentTarget);
        const query = formData.get("search");
        const searchRegex = /^[a-zA-ZäÄöÖüÜß\s]+$/;
        if (!searchRegex.test(query)) showNotification("Bitte geben Sie nur Buchstaben ein", hexColor.redCard);
        else {
            if (status === "unauthenticated" || session.user.config.cardsSet === "app") {
                try {
                    const resp = await getAppCardsByQuery(query);
                    setCards(sortAlphaCards(resp.cards.map( card => cardAdapter(card))));
                } catch (error) {
                    showNotification(error.message,hexColor.redCard)
                }
            } else if (session.user.config.cardsSet === "user") {
                try {
                    const resp = await getUserCardsByQuery(session.user._id, query);
                    setCards(sortAlphaCards(resp.cards.map( card => cardAdapter(card))));
                } catch (error) {
                    showNotification(error.message,hexColor.redCard)
                }
            }
        }
        setButtonDisable(false);
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
                    <SearchForm handleSubmit={searchCard} buttonDisable={buttonDisable} style={"w-full max-w-md mx-4 mt-4"} />
                    <div className="me-9 h-7 w-7" />
                </div>
                {cards ?
                    (cards.length === 0 ?
                        (<h1 className="mt-[calc(30vh)] text-center">Wir konnten keine Karte finden</h1>) :
                        (<CardsFoundGrid cards={cards} />)
                    ) : (<LettersGrid />)}
            </Fade>
        </section>
    );
}

export default WorterbuchPage;