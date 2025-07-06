"use client"
import { useContext, useState } from "react";
import { sendEmail } from "@/libs/FetchAPI";
import emailTemplate from "@/utils/emailTemplate";
import { hexColor } from "@/utils/hexColors";
import LoadingButton from "@/components/LoadingButton";
import { AlertMessageContext } from "@/contexts/AlertMessageContext";

const Kontakt = () => {

    const [buttonLoading, setButtonLoading] = useState(false);
    const {showNotification} = useContext(AlertMessageContext);

    const submitForm = async (e) => {
        e.preventDefault();
        setButtonLoading(true)
        const formData = new FormData(e.currentTarget)
        const email = emailTemplate(formData.get('name'),formData.get('email'),formData.get('message'));
        try {
            await sendEmail(email);
            showNotification("Nachricht gesendet!",hexColor.greenCard);
        } catch (error) {
            showNotification(error.message,hexColor.redCard);
        }
        setButtonLoading(false);
    }

    return (
        <div className="flex flex-col justify-center items-center mt-16">
            <div className="bg-orange-card mt-4 rounded-3xl lg:rotate-6">
                <div className="bg-red-card rounded-3xl rounded-tr-[60px] overflow-hidden w-screen max-w-[430px] lg:-rotate-6">
                    <form id="KontaktForm" onSubmit={submitForm} className="flex flex-col justify-center items-center w-80 py-7 m-auto">
                        <h1>Kontakt</h1>
                        <h1 className="text-lg mb-2">Sie möchten mit uns in Kontakt treten?</h1>
                        <label htmlFor="name" className="self-start">Name:</label>
                        <input type="text" placeholder="Name" name="name" required />
                        <label htmlFor="email">E-Mail-Adresse:</label>
                        <input type="email" placeholder="E-Mail-Adresse" name="email" required />
                        <label htmlFor="message">Nachricht:</label>
                        <textarea name="message" id="message" cols="30" rows="10" placeholder='Wir freuen uns über Ihre Nachricht' required></textarea>
                        <LoadingButton isLoading={buttonLoading}>Nachricht senden</LoadingButton>
                    </form>
                </div>
            </div>
        </div>)
};

export default Kontakt;