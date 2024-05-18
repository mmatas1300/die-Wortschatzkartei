import { useState } from 'react'
import { Spinner } from "@material-tailwind/react";
import { useSession } from 'next-auth/react'
import { createCard } from '@/libs/getFormCardData';
import { verbFields, nomenMUFFields, nomenFields, nomenFieldsPl, andereFields } from '@/app/ui/kartenenditor/create/fields';
import { createAppCard, createMyCard } from '@/libs/data';

const CreateCardForm = () => {

    const fertigButton = (<button className='bg-black-card'>Fertig</button>);
    const [buttonState, setButtonState] = useState(fertigButton);

    const { data: session } = useSession();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonState(<Spinner className="mt-2.5 h-10 w-10" />);
        const formData = new FormData(e.currentTarget)
        const card = createCard(formData);

        if (session.user.email === "mmatas1300@gmail.com") {
            const data = await createAppCard(card, session.user._id);
            if (data) {
                setButtonState(<div className="mt-2.5 h-10">{data.message}</div>);
                setTimeout(function () {
                    setButtonState(fertigButton)
                }, 1500);
            } else {
                setButtonState(<div className="mt-2.5 h-10">Karte hinzugefügt!</div>);
                setTimeout(function () {
                    setButtonState(fertigButton);
                    if (card.type === "Nomen-das" || card.type === "Nomen-der" || card.type === "Nomen-die" || card.type === "Nomen-pl") setForm(nomenFields((handleGender)), "bg-green-card")
                    e.target.reset();
                }, 1500);
            }
        }
        else{
            const data = await createMyCard(session.user._id, card);
            if (data) {
                setButtonState(<div className="mt-2.5 h-10">{data.message}</div>);
                setTimeout(function () {
                    setButtonState(fertigButton)
                }, 1500);
            } else {
                setButtonState(<div className="mt-2.5 h-10">Karte hinzugefügt!</div>);
                setTimeout(function () {
                    setButtonState(fertigButton);
                    if (card.type === "Nomen-das" || card.type === "Nomen-der" || card.type === "Nomen-die" || card.type === "Nomen-pl") setForm(nomenFields((handleGender)), "bg-green-card")
                    e.target.reset();
                }, 1500);
            }
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
                <form onSubmit={handleSubmit} className="flex flex-col justify-normal items-center mx-12 mt-12 mb-5">
                    {typeFields}
                    {buttonState}
                </form>
            </div>

        </div>
    );
};

export default CreateCardForm;