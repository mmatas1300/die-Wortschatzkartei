
import axios from 'axios'
import { useState } from 'react'
import { Spinner } from "@material-tailwind/react";
import { useSession } from 'next-auth/react'

function Karteneditor() {

    const [newCardState, setNewCardState] = useState(<button className='bg-black-card'>Fertig</button>);

    const { data: session, status } = useSession();


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
                await axios.post('/api/cards', card);
            } else {
                card._id = card.wort + session.user.email + Date.now();
                await axios.put('/api/user/cards', { email: session.user.email, card: card });
            }
            setNewCardState(<div>Karte hinzugefügt!</div>);
            setTimeout(function () {
                setNewCardState(<button>Fertig</button>)
            }, 1500);
        } catch (error) {
            setNewCardState(<div>{error.response.data.message}</div>);
            setTimeout(function () {
                setNewCardState(<button>Fertig</button>)
            }, 1500);
        }


    }

    const handleChangeGender = (e) => {
        if (e.target.value === "Nomen-das") {
            setTypeColor("bg-green-card")
            setTypeFields(nomenFields)
        } else if (e.target.value === "Nomen-der") {
            setTypeColor("bg-blue-card")
            setTypeFields(nomenFields)
        } else if (e.target.value === "Nomen-die") {
            setTypeColor("bg-red-card")
            setTypeFields(nomenFields)
        } else if (e.target.value === "Nomen-pl") {
            setTypeColor("bg-yellow-card")
            setTypeFields(nomenFieldsPl)
        }
    };

    const verbFields = (<>
        <label htmlFor="wortVerb">Infinitiv</label>
        <input type="text" placeholder='Sein' name='wortVerb' />

        <span className='text-sm'>Präsens</span>
        <div className='grid grid-cols-2 w-full'>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="ps1">Ich:</label>
                <input className='max-w-32' type="text" placeholder='Bin' name='ps1' />
            </div>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="ps4">Wir:</label>
                <input className='max-w-32' type="text" placeholder='Sind' name='ps4' />
            </div>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="ps2">Du:</label>
                <input className='max-w-32' type="text" placeholder='Bist' name='ps2' />
            </div>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="ps5">Ihr:</label>
                <input className='max-w-32' type="text" placeholder='Seid' name='ps5' />
            </div>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="ps3">Er/Sie/Es:</label>
                <input className='max-w-32' type="text" placeholder='Ist' name='ps3' />
            </div>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="ps6">Sie:</label>
                <input className='max-w-32' type="text" placeholder='Sind' name='ps6' />
            </div>
        </div>

        <span className='text-sm'>Präteritum</span>
        <div className='grid grid-cols-2 w-full'>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="pm1">Ich:</label>
                <input className='max-w-32' type="text" placeholder='War' name='pm1' />
            </div>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="pm4">Wir:</label>
                <input className='max-w-32' type="text" placeholder='Waren' name='pm4' />
            </div>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="pm2">Du:</label>
                <input className='max-w-32' type="text" placeholder='Warst' name='pm2' />
            </div>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="pm5">Ihr:</label>
                <input className='max-w-32' type="text" placeholder='Wart' name='pm5' />
            </div>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="pm3">Er/Sie/Es:</label>
                <input className='max-w-32' type="text" placeholder='War' name='pm3' />
            </div>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="pm6">Sie:</label>
                <input className='max-w-32' type="text" placeholder='Waren' name='pm6' />
            </div>
        </div>
        <label htmlFor="partizip2">Partizip II:</label>
        <input type="text" placeholder='Gewesen' name='partizip2' />
        <label htmlFor="verwandte">Verwandte Wörter:</label>
        <input type="text" placeholder='Verb' name='verwandte' />
        <label htmlFor="beispiel">Beispiel:</label>
        <input type="text" placeholder='Ich bin Juliet' name='beispiel' />
        <label htmlFor="bild">Bild:</label>
        <input type="text" placeholder='https://www.example.com/bild.jpg' name='bild' />
        <label htmlFor="ubersetzung">Übersetzung:</label>
        <input type="text" placeholder='to be' name='ubersetzung' />
    </>)

    const nomenMUFFields = (<>
        <div className='grid grid-cols-2 w-full'>
            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="wortMUF">Maskulim:</label>
                <input className='max-w-32' type="text" placeholder='Koch' name='wortMUF' />
            </div>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="frau">Feminin:</label>
                <input className='max-w-32' type="text" placeholder='Köchin' name="frau" />

            </div>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="manner">Plural:</label>
                <input className='max-w-32' type="text" placeholder='Köche' name="manner" />
            </div>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="frauen">Plural:</label>
                <input className='max-w-32' type="text" placeholder='Köchinnen' name='frauen' />
            </div>

        </div>
        <label htmlFor="verwandte">Verwandte Wörter:</label>
        <input type="text" placeholder='der Beruf | das Restaurant' name='verwandte' />
        <label htmlFor="beispiel">Beispiel:</label>
        <input type="text" placeholder='Sie arbeitet als Köchin' name="beispiel" />
        <label htmlFor="bild">Bild:</label>
        <input type="text" placeholder='https://www.example.com/bild.jpg' name='bild' />
        <label htmlFor="ubersetzung">Übersetzung:</label>
        <input type="text" placeholder='Chef' name='ubersetzung' />
    </>)

    const nomenFields = (<>
        <label htmlFor="type">Typ:</label>
        <select name="type" onChange={handleChangeGender}>

            <option value="Nomen-das">Neutrum</option>
            <option value="Nomen-der">Maskulim</option>
            <option value="Nomen-die">Feminin</option>
            <option value="Nomen-pl">Plural</option>
        </select>
        <label htmlFor="wortNomen">Wort:</label>
        <input type="text" placeholder='Apfel' name="wortNomen" />
        <label htmlFor="plural">Plural:</label>
        <input type="text" placeholder='Äpfel' name="plural" />
        <label htmlFor="verwandte">Verwandte Wörter:</label>
        <input type="text" placeholder='das Obst' name="verwandte" />
        <label htmlFor="beispiel">Beispiel:</label>
        <input type="text" placeholder='Ich esse einen Apfel' name="beispiel" />
        <label htmlFor="bild">Bild:</label>
        <input type="text" placeholder='https://www.example.com/bild.jpg' name="bild" />
        <label htmlFor="ubersetzung">Übersetzung:</label>
        <input type="text" placeholder='Apple' name="ubersetzung" />
    </>)

    const nomenFieldsPl = (<>
        <label htmlFor="type">Typ:</label>
        <select name="type" onChange={handleChangeGender}>

            <option value="Nomen-das">Neutrum</option>
            <option value="Nomen-der">Maskulim</option>
            <option value="Nomen-die">Feminin</option>
            <option value="Nomen-pl">Plural</option>
        </select>
        <label htmlFor="wortNomen">Wort:</label>
        <input type="text" placeholder='Apfel' name="wortNomen" />
        <label htmlFor="verwandte">Verwandte Wörter:</label>
        <input type="text" placeholder='das Obst' name="verwandte" />
        <label htmlFor="beispiel">Beispiel:</label>
        <input type="text" placeholder='Ich esse einen Apfel' name="beispiel" />
        <label htmlFor="bild">Bild:</label>
        <input type="text" placeholder='https://www.example.com/bild.jpg' name="bild" />
        <label htmlFor="ubersetzung">Übersetzung:</label>
        <input type="text" placeholder='Apple' name="ubersetzung" />
    </>)

    const andereFields = (<>
        <label htmlFor="type">Typ:</label>
        <input type="text" placeholder='Adjektiv' name='type' />
        <label htmlFor="wortAndere">Wort:</label>
        <input type="text" placeholder='Gesund' name='wortAndere' />
        <label htmlFor="verwandte">Verwandte Wörter:</label>
        <input type="text" placeholder='Krank' name="verwandte" />
        <label htmlFor="beispiel">Beispiel:</label>
        <input type="text" placeholder='Heute bin ich gesund.' name="beispiel" />
        <label htmlFor="bild">Bild:</label>
        <input type="text" placeholder='https://www.example.com/bild.jpg' name="bild" />
        <label htmlFor="ubersetzung">Übersetzung:</label>
        <input type="text" placeholder='Healthy' name='ubersetzung' />
    </>)

    const [typeFields, setTypeFields] = useState(nomenFields);
    const [typeColor, setTypeColor] = useState("bg-green-card");


    const setNomenForm = () => {
        setTypeFields(nomenFields)
        setTypeColor("bg-green-card")
    }

    const setAndereForm = () => {
        setTypeFields(andereFields)
        setTypeColor("bg-purple-card")
    }

    const setNomenMUFForm = () => {
        setTypeFields(nomenMUFFields)
        setTypeColor("bg-gradient-to-r from-blue-card to-red-card")
    }

    const setVerbForm = () => {
        setTypeFields(verbFields)
        setTypeColor("bg-orange-card")
    }

    return (
        <div className='mt-12 flex flex-col justify-center items-center'>
            <div className={`self-start flex flex-row ms-2`}>
                <button onClick={setNomenForm} className={`bg-black-card p-2 z-0 rounded-none rounded-t-lg transition duration-200 hover:scale-105 hover:bg-yellow-card`}>Nomen</button>
                <button onClick={setVerbForm} className='bg-black-card p-2 z-0 rounded-none rounded-t-lg transition duration-200 hover:scale-105 hover:bg-yellow-card'>Verb</button>
                <button onClick={setNomenMUFForm} className='bg-black-card p-2 z-0 rounded-none rounded-t-lg transition duration-200 hover:scale-105 hover:bg-yellow-card'>Gleichstellungsnomen</button>
                <button onClick={setAndereForm} className='bg-black-card p-2 z-0 rounded-none rounded-t-lg transition duration-200 hover:scale-105 hover:bg-yellow-card'>Andere Wort</button>
            </div>
            <div className={`w-96 rounded-br-3xl rounded-bl-3xl rounded-tl-lg rounded-tr-3xl z-10 ${typeColor}`}>
                <form onSubmit={handlePostCard} className="flex flex-col justify-normal items-center m-12">
                    {typeFields}
                    {newCardState}
                </form>
            </div>

        </div>
    )
}

export default Karteneditor