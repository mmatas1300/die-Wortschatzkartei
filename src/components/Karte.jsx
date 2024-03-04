'use client'
import ReactFlipCard from 'reactjs-flip-card'
import { useState } from 'react';

function Karte({ karte, flip }) {

    const [showUbersetzung, setShowUbersetzung] = useState(false);

    const toggleUbersetzung = () => {
        setShowUbersetzung(true);
    };

    const colorKarte = () => {
        switch (karte.type) {
            case "Nomen-das":
                return "bg-green-card";
            case "Nomen-der":
                return "bg-blue-card";
            case "Nomen-die":
                return "bg-red-card";
            case "Nomen-pl":
                return "bg-yellow-card";
            case "Nomen-MUF":
                return "bg-gradient-to-r from-blue-card to-red-card";
            case "Verb":
                return `bg-orange-card`;
            default:
                return "bg-purple-card";
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
            <ReactFlipCard
                frontComponent={<div className={`rounded-3xl flex flex-col justify-center items-center text-xl ${colorKarte()}`}>
                    {wortKarte()}
                </div>}
                backComponent={<div className={`w-80 min-h-80 rounded-3xl flex  flex-col justify-center items-center ${colorKarte()}`}>
                <p className="self-end me-4 mt-4">{typeKarte()}</p>
                {karte.type === "Nomen-MUF" ? (
                    <div className='grid grid-cols-2 justify-items-center'>
                        <p className='mx-2 text-base' >{wortKarte()}</p>
                        <p className='mx-1 text-base' >{"die " + karte.frau}</p>
                        <p className='mx-2 text-sm' >{"die " + karte.manner}</p>
                        <p className='mx-1 text-sm' >{"die " + karte.frauen}</p>
                    </div>
                ) : (<p className='text-xl'>{wortKarte()}</p>)}

                <p>{karte.plural ? "die " + karte.plural : ""}</p>
                {karte.type === "Verb" ? (<div className='flex  flex-col justify-center items-center'>
                    <p className='mt-2'>Präsens</p>
                    <div class="grid grid-cols-2 justify-items-center">
                        <p className='mx-1 text-sm'>{karte.prasens[0]}</p>
                        <p className='mx-1 text-sm'>{karte.prasens[3]}</p>
                        <p className='mx-1 text-sm'>{karte.prasens[1]}</p>
                        <p className='mx-1 text-sm'>{karte.prasens[4]}</p>
                        <p className='mx-1 text-sm'>{karte.prasens[2]}</p>
                        <p className='mx-1 text-sm'>{karte.prasens[5]}</p>
                    </div>

                    <p className='mt-2'>{(karte.prateritum.length !== 0) ? "Präteritum" : ""}</p>
                    <div class="grid grid-cols-2 justify-items-center">
                        <p className='mx-1 text-sm'>{karte.prateritum[0]}</p>
                        <p className='mx-1 text-sm'>{karte.prateritum[3]}</p>
                        <p className='mx-1 text-sm'>{karte.prateritum[1]}</p>
                        <p className='mx-1 text-sm'>{karte.prateritum[4]}</p>
                        <p className='mx-1 text-sm'>{karte.prateritum[2]}</p>
                        <p className='mx-1 text-sm'>{karte.prateritum[5]}</p>
                    </div>

                    <p className='mt-2'>{karte.type === "Verb" ? "Partizip II" : ""}</p>
                    <p className='text-sm'>{karte.partizip2}</p></div>) : ""}


                <img src={karte.bild} alt={wortKarte()} className='w-60 rounded-2xl my-4' />
                <p className='mb-4'>{karte.verwandte}</p>
                <p className='mx-4 mb-4'>{karte.beispiel}</p>
                <p onClick={toggleUbersetzung} className='mb-4 bg-gray-900 p-1 rounded-md cursor-pointer text-sm'>{showUbersetzung ? karte.ubersetzung : "Übersetzung"}</p>
            </div>}
            />


        </div>

    );
}

export default Karte