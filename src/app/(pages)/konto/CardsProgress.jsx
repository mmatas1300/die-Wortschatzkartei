import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react';
import { getUserProgressAppCards, getUserCards } from "@/libs/data";
import { Spinner } from "@material-tailwind/react";


const CardsProgress = () => {

    const { data: session, status } = useSession();
    const [percentage, setPercentage] = useState(null);
    const cardColorOrange = getComputedStyle(document.documentElement).getPropertyValue('--orange-card');

    useEffect(() => {
        const loadData = async () => {
            if (session.user.config.cardsSet === "app") {
                const progressData = await getUserProgressAppCards(session.user._id);
                let acc = 0;
                for (const card of progressData.progress) {
                    acc = acc + card.level
                }
                setPercentage(100 * acc / (7 * progressData.progress.length))
            } else {
                const cards = await getUserCards(session.user._id);
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
        <div className='h-28 mb-10'>
            {percentage != null ? 
                <div className='bg-green-card flex flex-row items-center justify-center gap-2 rounded-3xl rounded-tr-md py-2 px-4'>
                    <div className='w-28'>
                        <CircularProgressbarWithChildren value={percentage} background backgroundPadding={6} styles={buildStyles({backgroundColor: cardColorOrange, textColor: "#000", pathColor: "#fff", trailColor: "transparent" , strokeLinecap: 'round'})}>
                            {`${percentage.toFixed(0)}%`}
                        </CircularProgressbarWithChildren> 
                    </div>
                    <p>Gesamtfortschritt</p>
                </div>
                : <Spinner className="h-10 w-10" />}
        </div>

    );
};

export default CardsProgress;