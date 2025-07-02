import { useContext, useState } from 'react'
import { useSession } from 'next-auth/react'
import { createCard } from '@/libs/getFormCardData';
import { verbFields, MFNounFields, nounFields, pluralFields, genericFields } from '@/app/(pages)/karteneditor/_components/editor/fields';
import { updateUserCard } from '@/libs/FetchAPI';
import PonsContainerKarteneditor from '@/components/Pons/PonsContainerKarteneditor';
import { hexColor } from '@/utils/hexColors';
import { useCreateCardForm } from '@/hooks/useCreateCardForm';
import LoadingButton from '@/components/LoadingButton';
import { AlertMessageContext } from '@/contexts/AlertMessageContext';


const CreateCardForm = () => {
    const [buttonLoading, setButtonLoading] = useState(false);
    const { data: session, status } = useSession();
    const { formColor, formFields, setForm } = useCreateCardForm(nounFields(handleColorNoun));
    const { showNotification } = useContext(AlertMessageContext);

    const handleColorNoun = (e) => {
        if (e.target.value === "NeuterNoun") {
            setForm(nounFields(handleColorNoun), "bg-green-card")
        } else if (e.target.value === "MasculineNoun") {
            setForm(nounFields(handleColorNoun), "bg-blue-card")
        } else if (e.target.value === "FeminineNoun") {
            setForm(nounFields(handleColorNoun), "bg-red-card")
        } else if (e.target.value === "PluralNoun") {
            setForm(pluralFields(handleColorNoun), "bg-yellow-card")
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonLoading(true);
        try {
            const formData = new FormData(e.currentTarget)
            const card = createCard(formData);
            await updateUserCard(session.user._id, card);
            showNotification("Karte hinzugefügt!", hexColor.redCard);
            setTimeout(function () {
                if (card.type === "NeuterNoun" || card.type === "MasculineNoun" || card.type === "FeminineNoun" || card.type === "PluralNoun") setForm(nounFields((handleColorNoun)), "bg-green-card")
                e.target.reset();
            }, 1500);
        } catch (error) {
            showNotification(error.message, hexColor.redCard);
        }
        setButtonLoading(false);
    }


    return (
        <div className='flex flex-col justify-center items-center mt-4'>
            <h2>Neue Karte erstellen</h2>
            <div className={`self-start flex flex-row ms-2`}>
                <button onClick={() => { setForm(nounFields(handleColorNoun), "bg-green-card") }} className={`bg-black-card p-2 z-0 rounded-none rounded-t-lg transition duration-200 hover:scale-105 hover:bg-yellow-card`}>Nomen</button>
                <button onClick={() => { setForm(verbFields, "bg-orange-card") }} className='bg-black-card p-2 z-0 rounded-none rounded-t-lg transition duration-200 hover:scale-105 hover:bg-yellow-card'>Verb</button>
                <button onClick={() => { setForm(MFNounFields, "bg-gradient-to-r from-blue-card to-red-card") }} className='bg-black-card p-2 z-0 rounded-none rounded-t-lg transition duration-200 hover:scale-105 hover:bg-yellow-card'>Gleichstellungsnomen</button>
                <button onClick={() => { setForm(genericFields, "bg-purple-card") }} className='bg-black-card p-2 z-0 rounded-none rounded-t-lg transition duration-200 hover:scale-105 hover:bg-yellow-card'>Andere Wort</button>
            </div>
            <div className={`w-96 lg:w-[640px] rounded-br-3xl rounded-bl-3xl rounded-tl-lg rounded-tr-3xl z-10 ${formColor}`}>
                {status == "authenticated" && session.user.config.ponsSecret ?
                    <PonsContainerKarteneditor />
                    : <></>}
                <form onSubmit={handleSubmit} className="flex flex-col justify-normal items-center mx-12 mt-6 mb-5">
                    {formFields}
                    <LoadingButton isLoading={buttonLoading} buttonStyle='bg-black-card'>Fertig</LoadingButton>
                </form>
            </div>
        </div>
    );
};

export default CreateCardForm;