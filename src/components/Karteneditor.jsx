import style from '@/components/Karteneditor.module.css'
import { useState } from 'react'

function Karteneditor() {



    const andereFields = (<>
        <label htmlFor="typ">Typ:</label>
        <input type="text" placeholder='Adjektiv' />
        <label htmlFor="wort">Wort:</label>
        <input type="text" placeholder='Gesund' />
        <label htmlFor="verwandte">Verwandte Wörter:</label>
        <input type="text" placeholder='Krank' />
        <label htmlFor="beispiel">Beispiel:</label>
        <input type="text" placeholder='Heute bin ich gesund.' />
        <label htmlFor="bild">Bild:</label>
        <input type="text" placeholder='https://www.example.com/bild.jpg' />
        <label htmlFor="ubersetzung">Übersetzung:</label>
        <input type="text" placeholder='Healthy' />
    </>)

    const nomenFields = (<>
        <label htmlFor="type">Typ:</label>
        <select name="type">
            <option value="Nomen-das">Neutrum</option>
            <option value="Nomen-der">Maskulim</option>
            <option value="Nomen-die">Feminin</option>
            <option value="Nomen-pl">Plural</option>
        </select>
        <label htmlFor="wort">Wort:</label>
        <input type="text" placeholder='Apfel' />
        <label htmlFor="plural">Plural:</label>
        <input type="text" placeholder='Äpfel' />
        <label htmlFor="verwandte">Verwandte Wörter:</label>
        <input type="text" placeholder='das Obst' />
        <label htmlFor="beispiel">Beispiel:</label>
        <input type="text" placeholder='Ich esse einen Apfel' />
        <label htmlFor="bild">Bild:</label>
        <input type="text" placeholder='https://www.example.com/bild.jpg' />
        <label htmlFor="ubersetzung">Übersetzung:</label>
        <input type="text" placeholder='Apple' />
    </>)


    const nomenMUFFields = (<>
        <div className='grid grid-cols-2 w-full'>
            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="wort">Maskulim:</label>
                <input className='max-w-40' type="text" placeholder='Koch' />
            </div>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="frauen">Feminin:</label>
                <input className='max-w-40' type="text" placeholder='Köchin' />

            </div>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="manner">Plural:</label>
                <input className='max-w-40' type="text" placeholder='Köche' />
            </div>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="frauen">Plural:</label>
                <input className='max-w-40' type="text" placeholder='Köchinnen' />
            </div>

        </div>
        <label htmlFor="verwandte">Verwandte Wörter:</label>
        <input type="text" placeholder='der Beruf | das Restaurant' />
        <label htmlFor="beispiel">Beispiel:</label>
        <input type="text" placeholder='Sie arbeitet als Köchin' />
        <label htmlFor="bild">Bild:</label>
        <input type="text" placeholder='https://www.example.com/bild.jpg' />
        <label htmlFor="ubersetzung">Übersetzung:</label>
        <input type="text" placeholder='Chef' />
    </>)

    const verbFields = (<>
        <label htmlFor="wort">Infinitiv</label>
        <input type="text" placeholder='Sein' />
        
        <span className='text-sm'>Präsens</span>
        <div className='grid grid-cols-2 w-full'>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="wort">Ich:</label>
                <input className='max-w-40' type="text" placeholder='Bin' />
            </div>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="manner">Wir:</label>
                <input className='max-w-40' type="text" placeholder='Sind' />
            </div>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="frauen">Du:</label>
                <input className='max-w-40' type="text" placeholder='Bist' />
            </div>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="manner">Ihr:</label>
                <input className='max-w-40' type="text" placeholder='Seid' />
            </div>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="frauen">Er/Sie/Es:</label>
                <input className='max-w-40' type="text" placeholder='Ist' />
            </div>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="frauen">Sie:</label>
                <input className='max-w-40' type="text" placeholder='Sind' />
            </div>
        </div>

        <span className='text-sm'>Präteritum</span>
        <div className='grid grid-cols-2 w-full'>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="wort">Ich:</label>
                <input className='max-w-40' type="text" placeholder='War' />
            </div>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="manner">Wir:</label>
                <input className='max-w-40' type="text" placeholder='Waren' />
            </div>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="frauen">Du:</label>
                <input className='max-w-40' type="text" placeholder='Warst' />
            </div>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="manner">Ihr:</label>
                <input className='max-w-40' type="text" placeholder='Wart' />
            </div>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="frauen">Er/Sie/Es:</label>
                <input className='max-w-40' type="text" placeholder='War' />
            </div>

            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="frauen">Sie:</label>
                <input className='max-w-40' type="text" placeholder='Waren' />
            </div>
        </div>




        <label htmlFor="verwandte">Partizip II:</label>
        <input type="text" placeholder='Gewesen' />

        <label htmlFor="verwandte">Verwandte Wörter:</label>
        <input type="text" placeholder='Verb' />
        <label htmlFor="beispiel">Beispiel:</label>
        <input type="text" placeholder='Ich bin Juliet' />
        <label htmlFor="bild">Bild:</label>
        <input type="text" placeholder='https://www.example.com/bild.jpg' />
        <label htmlFor="ubersetzung">Übersetzung:</label>
        <input type="text" placeholder='to be' />
    </>)



    const [typeFields, setTypeFields] = useState(verbFields);
    const [typeColor, setTypeColor] = useState(style.verb);


    const setNomenForm = () => {
        setTypeFields(nomenFields)
        setTypeColor(style.nomen)
    }

    const setAndereForm = () => {
        setTypeFields(andereFields)
        setTypeColor(style.andere)
    }

    const setNomenMUFForm = () => {
        setTypeFields(nomenMUFFields)
        setTypeColor(style.nomenMUF)
    }

    const setVerbForm = () => {
        setTypeFields(verbFields)
        setTypeColor(style.verb)
    }

    return (
        <div className='mt-12 flex flex-col justify-center items-center'>
            <h1>der Karteneditor</h1>
            <div className={`${style.category} self-start flex flex-row ms-2`}>
                <button onClick={setNomenForm} className={`transition duration-200 hover:scale-105`}>Nomen</button>
                <button onClick={setVerbForm} className='transition duration-200 hover:scale-105'>Verb</button>
                <button onClick={setNomenMUFForm} className='transition duration-200 hover:scale-105'>Gleichstellungsnomen</button>
                <button onClick={setAndereForm} className='transition duration-200 hover:scale-105'>Andere Wort</button>
            </div>
            <div className={`${style.editor} ${typeColor}`}>
                <form className="flex flex-col justify-normal items-center m-12">
                    {typeFields}
                    <button>Fertig</button>
                </form>
            </div>

        </div>
    )
}

export default Karteneditor