import { useContext, useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { useSession } from 'next-auth/react';
import PonsCard from '@/components/Pons/PonsCard';
import { getPonsInfo } from "@/libs/FetchAPI";
import { AlertMessageContext } from "@/contexts/AlertMessageContext";
import { hexColor } from "@/utils/hexColors";

const PonsContainerCard = ({ word }) => {

    const { data: session } = useSession();
    const [wordData, setWordData] = useState(null);
    const {showNotification} = useContext(AlertMessageContext);

    useEffect(async () => {
        try {
            const data = await getPonsInfo(session.user._id, word);
            setWordData(data);
        } catch (error) {
            showNotification(error.message,hexColor.redCard);
        }
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
                    </div>
            }
        </>

    );
}

export default PonsContainerCard;