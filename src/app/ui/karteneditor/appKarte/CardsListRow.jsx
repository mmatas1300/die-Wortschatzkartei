import { useSession } from 'next-auth/react';
import { createContext } from 'react';
import CircularChart from "@/components/karteneditor/CircularChart";
import 'react-circular-progressbar/dist/styles.css';
import ResetMessage from '@/app/ui/karteneditor/ResetMessage';
import {resetAppProgress} from "@/libs/data";
import { selectColorCard } from "@/libs/selectColorCards";

export const cardListContext = createContext();

const CardsListRow = ({ card, setRefresh, refresh }) => {

    const { data: session } = useSession();


    const resetLevel = async () => {
        await resetAppProgress(session.user._id, card._id)
        setRefresh(!refresh);
    };

    return (
        <div className={`${selectColorCard(card.type)} rounded-xl flex flex-row justify-center items-center w-full my-2 py-1`}>
            <div className="w-14 h-14 mx-4 text-sm flex flex-row justify-center items-center my-2 lg:my-0">{<CircularChart level={card.level} type={card.type} />}</div>
            <div className="w-28 mx-1 flex-1 text-sm text-center truncate">{card.wort}</div>

            <div className="w-36 mx-1 text-sm text-center truncate hidden lg:block">{card.ubersetzung}</div>
            <div className="w-6 mx-2 mr-10 active:scale-95 hover:cursor-pointer">
                <ResetMessage resetLevel={resetLevel} />
            </div>
        </div>
    );
}

export default CardsListRow;