import DeleteMessage from "@/app/ui/karteneditor/meineKarte/DeleteMessage";
import { useSession } from 'next-auth/react';
import { createContext } from 'react';
import UpdateMessage from '@/app/ui/karteneditor/meineKarte/UpdateMessage';
import 'react-circular-progressbar/dist/styles.css';
import ResetMessage from '@/app/ui/karteneditor/ResetMessage';
import { deleteMyCard, resetMyCardLevel } from "@/libs/data";
import { selectColorCard } from "@/libs/selectColorCards";
import CircularChart from "@/components/karteneditor/CircularChart";

export const cardListContext = createContext();

const CardsListRow = ({ card, setRefresh, refresh }) => {

    const { data: session } = useSession();

    const deleteCard = async () => {
        await deleteMyCard(session.user._id, card._id);
        setRefresh(!refresh);
    };

    const resetLevel = async () => {
        await resetMyCardLevel(session.user._id, card);
        setRefresh(!refresh);
    };

    return (
        <div className={`${selectColorCard(card.type)} rounded-xl flex flex-row justify-center items-center w-full my-2 py-1`}>
            <div className="w-14 h-14 mx-4 text-sm flex flex-row justify-center items-center my-2 lg:my-0">{<CircularChart level={card.level} type={card.type} />}</div>
            <div className="w-28 mx-1 flex-1 text-sm text-center truncate">{card.wort}</div>
            <div className="w-28 mx-1 text-sm text-center truncate hidden lg:block">{card.ubersetzung}</div>
            <div className="w-6 mx-2 active:scale-95 hover:cursor-pointer">
                <cardListContext.Provider value={{ card, setRefresh, refresh }}>
                    <UpdateMessage />
                </cardListContext.Provider>
            </div>
            <div className="w-6 mx-2 active:scale-95 hover:cursor-pointer">
                <ResetMessage resetLevel={resetLevel} />
            </div>
            <div className="w-6 mx-2 me-4 active:scale-95 hover:cursor-pointer">
                <DeleteMessage deleteCard={deleteCard} />
            </div>
        </div>
    );
}

export default CardsListRow;