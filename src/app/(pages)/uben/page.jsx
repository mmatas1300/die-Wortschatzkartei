'use client'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import CardMessage from "@/components/CardMessage";
import {progressUpdate} from "@/libs/progressUpdate";
import { Fade } from "react-awesome-reveal";
import { getAppCards, getUserProgressAppCards, getUserLastGame, getUserCards } from "@/services/FetchAPI";
import PlayScreen from "@/app/(pages)/uben/_components/PlayScreen";

function UbenPage() {

    const { data: session, status } = useSession();
    const [mainMessage, setMainMessage] = useState(<Spinner className="mt-[calc(35vh)] h-10 w-10" />);

    useEffect(() => {
        const loadData = async () => {
            if (session.user.config.cardsSet === "app") {
                const cards = await getAppCards();
                const progressData = await getUserProgressAppCards(session.user._id);
                const progress = progressUpdate(cards.data, progressData.data);
                setMainMessage(<PlayScreen cards={cards.data} progress={progress} />);
            } else if (session.user.config.cardsSet === "user") {
                const cards = await getUserCards(session.user._id);
                if (cards.length === 0) {
                    setMainMessage(<CardMessage message={"Du hast keine Karten zum Üben!!!"} />);
                } else {
                    setMainMessage(<PlayScreen cards={cards.data} />);
                }
            }
        }

        const initPractice = async () => {
            const data = await getUserLastGame(session.user._id);
            const allowToPlayDate = new Date(data.data.dayPlayed);
            allowToPlayDate.setDate(allowToPlayDate.getDate() + 1);
            const today = new Date();
            if (allowToPlayDate.getTime() < today.getTime()) {
                await loadData();
            } else {
                setMainMessage(<CardMessage message={"Für heute reicht das Üben!"} />)
            }
        }

        if (status === "authenticated")
            initPractice();
    }, [status])

    return (
        <Fade triggerOnce>
            <section className="flex flex-col justify-center items-center mt-6  mb-12">
                {mainMessage}
            </section>
        </Fade>
    );
}

export default UbenPage;