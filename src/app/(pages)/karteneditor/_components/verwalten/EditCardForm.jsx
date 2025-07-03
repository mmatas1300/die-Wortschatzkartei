import { useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { cardListContext } from '@/app/(pages)/karteneditor/_components/verwalten/CardsListRow';
import { updateCard } from '@/libs/getFormCardData';
import { nounFields, nounPluralFields, verbFields, nounMFFields, genericFields } from '@/app/(pages)/karteneditor/_components/verwalten/fields';
import { updateUserCard } from '@/libs/FetchAPI';
import { useCardForm } from '@/hooks/useCardForm';
import LoadingButton from '@/components/LoadingButton';
import { hexColor } from '@/utils/hexColors';
import { AlertMessageContext } from '@/contexts/AlertMessageContext';

const EditCardForm = () => {

    const { card, setRefresh, refresh } = useContext(cardListContext);
    const {showNotification} = useContext(AlertMessageContext);
    const [buttonLoading, setButtonLoading] = useState(false);
    const { formFields, formColor, setForm } = useCardForm(null)
    const { data: session } = useSession();
    const purpleMF = "bg-["+ hexColor.purpleMFCard +"]";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonLoading(true);
        try {
            const formData = new FormData(e.currentTarget)
            const newCard = updateCard(formData, card);
            await updateUserCard(session.user._id, newCard);
            showNotification("Die Karte wurde aktualisiert", hexColor.greenCard)
        } catch (error) {
            showNotification(error.message,hexColor.redCard);
        }
        setButtonLoading(false);
        setRefresh(!refresh)
    }

    useEffect(() => {
        const chooseForm = () => {
            switch (card.type) {
                case "NeuterNoun":
                    setForm(nounFields(card), "bg-green-card");
                    break;
                case "MasculineNoun":
                    setForm(nounFields(card), "bg-blue-card");
                    break;
                case "FeminineNoun":
                    setForm(nounFields(card), "bg-red-card");
                    break;
                case "PluralNoun":
                    setForm(nounPluralFields(card), "bg-yellow-card");
                    break;
                case "MFNoun":
                    setForm(nounMFFields(card), purpleMF); 
                    break;
                case "Verb":
                    setForm(verbFields(card), "bg-orange-card");
                    break;
                default:
                    setForm(genericFields(card), "bg-purple-card");
                    break;
            }
        };
        chooseForm();
    }, [])

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className={` w-[268px] lg:w-[640px] rounded-br-3xl rounded-bl-3xl rounded-tl-lg rounded-tr-3xl z-10 ${formColor}`}>
                <form onSubmit={handleSubmit} className="flex flex-col justify-normal items-center mx-6 lg:mx-12 mt-8 mb-5">
                    {formFields}
                    <LoadingButton isLoading={buttonLoading} buttonStyle='bg-black-card'>Speichern</LoadingButton>
                </form>
            </div>
        </div>
    );
};

export default EditCardForm;