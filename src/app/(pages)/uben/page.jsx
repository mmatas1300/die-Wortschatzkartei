'use client'
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import CardNotification from "@/app/(pages)/uben/_components/CardNotification";
import { Fade } from "react-awesome-reveal";
import { getAppCards, getUserProgressAppCards, getUserLastGame, getUserCards } from "@/libs/FetchAPI";
import GameScreen from "@/app/(pages)/uben/_components/GameScreen";
import { hexColor } from "@/utils/hexColors";
import { AlertMessageContext } from "@/contexts/AlertMessageContext";
import { cardAdapter } from "@/utils/cardAdapter";
import { updateProgressAppCards } from "@/utils/updateProgressAppCards";

function UbenPage() {

    const { data: session, status } = useSession();
    const [screenContent, setScreenContent] = useState(<Spinner className="mt-[calc(35vh)] h-10 w-10" />);
    const { showNotification } = useContext(AlertMessageContext);

    useEffect(() => {
        const loadData = async () => {
            switch (session.user.config.cardsSet) {
                case "app":
                    const respAppCards = await getAppCards();
                    const respUserProgressApp = await getUserProgressAppCards(session.user._id);
                    const appCards = updateProgressAppCards(respAppCards.cards.map(card => cardAdapter(card)), respUserProgressApp.userProgressAppCards);
                    setScreenContent(<GameScreen cards={appCards}/>);
                    break;

                case "user":
                    const respUserCards = await getUserCards(session.user._id);
                    if (respUserCards.cards.length === 0) {
                        setScreenContent(<CardNotification>Du hast keine Karten zum Üben!!!</CardNotification>);
                    } else {
                        setScreenContent(<GameScreen cards={respUserCards.cards.map(card => cardAdapter(card))} />);
                    }
                    break;
            }
        }

        const startPractice = async () => {
            try {
                const resp = await getUserLastGame(session.user._id);
                const allowToPlayDate = new Date(resp.lastGameData.lastPlayedDate);
                allowToPlayDate.setDate(allowToPlayDate.getDate() + 1);
                const today = new Date();
                if (allowToPlayDate.getTime() < today.getTime()) {
                    await loadData();
                } else {
                    setScreenContent(<CardNotification>Für heute reicht das Üben!</CardNotification>)
                }
            } catch (error) {
                showNotification(error.message, hexColor.redCard)
            }
        }

        if (status === "authenticated")
            startPractice();
    }, [status])

    return (
        <Fade triggerOnce>
            <section className="flex flex-col justify-center items-center mt-6  mb-12">
                {screenContent}
            </section>
        </Fade>
    );
}

export default UbenPage;