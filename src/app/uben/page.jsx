'use client'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import PlayScreen from "@/components/PlayScreen";

function UbenPage() {

    const { data: session, status } = useSession();
    const [statistics, setStatistics] = useState({ progress: [], lastPlay: 0 });
    const [startPlay, setStartPlay] = useState(false);


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
    }

    useEffect(() => {//Config Inicial
        const loadData = async () => {
            if (status === "authenticated") {
                await getStats() //Trae stats<
            }
        }
        loadData();
    }, [status])

    return (
        <div className="flex flex-col justify-center items-center mt-12">
            {status === "authenticated" ?
                (startPlay ?
                    (<PlayScreen stats={statistics} />) : 
                    ((Date.now() - statistics.lastPlay) > 86_400_000 ? 
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