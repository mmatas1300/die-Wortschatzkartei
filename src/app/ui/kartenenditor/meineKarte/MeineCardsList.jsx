import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CardsListRow from "@/app/ui/kartenenditor/meineKarte/CardsListRow";
import { RefreshCcw } from 'lucide-react';
import { getMyCards } from "@/libs/data";
import SearchForm from '@/components/SearchForm';

export const MeineCardList = () => {

    const { data: session, status } = useSession();
    const [cards, setCards] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const search = formData.get("search");
        const regExp = new RegExp(`.*${search.toLowerCase()}.*`);
        const filterCards = cards.filter((card) => { return regExp.test(card.wort.toLowerCase()) })
        setCards(filterCards);
    };

    useEffect(() => {
        const init = async ()=>{
            const myCards = await getMyCards(session.user._id); 
            setCards(myCards);
        }
        if (status === "authenticated"){
            init();
        }
    }, [status, refresh])

    return (
        <div className="my-12">
            <h2 className="text-center my-2">Meine Karten verwalten</h2>
            <div className="flex flex-col justify-center items-center bg-red-card p-1 rounded-3xl">
                
                <SearchForm handleSubmit={handleSubmit} buttonState={false} style={"w-60 lg:w-full max-w-md -ms-10 mt-4 -mb-16 p-4 rounded-xl bg-black-card"}/>

                <div className={`self-end flex flex-row me-8`}>
                    <button onClick={() => { setRefresh(!refresh) }} className={`bg-black-card p-2 z-0 rounded-none rounded-t-lg transition duration-200 hover:scale-105 hover:bg-yellow-card px-3`}><RefreshCcw /></button>
                </div>
                <div className="bg-black-card rounded-3xl w-96 lg:w-[640px] flex flex-col justify-center items-center p-4 z-10 mb-3">
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