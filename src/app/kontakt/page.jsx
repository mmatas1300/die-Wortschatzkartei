'use client'
import { useState } from "react";
import { Spinner } from "@material-tailwind/react";

function KontaktPage() {

    const [buttonState, setButtonstate]=useState(<button>Nachricht senden</button>)

    const toggleButton = ()=>{
        setButtonstate(<Spinner className="mt-2.5 h-10 w-10" />)
    }

    return (
        <section className="my-12">
            <div className="flex flex-col justify-center items-center">
                <h1>Kontakt</h1>
                <div className="bg-orange-card mt-4 rounded-3xl lg:rotate-6">
                <div className="bg-red-card rounded-3xl rounded-tr-[60px] overflow-hidden w-screen max-w-[430px] lg:-rotate-6">
                    <form onSubmit={toggleButton} action="https://formsubmit.co/fd1bcb62bc2401733e36b575bd39902c" method="POST" className="flex flex-col justify-center items-center w-80 py-7 m-auto">
                        <h1 className="text-lg mb-2">Sie möchten mit uns in Kontakt treten?</h1>
                        <label htmlFor="name" className="self-start">Name:</label>
                        <input type="text" placeholder="Name" name="name" required />
                        <label htmlFor="email">E-Mail-Adresse:</label>
                        <input type="email" placeholder="E-Mail-Adresse" name="email" required />
                        <label htmlFor="message">Nachricht:</label>
                        <textarea name="message" id="message" cols="30" rows="10" placeholder='Wir freuen uns über Ihre Nachricht' required></textarea>
                        {buttonState}
                        <input type="hidden" name="_captcha" value="false" />
                        <input type="hidden" name="_next" value="https://die-wortschatzkartei.vercel.app/kontakt/success" />
                    </form>
                </div>
                </div>
            </div>
        </section>
    );
}

export default KontaktPage