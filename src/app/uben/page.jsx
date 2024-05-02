'use client'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import axios from "axios";

function UbenPage() {

    const { data: session, status, update } = useSession();
    const [cards, setCards] = useState(null);
    const [progress, setProgress] = useState(null);
    const [mainMessage, setMainMessage] = useState(<Spinner className="mt-2.5 h-10 w-10" />);



    useEffect(() => {

        const loadData = async () => {
            if (session.user.config.cardsSet === "app") {
                try {
                    const responseCards = await fetch('/api/cards');
                    const cards = await responseCards.json();
                    setCards(cards);
                    const responseProgress = await axios.post("api/user/game-data", { userId: session.user._id, query: "progress" });
                    setProgress(responseProgress.data.progress);
                } catch (err) {
                    console.log(err)
                }
            } else if (session.user.config.cardsSet === "meine") {
                try {
                    const responseCards = await axios.post("api/user/cards", { userId: session.user._id });
                    setCards(responseCards.data);
                } catch (error) {
                    console.log(error)
                }
            }

        };

        const initPractice = async () => {
            try {
                const response = await axios.post("api/user/game-data", { userId: session.user._id, query: "lastPlay" });
                const allowToPlayDate = new Date(response.data.lastPlay);
                allowToPlayDate.setDate(allowToPlayDate.getDate() + 1);
                const today = new Date();
                if (allowToPlayDate.getTime() < today.getTime()) {
                    await loadData();
                } else {
                    setMainMessage("Für heute reicht das Üben!")
                }
            } catch (error) {
                console.log(error)
            }
        }

        if (status === "authenticated")
            initPractice();


    }, [status])

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            {mainMessage}
        </div>
    );
}

export default UbenPage