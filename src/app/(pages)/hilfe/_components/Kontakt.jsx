"use client"
import { useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { sendEmail } from "@/services/FetchAPI";
import emailTemplate from "@/utils/emailTemplate";
import { useWarningMessage } from "@/hooks/useNotification";
import AutohideSnackbar from "@/components/Snackbar";
import { hexColor } from "@/utils/colors";


const Kontakt = () => {

    const [buttonState, setButtonstate] = useState(<button>Nachricht senden</button>);
    const [warningMessage, warningTrigger, warningColor, setWarningMessage] = useWarningMessage();

    const submit = async (e) => {
        e.preventDefault();
        setButtonstate(<Spinner className="mt-2.5 h-[41px] w-[41px]" />)
        const formData = new FormData(e.currentTarget)
        const email = emailTemplate(formData.get('name'),formData.get('email'),formData.get('message'))
        const res = sendEmail(email);
        if (res)
			setWarningMessage("Nachricht gesendet!", hexColor.greenCard);
		else
        setWarningMessage("Fehler, versuchen Sie es später nochmal!", hexColor.redCard);
        setButtonstate(<button>Nachricht senden</button>)
    }

    return (
        <div className="flex flex-col justify-center items-center mt-16">
            <AutohideSnackbar message={warningMessage} color={warningColor} trigger={warningTrigger}/>
            <div className="bg-orange-card mt-4 rounded-3xl lg:rotate-6">
                <div className="bg-red-card rounded-3xl rounded-tr-[60px] overflow-hidden w-screen max-w-[430px] lg:-rotate-6">
                    <form onSubmit={submit} className="flex flex-col justify-center items-center w-80 py-7 m-auto">
                        <h1>Kontakt</h1>
                        <h1 className="text-lg mb-2">Sie möchten mit uns in Kontakt treten?</h1>
                        <label htmlFor="name" className="self-start">Name:</label>
                        <input type="text" placeholder="Name" name="name" required />
                        <label htmlFor="email">E-Mail-Adresse:</label>
                        <input type="email" placeholder="E-Mail-Adresse" name="email" required />
                        <label htmlFor="message">Nachricht:</label>
                        <textarea name="message" id="message" cols="30" rows="10" placeholder='Wir freuen uns über Ihre Nachricht' required></textarea>
                        {buttonState}
                    </form>
                </div>
            </div>
        </div>)
};

export default Kontakt;