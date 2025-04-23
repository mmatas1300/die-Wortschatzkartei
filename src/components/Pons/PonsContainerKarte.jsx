import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { useSession } from 'next-auth/react';
import PonsCard from '@/components/Pons/PonsCard';
import findWord from "./findWord";

const PonsContainerKarte = ({ wort }) => {

    const { data: session } = useSession();

    const [wordData, setWordData] = useState(null)

    useEffect(() => {
        findWord(session.user._id,wort).then((data)=>{setWordData(data)});
    }, [])

    return (
        <>
            {
                wordData ?
                    <div className={`bg-black-card p-3 rounded-xl rounded-tr-md rounded-br-3xl w-64 absolute top-full z-10 left-0 -translate-y-1`}>                    
                        <PonsCard wordData={wordData} />
                    </div>

                    :
                    <div className={`bg-black-card p-3 rounded-xl max-w-64 absolute top-full z-10 left-0 -translate-y-1`}>
                        <Spinner className="h-6 w-6" />
                    </div>}
        </>

    );
}

export default PonsContainerKarte;