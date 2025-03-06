"use client"
import { useState } from "react";
import { Spinner } from "@material-tailwind/react";
import EmailTemplate from "./EmailTemplate";


const Kontakt = () => {

    const [buttonState, setButtonstate] = useState(<button>Nachricht senden</button>);

    const submit = async (e) => {
        e.preventDefault();
        setButtonstate(<Spinner className="mt-2.5 h-[41px] w-[41px]" />)
        const formData = new FormData(e.currentTarget)
        const email = EmailTemplate(formData.get('name'),formData.get('email'),formData.get('message'))
        try {
            const res = await fetch('/api/kontakt',{
                method: "POST",
                body: JSON.stringify({message: email}),
                headers: {"Content-type": "application/json"}
            });
            if(res.ok)
                setButtonstate(<p className="mt-2.5 h-[41px]">Nachricht gesendet!</p>)
            else
                setButtonstate(<p className="mt-2.5 h-[41px]">Fehler, versuchen Sie es später nochmal!</p>)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center mt-16">
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