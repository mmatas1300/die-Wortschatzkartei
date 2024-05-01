import { Pencil as PencilIcon, RotateCcw as RotateCcwIcon } from 'lucide-react';
import DeleteMessage from "@/components/kartenenditor/DeleteMessage";
import axios from "axios";
import { useSession } from 'next-auth/react';
import { Spinner } from "@material-tailwind/react";
import { createContext, useState } from 'react';
import UpdateMessage from './UpdateMessage';

export const cardContext = createContext();


const CardsListRow = ({ card }) => {

    const { data: session } = useSession();
    const [cardState, setCardState] = useState(true);


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

    const selectType = (type) => {
        if (type === "Nomen-das" || type === "Nomen-der" || type === "Nomen-die" || type === "Nomen-pl" || type === "Nomen-MUF")
            return "Nomen";
        return type
    }

    const deleteCard = async () => {
        try {
            await axios.delete('/api/user/cards', { data: { userId: session.user._id, cardId: card._id } })
            setCardState(false);
        }
        catch (err) {
            console.log(err)
        }


    };



    return (
        cardState ?
            (<div className={`${selectColor(card)} rounded-xl flex flex-row justify-center items-center w-full my-2`}>
                <div className="w-20 mx-1 text-sm text-center hidden lg:block truncate">{selectType(card.type)}</div>
                <div className="w-28 mx-1 flex-1 text-sm text-center truncate">{card.wort}</div>
                <div className="w-20 mx-1 my-2 text-center me-4 lg:me-0"><img className="w-20 rounded-lg m-0" src={card.bild} alt={card.wort} /></div>
                <div className="w-28 mx-1 text-sm text-center truncate hidden lg:block">{card.ubersetzung}</div>
                <div className="w-6 mx-2 active:scale-95 hover:cursor-pointer">
                    <cardContext.Provider value={card}>
                        <UpdateMessage />
                    </cardContext.Provider>

                </div>
                <div className="w-6 mx-2 active:scale-95 hover:cursor-pointer">
                    <RotateCcwIcon />
                </div>
                <div className="w-6 mx-2 me-4 active:scale-95 hover:cursor-pointer">
                    <DeleteMessage id={card._id} deleteCard={deleteCard} />
                </div>
            </div>) : (<></>)
    );
}

export default CardsListRow;