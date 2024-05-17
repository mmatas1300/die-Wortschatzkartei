export const verbFields = (card) => {
    return (<>
        <label htmlFor="wortVerb">Infinitiv</label>
        <input type="text" placeholder='Sein' name='wortVerb' required defaultValue={card.wort} />
        <span className='text-sm underline mt-1'>Präsens</span>
        <div className='grid grid-cols-2 lg:grid-cols-3 w-full bg-black-card/[0.1] rounded-2xl lg:rounded-3xl ps-2 lg:ps-4 py-2'>
            <div className='flex flex-col justify-center items-center lg:order-1'>
                <label htmlFor="ps1">Ich:</label>
                <input className='max-w-20 lg:max-w-32' type="text" placeholder='Bin' name='ps1' defaultValue={card.type === "Verb" ? card.prasens[0] : null} />
            </div>
            <div className='flex flex-col justify-center items-center  lg:order-4'>
                <label htmlFor="ps4">Wir:</label>
                <input className='max-w-20 lg:max-w-32' type="text" placeholder='Sind' name='ps4' defaultValue={card.type === "Verb" ? card.prasens[3] : null} />
            </div>
            <div className='flex flex-col justify-center items-center lg:order-2'>
                <label htmlFor="ps2">Du:</label>
                <input className='max-w-20 lg:max-w-32' type="text" placeholder='Bist' name='ps2' defaultValue={card.type === "Verb" ? card.prasens[1] : null} />
            </div>
            <div className='flex flex-col justify-center items-center lg:order-5'>
                <label htmlFor="ps5">Ihr:</label>
                <input className='max-w-20 lg:max-w-32' type="text" placeholder='Seid' name='ps5' defaultValue={card.type === "Verb" ? card.prasens[4] : null} />
            </div>
            <div className='flex flex-col justify-center items-center lg:order-3'>
                <label htmlFor="ps3">Er/Sie/Es:</label>
                <input className='max-w-20 lg:max-w-32' type="text" placeholder='Ist' name='ps3' defaultValue={card.type === "Verb" ? card.prasens[2] : null} />
            </div>
            <div className='flex flex-col justify-center items-center lg:order-6'>
                <label htmlFor="ps6">Sie:</label>
                <input className='max-w-20 lg:max-w-32' type="text" placeholder='Sind' name='ps6' defaultValue={card.type === "Verb" ? card.prasens[5] : null} />
            </div>
        </div>
        <span className='text-sm underline mt-1'>Präteritum</span>
        <div className='grid grid-cols-2 lg:grid-cols-3 w-full bg-black-card/[0.1] rounded-2xl lg:rounded-3xl ps-2 lg:ps-4 py-2'>
            <div className='flex flex-col justify-center items-center lg:order-1'>
                <label htmlFor="pm1">Ich:</label>
                <input className='max-w-20 lg:max-w-32' type="text" placeholder='War' name='pm1' defaultValue={card.type === "Verb" ? card.prateritum[0] : null} />
            </div>
            <div className='flex flex-col justify-center items-center lg:order-4'>
                <label htmlFor="pm4">Wir:</label>
                <input className='max-w-20 lg:max-w-32' type="text" placeholder='Waren' name='pm4' defaultValue={card.type === "Verb" ? card.prateritum[3] : null} />
            </div>
            <div className='flex flex-col justify-center items-center lg:order-2'>
                <label htmlFor="pm2">Du:</label>
                <input className='max-w-20 lg:max-w-32' type="text" placeholder='Warst' name='pm2' defaultValue={card.type === "Verb" ? card.prateritum[1] : null} />
            </div>
            <div className='flex flex-col justify-center items-center lg:order-5'>
                <label htmlFor="pm5">Ihr:</label>
                <input className='max-w-20 lg:max-w-32' type="text" placeholder='Wart' name='pm5' defaultValue={card.type === "Verb" ? card.prateritum[4] : null} />
            </div>
            <div className='flex flex-col justify-center items-center lg:order-3'>
                <label htmlFor="pm3">Er/Sie/Es:</label>
                <input className='max-w-20 lg:max-w-32' type="text" placeholder='War' name='pm3' defaultValue={card.type === "Verb" ? card.prateritum[2] : null} />
            </div>
            <div className='flex flex-col justify-center items-center lg:order-6'>
                <label htmlFor="pm6">Sie:</label>
                <input className='max-w-20 lg:max-w-32' type="text" placeholder='Waren' name='pm6' defaultValue={card.type === "Verb" ? card.prateritum[5] : null} />
            </div>
        </div>
        <div className='lg:grid lg:grid-cols-2 lg:w-full mt-2'>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <label htmlFor="partizip2">Partizip II:</label>
                <input className='lg:max-w-56' type="text" placeholder='Gewesen' name='partizip2' defaultValue={card.partizip2} />
            </div>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <label htmlFor="verwandte">Verwandte Wörter:</label>
                <input className='lg:max-w-56' type="text" placeholder='Verb' name='verwandte' defaultValue={card.verwandte} />
            </div>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <label htmlFor="beispiel">Beispiel:</label>
                <input className='lg:max-w-56' type="text" placeholder='Ich bin Juliet' name='beispiel' defaultValue={card.beispiel} />
            </div>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <label htmlFor="bild">Bild:</label>
                <input className='lg:max-w-56' type="text" placeholder='https://www.example.com/bild.jpg' name='bild' defaultValue={card.bild} />
            </div>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <label htmlFor="ubersetzung">Übersetzung:</label>
                <input className='lg:max-w-56' type="text" placeholder='To be' name='ubersetzung' defaultValue={card.ubersetzung} />
            </div>
        </div>
    </>)
}

export const nomenMUFFields = (card) => {
    return (<>
        <div className='grid grid-cols-2 w-full'>
            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="wortMUF">Maskulim:</label>
                <input className='max-w-20 lg:max-w-56' type="text" placeholder='Koch' name='wortMUF' required defaultValue={card.wort} />
            </div>
            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="frau">Feminin:</label>
                <input className='max-w-20 lg:max-w-56' type="text" placeholder='Köchin' name="frau" defaultValue={card.frau} />
            </div>
            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="manner">Plural (M):</label>
                <input className='max-w-20 lg:max-w-56' type="text" placeholder='Köche' name="manner" defaultValue={card.manner} />
            </div>
            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="frauen">Plural (F):</label>
                <input className='max-w-20 lg:max-w-56' type="text" placeholder='Köchinnen' name='frauen' defaultValue={card.frauen} />
            </div>
        </div>
        <div className='lg:grid lg:grid-cols-2 lg:w-full'>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <label htmlFor="verwandte">Verwandte Wörter:</label>
                <input className='lg:max-w-56' type="text" placeholder='der Beruf | das Restaurant' name='verwandte' defaultValue={card.verwandte} />
            </div>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <label htmlFor="beispiel">Beispiel:</label>
                <input className='lg:max-w-56' type="text" placeholder='Sie arbeitet als Köchin' name="beispiel" defaultValue={card.beispiel} />
            </div>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <label htmlFor="bild">Bild:</label>
                <input className='lg:max-w-56' type="text" placeholder='https://www.example.com/bild.jpg' name='bild' defaultValue={card.bild} />
            </div>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <label htmlFor="ubersetzung">Übersetzung:</label>
                <input className='lg:max-w-56' type="text" placeholder='Chef' name='ubersetzung' defaultValue={card.ubersetzung} />
            </div>
        </div>
    </>)
}

export const nomenFields = (card) => {
    return (<div className='lg:grid lg:grid-cols-2 lg:w-full'>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="wortNomen">Wort:</label>
            <input className='lg:max-w-56' type="text" placeholder='Apfel' name="wortNomen" defaultValue={card.wort} required />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="plural">Plural:</label>
            <input className='lg:max-w-56' type="text" placeholder='Äpfel' name="plural" defaultValue={card.plural} />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="verwandte">Verwandte Wörter:</label>
            <input className='lg:max-w-56' type="text" placeholder='das Obst' name="verwandte" defaultValue={card.verwandte} />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="beispiel">Beispiel:</label>
            <input className='lg:max-w-56' type="text" placeholder='Ich esse einen Apfel' name="beispiel" defaultValue={card.beispiel} />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="bild">Bild:</label>
            <input className='lg:max-w-56' type="text" placeholder='https://www.example.com/bild.jpg' name="bild" defaultValue={card.bild} />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="ubersetzung">Übersetzung:</label>
            <input className='lg:max-w-56' type="text" placeholder='Apple' name="ubersetzung" defaultValue={card.ubersetzung} />
        </div>
    </div>)
}

export const nomenFieldsPl = (card) => {
    return (<div className='lg:grid lg:grid-cols-2 lg:w-full'>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="wortNomen">Wort:</label>
            <input className='lg:max-w-56' type="text" placeholder='Apfel' name="wortNomen" required defaultValue={card.wort} />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="verwandte">Verwandte Wörter:</label>
            <input className='lg:max-w-56' type="text" placeholder='das Obst' name="verwandte" defaultValue={card.verwandte} />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="beispiel">Beispiel:</label>
            <input className='lg:max-w-56' type="text" placeholder='Ich esse einen Apfel' name="beispiel" defaultValue={card.beispiel} />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="bild">Bild:</label>
            <input className='lg:max-w-56' type="text" placeholder='https://www.example.com/bild.jpg' name="bild" defaultValue={card.bild} />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="ubersetzung">Übersetzung:</label>
            <input className='lg:max-w-56' type="text" placeholder='Apple' name="ubersetzung" defaultValue={card.ubersetzung} />
        </div>
    </div>)
}

export const andereFields = (card) => {
    return (<div className='lg:grid lg:grid-cols-2 lg:w-full'>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="typeAndere">Typ:</label>
            <input className='lg:max-w-56' type="text" placeholder='Adjektiv' name="typeAndere" defaultValue={card.type} />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="wortAndere">Wort:</label>
            <input className='lg:max-w-56' type="text" placeholder='Gesund' name='wortAndere' required defaultValue={card.wort} />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="verwandte">Verwandte Wörter:</label>
            <input className='lg:max-w-56' type="text" placeholder='Krank' name="verwandte" defaultValue={card.verwandte} />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="beispiel">Beispiel:</label>
            <input className='lg:max-w-56' type="text" placeholder='Heute bin ich gesund.' name="beispiel" defaultValue={card.beispiel} />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="bild">Bild:</label>
            <input className='lg:max-w-56' type="text" placeholder='https://www.example.com/bild.jpg' name="bild" defaultValue={card.bild} />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="ubersetzung">Übersetzung:</label>
            <input className='lg:max-w-56' type="text" placeholder='Healthy' name='ubersetzung' defaultValue={card.ubersetzung} />
        </div>
    </div>)
} 