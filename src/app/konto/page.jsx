'use client'
import { useSession } from 'next-auth/react'
import { Spinner } from "@material-tailwind/react";
import axios from 'axios';

function KontoPage() {

    const { data: session, status, update } = useSession();

    const handleKontoeinstellungen = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const config = {
            nick: formData.get('nick') ? formData.get('nick') : session.user.config.nick,
            cardsSet: formData.get('cardsSet')
        }
        try {
            const userData = await axios({
                method: 'put',
                url: '/api/user/config',
                data: {
                    _id: session.user._id,
                    config: config
                }
            });
            await update({ user: { ...session.user, config: config } })//Actualizar la session
            console.log(userData)
        } catch (error) {
            console.log(error)
        }

    }

    console.log(session, status);

    return (

        <section className='flex flex-col justify-center items-center mx-auto my-12'>
            {status === "loading" ? (<Spinner className="mt-2.5 h-10 w-10" />) :
                (<>
                    <h1 className='text-2xl mb-4'>Mein Konto</h1>
                    <h1 className='text-xl mb-4'>{session.user.config.nick ? "Willkommen " + session.user.config.nick + "!" : "Willkommen, richten Sie bitte Ihr Konto ein!"}</h1>
                    <div className='bg-green-card rounded-3xl lg:rotate-6'>
                        <div className='bg-blue-card rounded-3xl lg:rotate-6'>
                            <div className={`bg-red-card w-96 rounded-3xl p-8 flex flex-col justify-center items-center lg:-rotate-12`}>
                                <form className='mt-4 flex flex-col justify-center items-center' onSubmit={handleKontoeinstellungen}>
                                    <label htmlFor="nick">Spitzname:</label>
                                    <input type="text" placeholder={session.user.config.nick} name='nick' />
                                    <label htmlFor="cardsSet">Möchtest du lieber deine eigenen Karten verwenden oder die der App?</label>
                                    <select name="cardsSet">
                                        {session.user.config.cardsSet === "app" ? (<><option value="app">App-Karten</option>
                                            <option value="meine">Meine Karten</option></>) : (<><option value="meine">Meine Karten</option><option value="app">App-Karten</option>
                                            </>)}
                                    </select>
                                    <button className='mb-3'>Fertig</button>
                                </form>
                            </div>
                        </div>

                    </div>

                </>)}
        </section>

    )
}

export default KontoPage