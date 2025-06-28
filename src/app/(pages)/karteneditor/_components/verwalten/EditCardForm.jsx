import { useContext, useEffect, useState } from 'react'
import { Spinner } from "@material-tailwind/react";
import { useSession } from 'next-auth/react'
import { cardListContext } from '@/app/(pages)/karteneditor/_components/verwalten/CardsListRow';
import { updateCard } from '@/libs/getFormCardData';
import { nomenFields, nomenFieldsPl, verbFields, nomenMUFFields, andereFields } from '@/app/(pages)/karteneditor/_components/verwalten/fields';
import { updateUserCard } from '@/libs/FetchAPI';

const EditCardForm = () => {

    const { card, setRefresh, refresh } = useContext(cardListContext);
    const { data: session } = useSession();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonState(<Spinner className="mt-2.5 h-[41px] w-[41px]" />);
        const formData = new FormData(e.currentTarget)
        const newCard = updateCard(formData, card.type);
        await updateUserCard(session.user._id, { _id: card._id, ...newCard, level: card.level, practiceDate: card.practiceDate });
        setButtonState(<div className="mt-2.5 h-[41px]">Änderungen gespeichert!</div>);
        setRefresh(!refresh)
    }

    const submitButton = (<button className='bg-black-card'>Speichern</button>)

    const [typeFields, setTypeFields] = useState(null);
    const [typeColor, setTypeColor] = useState("bg-green-card");
    const [buttonState, setButtonState] = useState(submitButton);

    useEffect(() => {
        const chooseForm = () => {
            switch (card.type) {
                case "Nomen-das":
                    setForm(nomenFields(card), "bg-green-card");
                    break;
                case "Nomen-der":
                    setForm(nomenFields(card), "bg-blue-card");
                    break;
                case "Nomen-die":
                    setForm(nomenFields(card), "bg-red-card");
                    break;
                case "Nomen-pl":
                    setForm(nomenFieldsPl(card), "bg-yellow-card");
                    break;
                case "Nomen-MUF":
                    setForm(nomenMUFFields(card), "bg-[#694B72]");
                    break;
                case "Verb":
                    setForm(verbFields(card), "bg-orange-card");
                    break;
                default:
                    setForm(andereFields(card), "bg-purple-card");
                    break;
            }
        };

        const setForm = (fields, color) => {
            setTypeFields(fields);
            setTypeColor(color);
        };

        chooseForm();
    }, [])

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className={` w-[268px] lg:w-[640px] rounded-br-3xl rounded-bl-3xl rounded-tl-lg rounded-tr-3xl z-10 ${typeColor}`}>
                <form onSubmit={handleSubmit} className="flex flex-col justify-normal items-center mx-6 lg:mx-12 mt-8 mb-5">
                    {typeFields}
                    {buttonState}
                </form>
            </div>
        </div>
    );
};

export default EditCardForm;