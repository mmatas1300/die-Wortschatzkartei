import { useContext, useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { useSession } from 'next-auth/react';
import PonsCard from '@/components/Pons/PonsCard';
import SearchForm from '@/components/SearchForm';
import Image from 'next/image';
import { SquareX as SquareXIcon } from 'lucide-react';
import { getPonsInfo } from "@/libs/FetchAPI";
import { AlertMessageContext } from "@/contexts/AlertMessageContext";
import { hexColor } from "@/utils/hexColors";

const PonsContainerKarteneditor = () => {

    const { data: session } = useSession();
    const [buttonState, setButtonState] = useState(false);
    const [wordData, setWordData] = useState(null);
    const {showNotification} = useContext(AlertMessageContext);

    const searchPons = async (e) => {
        e.preventDefault();
        setButtonState(true);
        try {
            setWordData("loading");
            const formData = new FormData(e.currentTarget);
            const query = formData.get("search");
            setWordData(await getPonsInfo(session.user._id, query));
        } catch (error) {
            showNotification(error.message,hexColor.redCard);
        }
        setButtonState(false);
    }

    return (
        <div className="flex flex-col justify-normal items-center mx-12 mt-12">
            <Image src={"/imgs/PonsLogo.png"} alt={"Pons Logo"} width={50} height={19} className='mb-1' />
            <SearchForm handleSubmit={searchPons} buttonState={buttonState} style={"w-full max-w-md mx-4 mt-4"} />
            {
                wordData ?
                    wordData === "loading" ?
                        <div className={`bg-black-card p-3 rounded-xl max-w-64`}>
                            <Spinner className="h-6 w-6" />
                        </div> :
                        <div className="flex">
                            <div onClick={() => setWordData(null)} className="hover:cursor-pointer">
                                <SquareXIcon />
                            </div>
                            <div className={`bg-black-card p-3 rounded-xl rounded-tr-md rounded-br-3xl w-64 lg:w-80`}>
                                <PonsCard wordData={wordData} />
                            </div>
                        </div> : <></>
            }
        </div>
    );
}

export default PonsContainerKarteneditor;