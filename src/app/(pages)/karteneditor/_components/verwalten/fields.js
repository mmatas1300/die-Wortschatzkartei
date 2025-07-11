export const verbFields = (card) => {
    return (<>
        <label htmlFor="wordVerb">Infinitiv</label>
        <input type="text" placeholder='Sein' name='wordVerb' required defaultValue={card.word}  />
        <span className='text-sm underline mt-1'>Präsens</span>
        <div className='grid grid-cols-2 lg:grid-cols-3 w-full bg-black-card/[0.1] rounded-2xl lg:rounded-3xl ps-2 lg:ps-4 py-2'>
            <div className='flex flex-col justify-center items-center lg:order-1'>
                <label htmlFor="ps1">Ich:</label>
                <input className='max-w-20 lg:max-w-32' type="text" placeholder='Bin' name='ps1' defaultValue={card.type === "Verb" ? card.present[0] : null} />
            </div>
            <div className='flex flex-col justify-center items-center  lg:order-4'>
                <label htmlFor="ps4">Wir:</label>
                <input className='max-w-20 lg:max-w-32' type="text" placeholder='Sind' name='ps4' defaultValue={card.type === "Verb" ? card.present[3] : null} />
            </div>
            <div className='flex flex-col justify-center items-center lg:order-2'>
                <label htmlFor="ps2">Du:</label>
                <input className='max-w-20 lg:max-w-32' type="text" placeholder='Bist' name='ps2' defaultValue={card.type === "Verb" ? card.present[1] : null} />
            </div>
            <div className='flex flex-col justify-center items-center lg:order-5'>
                <label htmlFor="ps5">Ihr:</label>
                <input className='max-w-20 lg:max-w-32' type="text" placeholder='Seid' name='ps5' defaultValue={card.type === "Verb" ? card.present[4] : null} />
            </div>
            <div className='flex flex-col justify-center items-center lg:order-3'>
                <label htmlFor="ps3">Er/Sie/Es:</label>
                <input className='max-w-20 lg:max-w-32' type="text" placeholder='Ist' name='ps3' defaultValue={card.type === "Verb" ? card.present[2] : null} />
            </div>
            <div className='flex flex-col justify-center items-center lg:order-6'>
                <label htmlFor="ps6">Sie:</label>
                <input className='max-w-20 lg:max-w-32' type="text" placeholder='Sind' name='ps6' defaultValue={card.type === "Verb" ? card.present[5] : null} />
            </div>
        </div>
        <span className='text-sm underline mt-1'>Präteritum</span>
        <div className='grid grid-cols-2 lg:grid-cols-3 w-full bg-black-card/[0.1] rounded-2xl lg:rounded-3xl ps-2 lg:ps-4 py-2'>
            <div className='flex flex-col justify-center items-center lg:order-1'>
                <label htmlFor="pm1">Ich:</label>
                <input className='max-w-20 lg:max-w-32' type="text" placeholder='War' name='pm1' defaultValue={card.type === "Verb" ? card.past[0] : null} />
            </div>
            <div className='flex flex-col justify-center items-center lg:order-4'>
                <label htmlFor="pm4">Wir:</label>
                <input className='max-w-20 lg:max-w-32' type="text" placeholder='Waren' name='pm4' defaultValue={card.type === "Verb" ? card.past[3] : null} />
            </div>
            <div className='flex flex-col justify-center items-center lg:order-2'>
                <label htmlFor="pm2">Du:</label>
                <input className='max-w-20 lg:max-w-32' type="text" placeholder='Warst' name='pm2' defaultValue={card.type === "Verb" ? card.past[1] : null} />
            </div>
            <div className='flex flex-col justify-center items-center lg:order-5'>
                <label htmlFor="pm5">Ihr:</label>
                <input className='max-w-20 lg:max-w-32' type="text" placeholder='Wart' name='pm5' defaultValue={card.type === "Verb" ? card.past[4] : null} />
            </div>
            <div className='flex flex-col justify-center items-center lg:order-3'>
                <label htmlFor="pm3">Er/Sie/Es:</label>
                <input className='max-w-20 lg:max-w-32' type="text" placeholder='War' name='pm3' defaultValue={card.type === "Verb" ? card.past[2] : null} />
            </div>
            <div className='flex flex-col justify-center items-center lg:order-6'>
                <label htmlFor="pm6">Sie:</label>
                <input className='max-w-20 lg:max-w-32' type="text" placeholder='Waren' name='pm6' defaultValue={card.type === "Verb" ? card.past[5] : null} />
            </div>
        </div>
        <div className='lg:grid lg:grid-cols-2 lg:w-full mt-2'>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <label htmlFor="participle2">Partizip II:</label>
                <input className='lg:max-w-56' type="text" placeholder='Gewesen' name='participle2' defaultValue={card.participle2} />
            </div>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <label htmlFor="related">Verwandte Wörter:</label>
                <input className='lg:max-w-56' type="text" placeholder='Verb' name='related' defaultValue={card.related} />
            </div>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <label htmlFor="example">Beispiel:</label>
                <input className='lg:max-w-56' type="text" placeholder='Ich bin Juliet' name='example' defaultValue={card.example} />
            </div>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <label htmlFor="image">Bild:</label>
                <input className='lg:max-w-56' type="text" placeholder='https://www.example.com/bild.jpg' name='image' defaultValue={card.image} />
            </div>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <label htmlFor="translation">Übersetzung:</label>
                <input className='lg:max-w-56' type="text" placeholder='To be' name='translation' defaultValue={card.translation} />
            </div>
        </div>
    </>)
}

export const nounMFFields = (card) => {
    return (<>
        <div className='grid grid-cols-2 w-full'>
            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="wordMF">Maskulim:</label>
                <input className='max-w-20 lg:max-w-56' type="text" placeholder='Koch' name='wordMF' required defaultValue={card.word} />
            </div>
            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="feminineSingular">Feminin:</label>
                <input className='max-w-20 lg:max-w-56' type="text" placeholder='Köchin' name="feminineSingular" defaultValue={card.feminineSingular} />
            </div>
            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="masculinePlural">Plural (M):</label>
                <input className='max-w-20 lg:max-w-56' type="text" placeholder='Köche' name="masculinePlural" defaultValue={card.masculinePlural} />
            </div>
            <div className='flex flex-col justify-center items-center'>
                <label htmlFor="femininePlural">Plural (F):</label>
                <input className='max-w-20 lg:max-w-56' type="text" placeholder='Köchinnen' name='femininePlural' defaultValue={card.femininePlural} />
            </div>
        </div>
        <div className='lg:grid lg:grid-cols-2 lg:w-full'>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <label htmlFor="related">Verwandte Wörter:</label>
                <input className='lg:max-w-56' type="text" placeholder='der Beruf | das Restaurant' name="related" defaultValue={card.related} />
            </div>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <label htmlFor="example">Beispiel:</label>
                <input className='lg:max-w-56' type="text" placeholder='Sie arbeitet als Köchin' name="example" defaultValue={card.example} />
            </div>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <label htmlFor="image">Bild:</label>
                <input className='lg:max-w-56' type="text" placeholder='https://www.example.com/bild.jpg' name="image" defaultValue={card.image} />
            </div>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <label htmlFor="translation">Übersetzung:</label>
                <input className='lg:max-w-56' type="text" placeholder='Chef' name="translation" defaultValue={card.translation} />
            </div>
        </div>
    </>)
}

export const nounFields = (card) => {
    return (<div className='lg:grid lg:grid-cols-2 lg:w-full'>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="wordNoun">Wort:</label>
            <input className='lg:max-w-56' type="text" placeholder='Apfel' name="wordNoun" defaultValue={card.word} required />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="plural">Plural:</label>
            <input className='lg:max-w-56' type="text" placeholder='Äpfel' name="plural" defaultValue={card.plural} />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="related">Verwandte Wörter:</label>
            <input className='lg:max-w-56' type="text" placeholder='das Obst' name="related" defaultValue={card.related} />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="example">Beispiel:</label>
            <input className='lg:max-w-56' type="text" placeholder='Ich esse einen Apfel' name="example" defaultValue={card.example} />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="image">Bild:</label>
            <input className='lg:max-w-56' type="text" placeholder='https://www.example.com/bild.jpg' name="image" defaultValue={card.image} required/>
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="translation">Übersetzung:</label>
            <input className='lg:max-w-56' type="text" placeholder='Apple' name="translation" defaultValue={card.translation} />
        </div>
    </div>)
}

export const nounPluralFields = (card) => {
    return (<div className='lg:grid lg:grid-cols-2 lg:w-full'>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="wordPlural">Wort:</label>
            <input className='lg:max-w-56' type="text" placeholder='Apfel' name="wordPlural" required defaultValue={card.word} />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="related">Verwandte Wörter:</label>
            <input className='lg:max-w-56' type="text" placeholder='das Obst' name="related" defaultValue={card.related} />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="example">Beispiel:</label>
            <input className='lg:max-w-56' type="text" placeholder='Ich esse einen Apfel' name="example" defaultValue={card.example} />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="image">Bild:</label>
            <input className='lg:max-w-56' type="text" placeholder='https://www.example.com/bild.jpg' name="image" defaultValue={card.image} required />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="translation">Übersetzung:</label>
            <input className='lg:max-w-56' type="text" placeholder='Apple' name="translation" defaultValue={card.translation} />
        </div>
    </div>)
}

export const genericFields = (card) => {
    return (<div className='lg:grid lg:grid-cols-2 lg:w-full'>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="typeAndere">Typ:</label>
            <input className='lg:max-w-56' type="text" placeholder='Adjektiv' name="typeAndere" defaultValue={card.type} required />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="wordGeneric">Wort:</label>
            <input className='lg:max-w-56' type="text" placeholder='Gesund' name='wordGeneric' required defaultValue={card.word} />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="related">Verwandte Wörter:</label>
            <input className='lg:max-w-56' type="text" placeholder='Krank' name="related" defaultValue={card.related} />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="example">Beispiel:</label>
            <input className='lg:max-w-56' type="text" placeholder='Heute bin ich gesund.' name="example" defaultValue={card.example} />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="image">Bild:</label>
            <input className='lg:max-w-56' type="text" placeholder='https://www.example.com/bild.jpg' name="image" defaultValue={card.image} required />
        </div>
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <label htmlFor="translation">Übersetzung:</label>
            <input className='lg:max-w-56' type="text" placeholder='Healthy' name="translation" defaultValue={card.translation} />
        </div>
    </div>)
} 