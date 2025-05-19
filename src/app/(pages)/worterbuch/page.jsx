"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { CircleArrowLeft as ArrowIcon } from "lucide-react";
import { Fade } from "react-awesome-reveal";
import { getAppCardsByQuery, getUserCardsByQuery } from "@/services/FetchAPI";
import SearchForm from "@/components/SearchForm";
import LettersGrid from "@/app/ui/worterbuch/LettersGrid";
import SearchCardsGrid from "@/app/ui/worterbuch/SearchCardsGrid";
import { sortAlphaCards } from "@/libs/sortArrays";
import AutohideSnackbar from "@/components/Snackbar";
import { hexColor } from "@/utils/colors";
import { useWarningMessage } from "@/hooks/useWarningMessage";

function WorterbuchPage() {

    const { data: session, status } = useSession();
    const [cards, setCards] = useState(null);
    const [warningMessage, warningTrigger, setWarningMessage] = useWarningMessage();
    const [buttonDisable, setButtonDisable] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonDisable(true);
        const formData = new FormData(e.currentTarget);
        const query = formData.get("search");
        const searchRegex = /^[a-zA-ZäÄöÖüÜß\s]+$/;       
        if (!searchRegex.test(query)) setWarningMessage("Bitte geben Sie nur Buchstaben ein");
        else{
            if (status === "unauthenticated" || session.user.config.cardsSet === "app") {
                const body = await getAppCardsByQuery(query);
                if(!body.ok) setWarningMessage("Fehler, versuchen Sie es später nochmal!");
                setCards(sortAlphaCards(body.data));
            } else if (session.user.config.cardsSet === "user") {
                const body = await getUserCardsByQuery(session.user._id, query);
                setCards(sortAlphaCards(body.data));
            }
        }
        setButtonDisable(false);
    };

    return (
        <section className="my-12">
            <AutohideSnackbar message={warningMessage} color={hexColor.redCard} trigger={warningTrigger}/>
            <Fade triggerOnce>
                <h1 className="text-center">Wörterbuch</h1>
                <div className="flex flex-row justify-center items-center">
                    <div className="me-9 h-7 w-7">
                        {cards ? (<ArrowIcon size={40} onClick={() => { setCards(null); }} className="bg-orange-card hover:bg-yellow-card cursor-pointer ms-5 rounded-full" />) : (
                            <p />
                        )}
                    </div>
                    <SearchForm handleSubmit={handleSubmit} buttonDisable={buttonDisable} style={"w-full max-w-md mx-4 mt-4"}/>
                    <div className="me-9 h-7 w-7" />
                </div>
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