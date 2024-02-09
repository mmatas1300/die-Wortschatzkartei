'use client'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import PlayScreen from "@/components/PlayScreen";

function UbenPage() {

    const { data: session, status } = useSession();
    const [statistics, setStatistics] = useState();
    const [startPlay, setStartPlay] = useState(false);
    const [isTimeToPlay, setIsTimeToPlay] = useState(false);


    const getStats = async () => {
        const responseStatistics = await fetch('/api/user/progress', {
            method: "POST", // 
            body: JSON.stringify({ email: session.user.email }), // 
            headers: {
                "Content-Type": "application/json",
            },
        });
        const dataStatistics = await responseStatistics.json();
        setStatistics(dataStatistics)
        return dataStatistics;
    }

    useEffect(() => {//Config Inicial
        const loadData = async () => {
            if (status === "authenticated") {
                const stats = await getStats() //Trae stats<
                const lastPlay = new Date(stats.lastPlay)
                const now = new Date()
                if(lastPlay<now){
                    setIsTimeToPlay(true)
                }
            }
        }
        loadData();
    }, [status])

    return (
        <div className="flex flex-col justify-center items-center mt-12">
            {statistics ?
                (startPlay ?
                    (<PlayScreen stats={statistics} />) :
                    (isTimeToPlay ?
                        (<>
                            <div>
                                <div>Es ist Zeit zu üben!</div>
                                <button onClick={() => { setStartPlay(true) }}>Weiter</button>
                            </div>
                        </>) :
                        (<div>Für heute reicht das Üben!</div>)
                    )
                )
                : (<Spinner className="mt-2.5 h-10 w-10" />)}






        </div>
    );


}

export default UbenPage