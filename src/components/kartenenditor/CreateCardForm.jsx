import axios from 'axios'
import { useState } from 'react'
import { Spinner } from "@material-tailwind/react";
import { useSession } from 'next-auth/react'

const CreateCardForm = () => {

    const [newCardState, setNewCardState] = useState(<button className='bg-black-card'>Fertig</button>);

    const { data: session } = useSession();


    const createCard = (formData) => {
        if (formData.get('wortNomen')) {
            const card = {
                type: formData.get('type'),
                wort: formData.get('wortNomen'),
                plural: formData.get('plural'),
                bild: formData.get('bild'),
                verwandte: formData.get('verwandte'),
                beispiel: formData.get('beispiel'),
                ubersetzung: formData.get('ubersetzung')
            }
            return card
        }

        else if (formData.get('wortAndere')) {
            const card = {
                type: formData.get('type'),
                wort: formData.get('wortAndere'),
                bild: formData.get('bild'),
                verwandte: formData.get('verwandte'),
                beispiel: formData.get('beispiel'),
                ubersetzung: formData.get('ubersetzung')
            }
            return card
        }

        else if (formData.get('wortMUF')) {
            const card = {
                type: "Nomen-MUF",
                wort: formData.get('wortMUF'),
                manner: formData.get('manner'),
                frau: formData.get('frau'),
                frauen: formData.get('frauen'),
                bild: formData.get('bild'),
                verwandte: formData.get('verwandte'),
                beispiel: formData.get('beispiel'),
                ubersetzung: formData.get('ubersetzung')
            }
            return card
        }

        else if (formData.get('wortVerb')) {
            const card = {
                type: "Verb",
                wort: formData.get('wortVerb'),
                prasens: [formData.get('ps1'), formData.get('ps2'), formData.get('ps3'), formData.get('ps4'), formData.get('ps5'), formData.get('ps6')],
                prateritum: [formData.get('pm1'), formData.get('pm2'), formData.get('pm3'), formData.get('pm4'), formData.get('pm5'), formData.get('pm6')],
                partizip2: formData.get('partizip2'),
                bild: formData.get('bild'),
                verwandte: formData.get('verwandte'),
                beispiel: formData.get('beispiel'),
                ubersetzung: formData.get('ubersetzung')
            }
            if (formData.get('pm1') === "") {
                card.prateritum = [];
            }
            return card
        }
    }

    const handlePostCard = async (e) => {
        e.preventDefault();
        setNewCardState(<Spinner className="mt-2.5 h-10 w-10" />);
        const formData = new FormData(e.currentTarget)
        const card = createCard(formData);
        try {
            if (session.user.email === "mmatas1300@gmail.com") {
                await axios.post('/api/cards', { ...card, userid: session.user._id });
            } else {
                card._id = card.wort + session.user._id + Date.now();
                await axios.put('/api/user/cards', { email: session.user.email, card: card });
            }
            setNewCardState(<div className="mt-2.5 h-10">Karte hinzugefügt!</div>);
            setTimeout(function () {
                setNewCardState(<button className='bg-black-card'>Fertig</button>);
                if(card.type === "Nomen-das" || card.type === "Nomen-der" || card.type === "Nomen-die" ||card.type === "Nomen-pl") setForm(nomenFields, "bg-green-card")
                e.target.reset();
            }, 1500);
        } catch (error) {
            setNewCardState(<div className="mt-2.5 h-10">{error.response.data.message}</div>);
            setTimeout(function () {
                setNewCardState(<button className='bg-black-card'>Fertig</button>)
            }, 1500);
        }
    }

    const handleChangeGender = (e) => {
        if (e.target.value === "Nomen-das") {
            setForm(nomenFields, "bg-green-card")
        } else if (e.target.value === "Nomen-der") {
            setForm(nomenFields, "bg-blue-card")
        } else if (e.target.value === "Nomen-die") {
            setForm(nomenFields, "bg-red-card")
        } else if (e.target.value === "Nomen-pl") {
            setForm(nomenFieldsPl, "bg-yellow-card")
        }
    };

    const verbFields = (<>
        <label htmlFor="wortVerb">Infinitiv</label>
        <input type="text" placeholder='Sein' name='wortVerb' required />
        <span className='text-sm underline mt-1'>Präsens</span>
        <div className='grid grid-cols-2 lg:grid-cols-3 w-full bg-black-card/[0.1] rounded-2xl lg:rounded-3xl ps-2 lg:ps-4 py-2'>
            <div className='flex flex-col justify-center items-center lg:order-1'>
                <label htmlFor="ps1">Ich:</label>
                <input className='max-w-32' type="text" placeholder='Bin' name='ps1' />
            </div>
            <div className='flex flex-col justify-center items-center  lg:order-4'>
                <label htmlFor="ps4">Wir:</label>
                <input className='max-w-32' type="text" placeholder='Sind' name='ps4' />
            </div>
            <div className='flex flex-col justify-center items-center lg:order-2'>
                <label htmlFor="ps2">Du:</label>
                <input className='max-w-32' type="text" placeholder='Bist' name='ps2' />
            </div>
            <div className='flex flex-col justify-center items-center lg:order-5'>
                <label htmlFor="ps5">Ihr:</label>
                <input className='max-w-32' type="text" placeholder='Seid' name='ps5' />
            </div>
            <div className='flex flex-col justify-center items-center lg:order-3'>
                <label htmlFor="ps3">Er/Sie/Es:</label>
                <input className='max-w-32' type="text" placeholder='Ist' name='ps3' />
            </div>
            <div className='flex flex-col justify-center items-center lg:order-6'>
                <label htmlFor="ps6">Sie:</label>
                <input className='max-w-32' type="text" placeholder='Sind' name='ps6' />
            </div>
        </div>
        <span className='text-sm underline mt-1'>Präteritum</span>
        <div className='grid grid-cols-2 lg:grid-cols-3 w-full bg-black-card/[0.1] rounded-2xl lg:rounded-3xl ps-2 lg:ps-4 py-2'>
            <div className='flex flex-col justify-center items-center lg:order-1'>
                <label htmlFor="pm1">Ich:</label>
                <input className='max-w-32' type="text" placeholder='War' name='pm1' />
            </div>
            <div className='flex flex-col justify-center items-center lg:order-4'>
                <label htmlFor="pm4">Wir:</label>
                <input className='max-w-32' type="text" placeholder='Waren' name='pm4' />
            </div>
            <div className='flex flex-col justify-center items-center lg:order-2'>
                <label htmlFor="pm2">Du:</label>
                <input className='max-w-32' type="text" placeholder='Warst' name='pm2' />
            </div>
            <div className='flex flex-col justify-center items-center lg:order-5'>
                <label htmlFor="pm5">Ihr:</label>
                <input className='max-w-32' type="text" placeholder='Wart' name='pm5' />
            </div>
            <div className='flex flex-col justify-center items-center lg:order-3'>
                <label htmlFor="pm3">Er/Sie/Es:</label>
                <input className='max-w-32' type="text" placeholder='War' name='pm3' />
            </div>
            <div className='flex flex-col justify-center items-center lg:order-6'>
                <label htmlFor="pm6">Sie:</label>
                <input className='max-w-32' type="text" placeholder='Waren' name='pm6' />
            </div>
        </div>
        <div className='lg:grid lg:grid-cols-2 lg:w-full mt-2'>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <label htmlFor="partizip2">Partizip II:</label>
                <input className='lg:max-w-56' type="text" placeholder='Gewesen' name='partizip2' />
            </div>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <label htmlFor="verwandte">Verwandte Wörter:</label>
                <input className='lg:max-w-56' type="text" placeholder='Verb' name='verwandte' />
            </div>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <label htmlFor="beispiel">Beispiel:</label>
                <input className='lg:max-w-56' type="text" placeholder='Ich bin Juliet' name='beispiel' />
            </div>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <label htmlFor="bild">Bild:</label>
                <input className='lg:max-w-56' type="text" placeholder='https://www.example.com/bild.jpg' name='bild' />
            </div>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <label htmlFor="ubersetzung">Übersetzung:</label>
                <input className='lg:max-w-56' type="text" placeholder='To be' name='ubersetzung' />
            </div>
        </div>
    </>)

    const nomenMUFFields = (<>
        <div className='grid grid-cols-2 w-full'>
            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="wortMUF">Maskulim:</label>
                <input className='max-w-32 lg:max-w-56' type="text" placeholder='Koch' name='wortMUF' required />
            </div>
            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="frau">Feminin:</label>
                <input className='max-w-32 lg:max-w-56' type="text" placeholder='Köchin' name="frau" />
            </div>
            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="manner">Plural (M):</label>
                <input className='max-w-32 lg:max-w-56' type="text" placeholder='Köche' name="manner" />
            </div>
            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="frauen">Plural (F):</label>
                <input className='max-w-32 lg:max-w-56' type="text" placeholder='Köchinnen' name='frauen' />
            </div>
        </div>
        <div className='lg:grid lg:grid-cols-2 lg:w-full'>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <label htmlFor="verwandte">Verwandte Wörter:</label>
                <input className='lg:max-w-56' type="text" placeholder='der Beruf | das Restaurant' name='verwandte' />
            </div>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <label htmlFor="beispiel">Beispiel:</label>
                <input className='lg:max-w-56' type="text" placeholder='Sie arbeitet als Köchin' name="beispiel" />
            </div>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <label htmlFor="bild">Bild:</label>
                <input className='lg:max-w-56' type="text" placeholder='https://www.example.com/bild.jpg' name='bild' />
            </div>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <label htmlFor="ubersetzung">Übersetzung:</label>
                <input className='lg:max-w-56' type="text" placeholder='Chef' name='ubersetzung' />
            </div>
        </div>
    </>)

    const nomenFields = (<div className='lg:grid lg:grid-cols-2 lg:w-full'>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="type">Typ:</label>
            <select className='lg:max-w-56' name="type" onChange={handleChangeGender}>
                <option value="Nomen-das">Neutrum</option>
                <option value="Nomen-der">Maskulim</option>
                <option value="Nomen-die">Feminin</option>
                <option value="Nomen-pl">Plural</option>
            </select>
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="wortNomen">Wort:</label>
            <input className='lg:max-w-56' type="text" placeholder='Apfel' name="wortNomen" required />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="plural">Plural:</label>
            <input className='lg:max-w-56' type="text" placeholder='Äpfel' name="plural" />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="verwandte">Verwandte Wörter:</label>
            <input className='lg:max-w-56' type="text" placeholder='das Obst' name="verwandte" />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="beispiel">Beispiel:</label>
            <input className='lg:max-w-56' type="text" placeholder='Ich esse einen Apfel' name="beispiel" />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="bild">Bild:</label>
            <input className='lg:max-w-56' type="text" placeholder='https://www.example.com/bild.jpg' name="bild" />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="ubersetzung">Übersetzung:</label>
            <input className='lg:max-w-56' type="text" placeholder='Apple' name="ubersetzung" />
        </div>
    </div>)

    const nomenFieldsPl = (<div className='lg:grid lg:grid-cols-2 lg:w-full'>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="type">Typ:</label>
            <select className='lg:max-w-56' name="type" onChange={handleChangeGender}>
                <option value="Nomen-das">Neutrum</option>
                <option value="Nomen-der">Maskulim</option>
                <option value="Nomen-die">Feminin</option>
                <option value="Nomen-pl">Plural</option>
            </select>
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="wortNomen">Wort:</label>
            <input className='lg:max-w-56' type="text" placeholder='Apfel' name="wortNomen" required />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="verwandte">Verwandte Wörter:</label>
            <input className='lg:max-w-56' type="text" placeholder='das Obst' name="verwandte" />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="beispiel">Beispiel:</label>
            <input className='lg:max-w-56' type="text" placeholder='Ich esse einen Apfel' name="beispiel" />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="bild">Bild:</label>
            <input className='lg:max-w-56' type="text" placeholder='https://www.example.com/bild.jpg' name="bild" />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="ubersetzung">Übersetzung:</label>
            <input className='lg:max-w-56' type="text" placeholder='Apple' name="ubersetzung" />
        </div>
    </div>)

    const andereFields = (<div className='lg:grid lg:grid-cols-2 lg:w-full'>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="type">Typ:</label>
            <input className='lg:max-w-56' type="text" placeholder='Adjektiv' name='type' />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="wortAndere">Wort:</label>
            <input className='lg:max-w-56' type="text" placeholder='Gesund' name='wortAndere' required />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="verwandte">Verwandte Wörter:</label>
            <input className='lg:max-w-56' type="text" placeholder='Krank' name="verwandte" />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="beispiel">Beispiel:</label>
            <input className='lg:max-w-56' type="text" placeholder='Heute bin ich gesund.' name="beispiel" />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="bild">Bild:</label>
            <input className='lg:max-w-56' type="text" placeholder='https://www.example.com/bild.jpg' name="bild" />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="ubersetzung">Übersetzung:</label>
            <input className='lg:max-w-56' type="text" placeholder='Healthy' name='ubersetzung' />
        </div>
    </div>)

    const [typeFields, setTypeFields] = useState(nomenFields);
    const [typeColor, setTypeColor] = useState("bg-green-card");

    const setForm = (fields, color) => {
        setTypeFields(fields);
        setTypeColor(color);
    };


    return (
        <div className='flex flex-col justify-center items-center mt-4'>
            <h2>Neue Karte erstellen</h2>
            <div className={`self-start flex flex-row ms-2`}>
                <button onClick={() => { setForm(nomenFields, "bg-green-card") }} className={`bg-black-card p-2 z-0 rounded-none rounded-t-lg transition duration-200 hover:scale-105 hover:bg-yellow-card`}>Nomen</button>
                <button onClick={() => { setForm(verbFields, "bg-orange-card") }} className='bg-black-card p-2 z-0 rounded-none rounded-t-lg transition duration-200 hover:scale-105 hover:bg-yellow-card'>Verb</button>
                <button onClick={() => { setForm(nomenMUFFields, "bg-gradient-to-r from-blue-card to-red-card") }} className='bg-black-card p-2 z-0 rounded-none rounded-t-lg transition duration-200 hover:scale-105 hover:bg-yellow-card'>Gleichstellungsnomen</button>
                <button onClick={() => { setForm(andereFields, "bg-purple-card") }} className='bg-black-card p-2 z-0 rounded-none rounded-t-lg transition duration-200 hover:scale-105 hover:bg-yellow-card'>Andere Wort</button>
            </div>
            <div className={`w-96 lg:w-[640px] rounded-br-3xl rounded-bl-3xl rounded-tl-lg rounded-tr-3xl z-10 ${typeColor}`}>
                <form onSubmit={handlePostCard} className="flex flex-col justify-normal items-center mx-12 mt-12 mb-5">
                    {typeFields}
                    {newCardState}
                </form>
            </div>

        </div>
    );
};

export default CreateCardForm;