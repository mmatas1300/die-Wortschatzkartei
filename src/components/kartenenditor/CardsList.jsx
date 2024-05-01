import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CardsListRow from "./CardsListRow";
import { RefreshCcw } from 'lucide-react';

export const CardList = () => {

    const { data: session, status } = useSession();
    const [cards, setCards] = useState([]);
    const [refresh,setRefresh] = useState(false);

    useEffect(() => {
        const getMycards = async () => {
            const response = await fetch('/api/user/cards', {
                method: "POST", // 
                body: JSON.stringify({ email: session.user.email }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const myCards = await response.json()
            setCards(myCards);
        }

        if (status === "authenticated")
            getMycards();

    }, [status,refresh])

    return (
        <div className="flex flex-col justify-center items-center my-12">
            <h2 className="-mb-8">Karten verwalten</h2>
            <div className={`self-end flex flex-row me-8`}>
                <button onClick={()=>{setRefresh(!refresh)}} className={`bg-black-card p-2 z-0 rounded-none rounded-t-lg transition duration-200 hover:scale-105 hover:bg-yellow-card px-3`}><RefreshCcw/></button>
            </div>
            <div className="bg-black-card rounded-3xl w-96 lg:w-[640px] flex flex-col justify-center items-center p-4 z-10">
                <div className="flex flex-row w-full">
                    <div className="w-20 mx-1 text-base text-center  hidden lg:block">Typ</div>
                    <div className="w-28 mx-1 flex-1 text-base text-center">Wort</div>
                    <div className="w-20 mx-1 text-base text-center me-4 lg:me-0">Bild</div>
                    <div className="w-28 mx-1 text-base text-center hidden lg:block">Übersetzung</div>
                    <div className="w-6 mx-2" />
                    <div className="w-6 mx-2" />
                    <div className="w-6 mx-2 me-4" />
                </div>

                {cards.length != 0 ? (<>{cards.map((card) => <CardsListRow key={card._id} card={card} />)}</>) : (<h2 className="mt-6">Oh, es ist leer</h2>)}
            </div>
        </div>
    );
};