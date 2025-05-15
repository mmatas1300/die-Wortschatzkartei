'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import PonsContainerKarte from '@/components/Pons/PonsContainerKarte';
import { BookText } from 'lucide-react';
import { useSession } from 'next-auth/react';
import {selectColorCard} from '@/libs/selectColorCards'

function Karte(karte) {

    const { data: session, status } = useSession();
    const [showUbersetzung, setShowUbersetzung] = useState(false);
    const [showPonsCard, setShowPonsCard] = useState(false);

    const toggleUbersetzung = () => {
        setShowUbersetzung(true);
    };

    const togglePonsCard = () => {
        setShowPonsCard(!showPonsCard)
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

    useEffect(() => {
        setShowUbersetzung(false);
        setShowPonsCard(false);
    }, [karte]);

    return (
        <div className={`flex flex-col justify-center items-center w-80  rounded-3xl text-xl ${selectColorCard(karte.type)}`}>
            <div className='flex flex-row justify-between items-center  mt-4 w-64'>
                {status == "authenticated" && session.user.config.ponsSecret ?
                    <div className='relative inline-block'>
                        <button onClick={togglePonsCard} className='bg-black-card p-1 rounded-md'>
                            <BookText size={20} />
                        </button>
                        {showPonsCard ? <PonsContainerKarte wort={karte.wort} /> : <></>}
                    </div>
                    : <></>}
                <p className="underline">{typeKarte()}</p>
            </div>

            {karte.type === "Nomen-MUF" ? (
                <div className='grid grid-cols-2 justify-items-center'>
                    <p className='mx-2 text-sm' >{wortKarte()}</p>
                    <p className='mx-1 text-sm' >{"die " + karte.frau}</p>
                    <p className='mx-2 text-xs' >{"die " + karte.manner}</p>
                    <p className='mx-1 text-xs' >{"die " + karte.frauen}</p>
                </div>
            ) : (<p className='text-xl'>{wortKarte()}</p>)}

            <p>{karte.plural ? "die " + karte.plural : ""}</p>
            {karte.type === "Verb" ? (<div className='flex  flex-col justify-center items-center'>
                <p className='underline mt-2'>{(karte.prasens[0] !== "" || karte.prasens[1] !== "" || karte.prasens[2] !== "" || karte.prasens[3] !== "" || karte.prasens[4] !== "" || karte.prasens[5] !== "" ) ? "Präsens" : ""}</p>
                <div class="grid grid-cols-3 justify-items-center">
                    <p className='mx-1 text-sm'>{karte.prasens[0]}</p>
                    <p className='mx-1 text-sm'>{karte.prasens[1]}</p>
                    <p className='mx-1 text-sm'>{karte.prasens[2]}</p>
                    <p className='mx-1 text-sm'>{karte.prasens[3]}</p>
                    <p className='mx-1 text-sm'>{karte.prasens[4]}</p>
                    <p className='mx-1 text-sm'>{karte.prasens[5]}</p>
                </div>

                <p className='underline mt-2'>{(karte.prateritum.length !== 0) ? "Präteritum" : ""}</p>
                <div class="grid grid-cols-3 justify-items-center">
                    <p className='mx-1 text-sm'>{karte.prateritum[0]}</p>
                    <p className='mx-1 text-sm'>{karte.prateritum[1]}</p>
                    <p className='mx-1 text-sm'>{karte.prateritum[2]}</p>
                    <p className='mx-1 text-sm'>{karte.prateritum[3]}</p>
                    <p className='mx-1 text-sm'>{karte.prateritum[4]}</p>
                    <p className='mx-1 text-sm'>{karte.prateritum[5]}</p>
                </div>

                {karte.partizip2 ? 
                    (<p className='underline mt-2'>Partizip II</p>):("")
                }
                <p className='text-sm'>{karte.partizip2}</p></div>) : ""}

            {karte.bild && (karte.bild[0] === "/" | karte.bild[0].toLowerCase() === "h") ? (
                <>
                    <div className='w-60 h-auto my-4'>
                        <Image src={karte.bild} alt={wortKarte()} width={240} height={240} className='rounded-2xl' />
                    </div>
                </>
            ) : (<div className='my-3' />)}
            <p className='mb-4'>{karte.verwandte}</p>
            <p className='mx-4 mb-4 text-center'>{karte.beispiel}</p>
            <p onClick={toggleUbersetzung} className='mb-5 bg-black-card p-1 rounded-md cursor-pointer text-sm'>{showUbersetzung ? karte.ubersetzung : "Übersetzung"}</p>
        </div>
    );
}

export default Karte;