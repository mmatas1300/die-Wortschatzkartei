import { useSession } from 'next-auth/react'
import axios from 'axios';



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

    return (
        <div className={`bg-red-card w-96 rounded-3xl p-8 mt-12 flex flex-col justify-center items-center`}>
            <form className='mt-4 flex flex-col justify-center items-center' onSubmit={handleKontoeinstellungen}>
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