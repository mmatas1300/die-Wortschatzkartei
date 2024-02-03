import style from '@/components/Kontoeinstellungen.module.css'
import { useSession } from 'next-auth/react'
import axios from 'axios';
import { useState } from 'react';


function Kontoeinstellungen() {

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
                url: 'http://localhost:3000/api/users',
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

    return (
        <div className={`${style.konto} flex flex-col justify-center items-center`}>
            <h1 className='mt-4'>Kontoeinstellungen</h1>
            <form className='flex flex-col justify-center items-center' onSubmit={handleKontoeinstellungen}>
                <label htmlFor="nick">Spitzname:</label>
                <input type="text" placeholder={session.user.config.nick} name='nick' />
                <label htmlFor="cardsSet">Möchtest du lieber deine eigenen Karten verwenden oder die der App?</label>
                <select name="cardsSet">
                    {session.user.config.cardsSet === "app" ? (<><option value="app">App-Karten</option>
                        <option value="meine">Meine Karten</option></>) : (<><option value="meine">Meine Karten</option><option value="app">App-Karten</option>
                        </>)}
                </select>
                <button className='mb-4'>Fertig</button>
            </form>
        </div>
    )
}

export default Kontoeinstellungen