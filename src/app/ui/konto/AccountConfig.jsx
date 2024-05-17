import { updateMyAccount } from '@/libs/data';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Spinner } from "@material-tailwind/react";

const AccountConfig = () => {

    const submitButton = (<button className='mb-3'>Fertig</button>);
    
    const [stateButton, setStateButton] = useState(submitButton);
    const { data: session, update } = useSession();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStateButton(<Spinner className="mt-2.5 mb-4 h-9 w-9" />);
        const formData = new FormData(e.currentTarget)
        const config = {
            nick: formData.get('nick') ? formData.get('nick') : session.user.config.nick,
            cardsSet: formData.get('cardsSet')
        }
        try {
            await updateMyAccount(config,session.user._id);
            await update({ user: { ...session.user, config: config } })
        } catch (error) {
            console.log(error)
        }
        setStateButton(submitButton);
    };

    return (
        <div className='bg-green-card rounded-3xl lg:-rotate-12 lg:mt-8 h-[345px]'>
            <div className='bg-blue-card rounded-3xl lg:rotate-6 h-[345px]'>
                <div className={`bg-red-card w-96 rounded-3xl p-8 flex flex-col justify-center items-center lg:rotate-6 h-[345px]`}>
                    <h1>Kontoeinstellungen</h1>
                    <form className='mt-4 flex flex-col justify-center items-center' onSubmit={handleSubmit}>
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
    );
};

export default AccountConfig;