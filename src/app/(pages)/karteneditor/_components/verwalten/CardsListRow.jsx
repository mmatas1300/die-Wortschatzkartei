import { useSession } from 'next-auth/react';
import { createContext } from 'react';
import CircularChart from "@/components/CircularChart";
import 'react-circular-progressbar/dist/styles.css';
import ResetMessage from '@/app/(pages)/karteneditor/_components/verwalten/ResetMessage';
import { resetAppCardProgress, deleteUserCard, updateUserCard } from "@/libs/FetchAPI";
import { selectColorCard } from "@/libs/selectColorCards";
import UpdateMessage from '@/app/(pages)/karteneditor/_components/verwalten/UpdateMessage';
import DeleteMessage from '@/app/(pages)/karteneditor/_components/verwalten/DeleteMessage';

export const cardListContext = createContext();

const CardsListRow = ({ card, setRefresh, refresh }) => {

    const { data: session } = useSession();


    const appCardResetLevel = async () => {
        await resetAppCardProgress(session.user._id, card._id)
        setRefresh(!refresh);
    };

    const userCardDeleteCard = async () => {
        await deleteUserCard(session.user._id, card._id);
        setRefresh(!refresh);
    };

    const userCardResetLevel = async () => {
        await updateUserCard(session.user._id, { ...card, level: 0, practiceDate: new Date("2000") });
        setRefresh(!refresh);
    };

    return (
        <div className={`${selectColorCard(card.type)} rounded-xl flex flex-row justify-center items-center w-full my-2 py-1`}>
            <div className="w-14 h-14 mx-4 text-sm flex flex-row justify-center items-center my-2 lg:my-0">{<CircularChart level={card.level} type={card.type} />}</div>
            <div className="w-28 mx-1 flex-1 text-sm text-center truncate">{card.wort}</div>

            {session.user.config.cardsSet == "app" ?
                (<>
                    <div className="w-36 mx-1 text-sm text-center truncate hidden lg:block">{card.ubersetzung}</div>
                    <div className="w-6 mx-2 mr-10 active:scale-95 hover:cursor-pointer">
                        <ResetMessage resetLevel={appCardResetLevel} />
                    </div>
                </>) :
                (<>
                    <div className="w-28 mx-1 text-sm text-center truncate hidden lg:block">{card.ubersetzung}</div>
                    <div className="w-6 mx-2 active:scale-95 hover:cursor-pointer">
                        <cardListContext.Provider value={{ card, setRefresh, refresh }}>
                            <UpdateMessage />
                        </cardListContext.Provider>
                    </div>
                    <div className="w-6 mx-2 active:scale-95 hover:cursor-pointer">
                        <ResetMessage resetLevel={userCardResetLevel} />
                    </div>
                    <div className="w-6 mx-2 me-4 active:scale-95 hover:cursor-pointer">
                        <DeleteMessage deleteCard={userCardDeleteCard} />
                    </div>
                </>)
            }
        </div>
    );
}

export default CardsListRow;