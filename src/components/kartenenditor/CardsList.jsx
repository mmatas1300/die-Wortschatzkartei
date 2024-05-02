import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CardsListRow from "./CardsListRow";
import { RefreshCcw } from 'lucide-react';

export const CardList = () => {

    const { data: session, status } = useSession();
    const [cards, setCards] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const handleSuchen = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)//extraer datos del form
        const mySearch = formData.get("search");
        const regExp = new RegExp(`.*${mySearch.toLowerCase()}.*`);
        const filterCards = cards.filter((card) => { return regExp.test(card.wort.toLowerCase()) })
        setCards(filterCards);
    };

    useEffect(() => {
        const getMycards = async () => {
            const response = await fetch('/api/user/cards', {
                method: "POST", // 
                body: JSON.stringify({ userId: session.user._id }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const myCards = await response.json()
            setCards(myCards);
        }
        if (status === "authenticated")
            getMycards();

    }, [status, refresh])

    return (
        <div className="my-12">
            <h2 className="text-center my-2">Karten verwalten</h2>
            <div className="flex flex-col justify-center items-center bg-red-card p-1 rounded-3xl">
                <form onSubmit={handleSuchen} className="w-60 lg:w-full max-w-md -ms-10 mt-4 -mb-16 p-4 rounded-xl bg-black-card">
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-red-card" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input required type="search" name="search" id="default-search" className="block w-full p-4 ps-10 text-sm" />
                        <button type="submit" className="absolute end-2.5 bottom-2 bg-green-card cursor-pointer px-4 py-2">
                            Suchen
                        </button>
                    </div>
                </form>

                <div className={`self-end flex flex-row me-8`}>
                    <button onClick={() => { setRefresh(!refresh) }} className={`bg-black-card p-2 z-0 rounded-none rounded-t-lg transition duration-200 hover:scale-105 hover:bg-yellow-card px-3`}><RefreshCcw /></button>
                </div>
                <div className="bg-black-card rounded-3xl w-96 lg:w-[640px] flex flex-col justify-center items-center p-4 z-10">
                    <div className="flex flex-row w-full">
                        <div className="w-20 mx-1 text-base text-center">Stufe</div>
                        <div className="w-28 mx-1 flex-1 text-base text-center">Wort</div>
                        <div className="w-20 mx-1 text-base text-center me-4 lg:me-0 hidden lg:block">Bild</div>
                        <div className="w-28 mx-1 text-base text-center hidden lg:block">Übersetzung</div>
                        <div className="w-6 mx-2" />
                        <div className="w-6 mx-2" />
                        <div className="w-6 mx-2 me-4" />
                    </div>

                    {cards.length != 0 ? (<>{cards.map((card) => <CardsListRow key={card._id} card={card} setRefresh={setRefresh} refresh={refresh} />)}</>) : (<h2 className="mt-6">Oh, es ist leer</h2>)}
                </div>
            </div>
        </div>
    );
};