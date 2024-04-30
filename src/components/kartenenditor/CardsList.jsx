import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CardsListRow from "./CardsListRow";

export const CardList = () => {

    const { data: session, status } = useSession();
    const [cards, setCards] = useState(null);

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

    }, [status])

    return (
        <>{cards && (
            <div className="bg-black-card rounded-3xl w-96 lg:w-[640px] flex flex-col justify-center items-center mt-8 p-4 my-4">
                <div className="flex flex-row w-full">
                    <div className="w-20 mx-1 text-base text-center  hidden lg:block">Typ</div>
                    <div className="w-28 mx-1 flex-1 text-base text-center">Wort</div>
                    <div className="w-20 mx-1 text-base text-center me-4 lg:me-0">Bild</div>
                    <div className="w-28 mx-1 text-base text-center hidden lg:block">Übersetzung</div>
                    <div className="w-6 mx-2"   />
                    <div className="w-6 mx-2" />
                    <div className="w-6 mx-2 me-4" />
                </div>
            {cards.map((card)=> <CardsListRow key={card._id} card={card} />)}

            </div>)}
        </>
    );
};