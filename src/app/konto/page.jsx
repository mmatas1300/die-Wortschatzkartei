'use client'
import { useSession } from 'next-auth/react'
import { Spinner } from "@material-tailwind/react";
import axios from 'axios';
import { useState } from 'react';

function KontoPage() {

    const fertigButton = (<button className='mb-3'>Fertig</button>)
    const { data: session, status, update } = useSession();
    const [stateButton, setStateButton] = useState(fertigButton);

    const handleKontoeinstellungen = async (e) => {
        e.preventDefault()
        setStateButton(<Spinner className="mt-2.5 mb-4 h-8 w-8" />)
        const formData = new FormData(e.currentTarget)
        const config = {
            nick: formData.get('nick') ? formData.get('nick') : session.user.config.nick,
            cardsSet: formData.get('cardsSet')
        }
        try {
            await axios({
                method: 'put',
                url: '/api/user/config',
                data: {
                    userId: session.user._id,
                    config: config
                }
            });
            await update({ user: { ...session.user, config: config } })//Actualizar la session
            setStateButton(fertigButton);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className='flex flex-col justify-center items-center mx-auto my-12'>
            {status === "loading" ? (<Spinner className="mt-2.5 h-10 w-10" />) :
                (<>
                    <h1 className='text-xl mb-4'>Mein Konto</h1>
                    <h1 className='text-xl mb-4'>{session.user.config.nick ? "Willkommen " + session.user.config.nick + "!" : "Willkommen, richten Sie bitte Ihr Konto ein!"}</h1>
                    <div className='bg-green-card rounded-3xl lg:-rotate-12 lg:mt-8'>
                        <div className='bg-blue-card rounded-3xl lg:rotate-6'>
                            <div className={`bg-red-card w-96 rounded-3xl p-8 flex flex-col justify-center items-center lg:rotate-6`}>
                                <h1>Kontoeinstellungen</h1>
                                <form className='mt-4 flex flex-col justify-center items-center' onSubmit={handleKontoeinstellungen}>
                                    <label htmlFor="nick">Spitzname:</label>
                                    <input type="text" placeholder={session.user.config.nick} name='nick' />
                                    <label className='mt-2' htmlFor="cardsSet">Möchtest du lieber deine eigenen Karten verwenden oder die der App?</label>
                                    <select name="cardsSet">
                                        {session.user.config.cardsSet === "app" ? (<><option value="app">App-Karten</option>
                                            <option value="meine">Meine Karten</option></>) : (<><option value="meine">Meine Karten</option><option value="app">App-Karten</option>
                                            </>)}
                                    </select>
                                    {stateButton}
                                </form>
                            </div>
                        </div>

                    </div>

                </>)}
        </section>
    )
}

export default KontoPage