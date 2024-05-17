import axios from 'axios'
import { useState } from 'react'
import { Spinner } from "@material-tailwind/react";
import { useSession } from 'next-auth/react'
import { createCard } from '@/libs/createCard';
import { verbFields, nomenMUFFields, nomenFields, nomenFieldsPl, andereFields } from '@/app/ui/kartenenditor/create/fields';

const CreateCardForm = () => {

    const [newCardState, setNewCardState] = useState(<button className='bg-black-card'>Fertig</button>);

    const { data: session } = useSession();

    const handlePostCard = async (e) => {
        e.preventDefault();
        setNewCardState(<Spinner className="mt-2.5 h-10 w-10" />);
        const formData = new FormData(e.currentTarget)
        const card = createCard(formData);
        try {
            if (session.user.email === "mmatas1300@gmail.com") {
                await axios.post('/api/cards', { ...card, userId: session.user._id });
            } else {
                card._id = card.wort + session.user._id + Date.now();
                await axios.put('/api/user/cards', { userId: session.user._id, card: {...card, level:0, practiceDate: new Date("2000")}, update: "add"});
            }
            setNewCardState(<div className="mt-2.5 h-10">Karte hinzugefügt!</div>);
            setTimeout(function () {
                setNewCardState(<button className='bg-black-card'>Fertig</button>);
                if(card.type === "Nomen-das" || card.type === "Nomen-der" || card.type === "Nomen-die" ||card.type === "Nomen-pl") setForm(nomenFields(handleGender), "bg-green-card")
                e.target.reset();
            }, 1500);
        } catch (error) {
            setNewCardState(<div className="mt-2.5 h-10">{error.response.data.message}</div>);
            setTimeout(function () {
                setNewCardState(<button className='bg-black-card'>Fertig</button>)
            }, 1500);
        }
    }

    const handleGender = (e) => {
        if (e.target.value === "Nomen-das") {
            setForm(nomenFields(handleGender), "bg-green-card")
        } else if (e.target.value === "Nomen-der") {
            setForm(nomenFields(handleGender), "bg-blue-card")
        } else if (e.target.value === "Nomen-die") {
            setForm(nomenFields(handleGender), "bg-red-card")
        } else if (e.target.value === "Nomen-pl") {
            setForm(nomenFieldsPl(handleGender), "bg-yellow-card")
        }
    };

    const [typeFields, setTypeFields] = useState(nomenFields(handleGender));
    const [typeColor, setTypeColor] = useState("bg-green-card");

    const setForm = (fields, color) => {
        setTypeFields(fields);
        setTypeColor(color);
    };

    return (
        <div className='flex flex-col justify-center items-center mt-4'>
            <h2>Neue Karte erstellen</h2>
            <div className={`self-start flex flex-row ms-2`}>
                <button onClick={() => { setForm(nomenFields(handleGender), "bg-green-card") }} className={`bg-black-card p-2 z-0 rounded-none rounded-t-lg transition duration-200 hover:scale-105 hover:bg-yellow-card`}>Nomen</button>
                <button onClick={() => { setForm(verbFields, "bg-orange-card") }} className='bg-black-card p-2 z-0 rounded-none rounded-t-lg transition duration-200 hover:scale-105 hover:bg-yellow-card'>Verb</button>
                <button onClick={() => { setForm(nomenMUFFields, "bg-gradient-to-r from-blue-card to-red-card") }} className='bg-black-card p-2 z-0 rounded-none rounded-t-lg transition duration-200 hover:scale-105 hover:bg-yellow-card'>Gleichstellungsnomen</button>
                <button onClick={() => { setForm(andereFields, "bg-purple-card") }} className='bg-black-card p-2 z-0 rounded-none rounded-t-lg transition duration-200 hover:scale-105 hover:bg-yellow-card'>Andere Wort</button>
            </div>
            <div className={`w-96 lg:w-[640px] rounded-br-3xl rounded-bl-3xl rounded-tl-lg rounded-tr-3xl z-10 ${typeColor}`}>
                <form onSubmit={handlePostCard} className="flex flex-col justify-normal items-center mx-12 mt-12 mb-5">
                    {typeFields}
                    {newCardState}
                </form>
            </div>

        </div>
    );
};

export default CreateCardForm;