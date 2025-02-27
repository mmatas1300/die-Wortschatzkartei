import { useEffect, useState } from "react";
import TrackerGrid from "./TrackerGrid";
import { getGameData } from "@/libs/data";
import { useSession } from "next-auth/react";

const Tracker = () => {

    const {data:session} = useSession();
    const [streak, setStreak]  = useState([]);


    useEffect(()=>{
        const loadData = async ()=>{
            const data = await getGameData(session.user._id, "streak");
            setStreak(data.progress);
        }

        loadData()
        
    },[])

    
    
    return(
        <div className="bg-orange-900">

            <TrackerGrid streak={streak}/>

        </div>
    );
}

export default Tracker;