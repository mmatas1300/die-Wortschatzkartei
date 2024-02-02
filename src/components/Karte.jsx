'use client'
import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';
import style from '@/components/Karte.module.css'


function Karte(karte) {

    const [isFlipped, setIsFlipped] = useState(false);

    const [showUbersetzung, setShowUbersetzung] = useState(false);

    const toggleUbersetzung = () =>{
        setShowUbersetzung(true);
    };

    const colorKarte = () => {
        switch (karte.type) {
            case "Nomen-das":
                return style.karteDas;
            case "Nomen-der":
                return style.karteDer;
            case "Nomen-die":
                return style.karteDie;
            case "Nomen-pl":
                return style.kartePl;
            case "Nomen-MUF":
                return style.karteMUF;
            case "Verb":
                return style.karteVerb;
            default:
                return style.karteAndere;
        }
    };

    const typeKarte = () => {
        switch (karte.type) {
            case "Nomen-das":
            case "Nomen-der":
            case "Nomen-die":
            case "Nomen-pl":
            case "Nomen-MUF":
                return "Nomen";
            case "Verb":
                return "Verb";
            default:
                return karte.type;
        }
    };

    const wortKarte = () => {
        switch (karte.type) {
            case "Nomen-das":
                return "das " + karte.wort;
            case "Nomen-der":
                return "der " + karte.wort;
            case "Nomen-die":
                return "die " + karte.wort;
            case "Nomen-pl":
                return "die " + karte.wort;
            case "Nomen-MUF":
                return "der " + karte.wort;
            default:
                return karte.wort;
        }
    };

    return (
        <div className='flex flex-col justify-center items-center'>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div className={`${style.karte} flex  flex-col justify-center items-center text-xl ${colorKarte()}`}>
                    {wortKarte()}
                </div>
                <div className={`${style.karte} flex  flex-col justify-center items-center ${colorKarte()}`}>
                    <p className="self-end me-4 mt-4">{typeKarte()}</p>
                    <p className='text-xl'>{wortKarte()}</p>
                    <p>{karte.plural ? "die " + karte.plural : ""}</p>

                    <img src={karte.bild} alt={wortKarte()} className='w-60 rounded-2xl my-4' />
                    <p className='mb-4'>{karte.verwandte}</p>
                    <p className='mx-4 mb-4'>{karte.beispiel}</p>
                    <p onClick={toggleUbersetzung} className='mb-4 bg-gray-900 p-1 rounded-md cursor-pointer text-sm'>{showUbersetzung?karte.ubersetzung:"Übersetzung"}</p>
                </div>
            </ReactCardFlip>
            <button className={`${style.flipButton} ${isFlipped ? "hidden" : ""}`} onClick={() => { setIsFlipped(true) }}>Umdrehen</button>

        </div>

    );
}

export default Karte