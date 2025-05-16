import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react';
import { getGameData, getMyCards } from "@/libs/data";
import { Spinner } from "@material-tailwind/react";


const CardsProgress = () => {

    const { data: session, status } = useSession();
    const [percentage, setPercentage] = useState(null);
    const cardColorOrange = getComputedStyle(document.documentElement).getPropertyValue('--orange-card');

    useEffect(() => {
        const loadData = async () => {
            if (session.user.config.cardsSet === "app") {
                const progressData = await getGameData(session.user._id, "progress");
                let acc = 0;
                for (const card of progressData.progress) {
                    acc = acc + card.level
                }
                setPercentage(100 * acc / (7 * progressData.progress.length))
            } else {
                const cards = await getMyCards(session.user._id);
                if (cards.length === 0) {
                    setPercentage(0);
                } else {
                    let acc = 0;
                    for (const card of cards) {
                        acc = acc + card.level
                    }
                    setPercentage(100 * acc / (7 * cards.length))
                }
            }
        }

        loadData();
    }, [])

    return (
        <div className='h-28 mt-2 flex items-center justify-center gap-2'>
            {percentage != null ? 
                <>
                    <div className='w-28'>
                        <CircularProgressbar value={percentage} text={`${percentage.toFixed(2)}%`} background backgroundPadding={6} styles={buildStyles({ backgroundColor: cardColorOrange, textColor: "#fff", pathColor: "#fff", trailColor: "transparent" , strokeLinecap: 'round'})} /> 
                    </div>
                    <p>Gesamtfortschritt</p>
                </>
                : <Spinner className="h-10 w-10" />}
        </div>

    );
};

export default CardsProgress;