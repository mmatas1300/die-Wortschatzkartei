import { useContext, useEffect, useState } from "react";
import TrackerGrid from "./TrackerGrid";
import { getUserStreak } from "@/libs/FetchAPI";
import { useSession } from "next-auth/react";
import { Spinner } from "@material-tailwind/react";
import TrackerData from "./TrackerData";
import { AlertMessageContext } from "@/contexts/AlertMessageContext";


const Tracker = () => {

    const { data: session } = useSession();
    const [streak, setStreak] = useState(null);
    const [streakFull, setStreakFull] = useState(null);
    const {showNotification} = useContext(AlertMessageContext);



    useEffect(() => {
        const loadData = async () => {
            try {
                const resp = await getUserStreak(session.user._id);
                const gridDays = new Array(119);
                const streakReverse = resp.userStreak.toReversed();
                streakReverse.pop();
                setStreakFull(streakReverse);
                for (let i = 0; i < gridDays.length; i++) {
                    gridDays[i] = { date: new Date(), cardsPlayed: 0 };
                    gridDays[i].date = new Date(gridDays[i].date.setDate(gridDays[i].date.getDate() - i));
                }
                gridDays.forEach((gridDay) => {
                    for (let i = 0; i < streakReverse.length; i++) {

                        const streakDayDate = new Date(streakReverse[i].lastPlayedDate);
                        const gridDayDate = new Date(gridDay.date);

                        if (streakDayDate < gridDays[gridDays.length - 1].date) {
                            break;
                        }

                        if (gridDayDate.getFullYear() == streakDayDate.getFullYear() & gridDayDate.getDate() == streakDayDate.getDate() & gridDayDate.getMonth() == streakDayDate.getMonth()) {
                            gridDay.cardsPlayed = streakReverse[i].cardsPlayed;
                            break;
                        }
                    }
                })
                setStreak(gridDays);
            } catch (error) {
                showNotification(error.message)
            }
        }
        loadData()
    }, [])

    return (
        <>
            {streak ? <> <TrackerGrid streak={streak} /> <TrackerData streakFull={streakFull} streak={streak} /> </> : <Spinner className="h-10 w-10" />}
        </>
    );
}

export default Tracker;