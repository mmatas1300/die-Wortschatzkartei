'use client'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import CardMessage from "@/components/CardMessage";
import PlayScreen from "@/app/ui/uben/PlayScreen";
import {progressUpdate} from "@/libs/progressUpdate";
import { Fade } from "react-awesome-reveal";
import { getAppCards, getGameData, getMyCards } from "@/libs/data";

function UbenPage() {

    const { data: session, status } = useSession();
    const [mainMessage, setMainMessage] = useState(<Spinner className="mt-[calc(35vh)] h-10 w-10" />);

    useEffect(() => {
        const loadData = async () => {
            if (session.user.config.cardsSet === "app") {
                const cards = await getAppCards();
                const progressData = await getGameData(session.user._id, "progress");
                const progress = progressUpdate(cards, progressData.progress);
                setMainMessage(<PlayScreen cards={cards} progress={progress} />);
            } else if (session.user.config.cardsSet === "meine") {
                const cards = await getMyCards(session.user._id);
                if (cards.length === 0) {
                    setMainMessage(<CardMessage message={"Du hast keine Karten zum Üben!!!"} />);
                } else {
                    setMainMessage(<PlayScreen cards={cards} />);
                }
            }
        }

        const initPractice = async () => {
            const data = await getGameData(session.user._id, "lastPlay");
            const allowToPlayDate = new Date(data.lastPlay.dayPlayed);
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
            <section className="flex flex-col justify-center items-center my-12">
                {mainMessage}
            </section>
        </Fade>
    );
}

export default UbenPage;