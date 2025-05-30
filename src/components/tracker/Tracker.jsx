import { useEffect, useState } from "react";
import TrackerGrid from "./TrackerGrid";
import { getGameData } from "@/libs/data";
import { useSession } from "next-auth/react";
import { Spinner } from "@material-tailwind/react";
import TrackerData from "./TrackerData";


const Tracker = () => {

    const {data:session} = useSession();
    const [streak, setStreak]  = useState(null);
    const [streakFull, setStreakFull]  = useState(null);



    useEffect(()=>{
        const loadData = async ()=>{
            const data = await getGameData(session.user._id, "streak");

            const gridDays = new Array(119);
            const streakReverse = data.progress.toReversed();
            streakReverse.pop();
            setStreakFull(streakReverse);

            for (let i = 0; i < gridDays.length; i++) {
                gridDays[i] = { date: new Date(), cardsPlayed: 0 };
                gridDays[i].date = new Date(gridDays[i].date.setDate(gridDays[i].date.getDate() - i));
            }

            gridDays.forEach((gridDay) => {
                for (let i = 0; i < streakReverse.length; i++) {

                    const streakDayDate = new Date(streakReverse[i].dayPlayed);
                    const gridDayDate = new Date(gridDay.date);

                    if(streakDayDate<gridDays[gridDays.length-1].date){
                        break;
                    }

                    if( gridDayDate.getFullYear() == streakDayDate.getFullYear() & gridDayDate.getDate() == streakDayDate.getDate() & gridDayDate.getMonth() == streakDayDate.getMonth() ){
                        gridDay.cardsPlayed = streakReverse[i].cardsPlayed;
                        break;
                    }
                }
            })
            setStreak(gridDays);
        }

        loadData()
        
    },[])
    
    return(
        <>
            {streak ? <> <TrackerGrid streak={streak}/> <TrackerData streakFull={streakFull} streak ={streak}/> </>: <Spinner className="h-10 w-10" />} 
        </>
    );
}

export default Tracker;