import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { useSession } from 'next-auth/react'
import { useContext, useEffect, useState } from 'react';
import { getUserProgressAppCards, getUserCards } from "@/libs/FetchAPI";
import { Spinner } from "@material-tailwind/react";
import { hexColor } from '@/utils/hexColors';
import { AlertMessageContext } from '@/contexts/AlertMessageContext';


const CardsProgress = () => {

    const { data: session, status } = useSession();
    const [percentage, setPercentage] = useState(null);
    const cardColorOrange = hexColor.orangeCard;
    const { showNotification } = useContext(AlertMessageContext);

    useEffect(() => {
        const loadData = async () => {
            let cardsProgress;
            try {
                let resp;
                switch (session.user.config.cardsSet) {
                    case "app":
                        resp = await getUserProgressAppCards(session.user._id);
                        cardsProgress = resp.userProgressAppCards;
                        break;
                    case "user":
                        resp = await getUserCards(session.user._id);
                        cardsProgress = resp.cards;
                        break;
                }
                if (cardsProgress.length === 0)
                    setPercentage(0);
                else {
                    let accumulator = 0;
                    for (const card of cardsProgress) {
                        accumulator = accumulator + card.level;
                    }
                    setPercentage(100 * accumulator / (7 * cardsProgress.length));
                }
            } catch (error) {
                showNotification(error.message, hexColor.redCard);
            }
        }
        loadData();
    }, [])

    return (
        <div className='h-28 mb-10'>
            {percentage != null ?
                <div className='bg-green-card flex flex-row items-center justify-center gap-2 rounded-3xl rounded-tr-md py-2 px-4'>
                    <div className='w-28'>
                        <CircularProgressbarWithChildren value={percentage} background backgroundPadding={6} styles={buildStyles({ backgroundColor: cardColorOrange, textColor: "#000", pathColor: "#fff", trailColor: "transparent", strokeLinecap: 'round' })}>
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