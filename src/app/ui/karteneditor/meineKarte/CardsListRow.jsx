import DeleteMessage from "@/app/ui/karteneditor/meineKarte/DeleteMessage";
import { useSession } from 'next-auth/react';
import { createContext } from 'react';
import UpdateMessage from '@/app/ui/karteneditor/meineKarte/UpdateMessage';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ResetMessage from '@/app/ui/karteneditor/ResetMessage';
import { deleteMyCard, resetMyCardLevel } from "@/libs/data";

export const cardListContext = createContext();

const CardsListRow = ({ card, setRefresh, refresh }) => {

    const { data: session } = useSession();

    const selectColor = (card) => {
        let color;
        switch (card.type) {
            case "Nomen-das":
                color = "bg-green-card"
                break;
            case "Nomen-der":
                color = "bg-blue-card"
                break;
            case "Nomen-die":
                color = "bg-red-card"
                break;
            case "Nomen-pl":
                color = "bg-yellow-card"
                break;
            case "Verb":
                color = "bg-orange-card"
                break;
            case "Nomen-MUF":
                color = "bg-gradient-to-r from-blue-card to-red-card"
                break;
            default:
                color = "bg-purple-card"
                break;
        }
        return color;
    }

    const deleteCard = async () => {
        await deleteMyCard(session.user._id, card._id);
        setRefresh(!refresh);
    };

    const resetLevel = async () => {
        await resetMyCardLevel(session.user._id, card);
        setRefresh(!refresh);
    };

    return (
        <div className={`${selectColor(card)} rounded-xl flex flex-row justify-center items-center w-full my-2 py-1`}>
            <div className="w-14 h-14 mx-4 text-sm flex flex-row justify-center items-center my-2 lg:my-0">{<CircularProgressbar value={100 * card.level / 7} text={`${(100 * card.level / 7).toFixed()}%`} styles={buildStyles({ textColor: "#fff", pathColor: "#fff", trailColor: "transparent", textSize: '24px' })} />}</div>
            <div className="w-28 mx-1 flex-1 text-sm text-center truncate">{card.wort}</div>
            <div className="w-20 mx-1 my-2 text-center me-4 lg:me-0 hidden lg:block"><img className="w-20 rounded-lg m-0" src={card.bild} alt={card.wort} /></div>
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