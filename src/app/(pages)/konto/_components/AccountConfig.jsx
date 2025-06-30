import { updateUserConfig } from '@/libs/FetchAPI';
import { useContext, useState } from 'react';
import { useSession } from 'next-auth/react';
import LoadingButton from '@/components/LoadingButton';
import { AlertMessageContext } from '@/contexts/AlertMessageContext';
import { hexColor } from '@/utils/hexColors';

const AccountConfig = () => {
    
    const { data: session, update } = useSession();
    const [buttonLoading, setButtonLoading] = useState(false);
    const {showNotification} = useContext(AlertMessageContext);

    const updateAccount = async (e) => {
        e.preventDefault();
        setButtonLoading(true);
        const formData = new FormData(e.currentTarget)
        const config = {
            nick: formData.get('nick') ? formData.get('nick') : session.user.config.nick,
            cardsSet: formData.get('cardsSet'),
            cardsPerDay: formData.get('cardsPerDay') > 0 & formData.get('cardsPerDay') <= 50 ? Math.round(formData.get('cardsPerDay')) : session.user.config.cardsPerDay,
            ponsSecret: formData.get('ponsSecret') ? formData.get('ponsSecret') : session.user.config.ponsSecret,
        }
        try {
            await updateUserConfig(session.user._id, config);
            await update({ user: { ...session.user, config: config } })
            showNotification("Die Daten wurden aktualisiert",hexColor.greenCard)
        } catch (error) {
            showNotification(error.message,hexColor.redCard)
        }
        setButtonLoading(false);
    };

    return (
        <div className='bg-green-card rounded-3xl lg:-rotate-12 lg:mt-8 h-[470px]'>
            <div className='bg-blue-card rounded-3xl lg:rotate-6 h-[470px]'>
                <div className={`bg-red-card w-96 rounded-3xl p-8 flex flex-col justify-center items-center lg:rotate-6 h-[470px]`}>
                    <h1>Kontoeinstellungen</h1>
                    <form className='mt-4 flex flex-col justify-center items-center' onSubmit={updateAccount}>
                        <label htmlFor="nick">Spitzname:</label>
                        <input type="text" placeholder={session.user.config.nick} name='nick' />
                        <label className='mt-2' htmlFor="cardsSet">Möchtest du lieber deine eigenen Karten verwenden oder die der App?</label>
                        <select name="cardsSet">
                            {session.user.config.cardsSet === "app" ? (<><option value="app">App-Karten</option>
                                <option value="user">Meine Karten</option></>) : (<><option value="user">Meine Karten</option><option value="app">App-Karten</option>
                                </>)}
                        </select>
                        <label className='mt-2' htmlFor="cardsPerDay">Tageshöchstwert für neue Karten:</label>
                        <input type="text" placeholder={session.user.config.cardsPerDay} name='cardsPerDay' />
                        <label className='mt-2' htmlFor="ponsSecret">PONS secret:</label>
                        <input type="password" placeholder={session.user.config.ponsSecret} name='ponsSecret' />
                        <LoadingButton buttonStyle="mb-3" isLoading={buttonLoading} spinnerStyle='mt-2.5 mb-4 h-[37px] w-[37px]'>Fertig</LoadingButton>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AccountConfig;