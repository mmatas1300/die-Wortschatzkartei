'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BookText } from 'lucide-react';
import { useSession } from 'next-auth/react';
import PonsContainerCard from '@/components/Pons/PonsContainerCard';

const Card = ({ card }) => {

    const { data: session, status } = useSession();
    const [showTranslation, setShowTranslation] = useState(false);
    const [showPonsCard, setShowPonsCard] = useState(false);

    const toggleTranslation = () => {
        setShowTranslation(true);
    };

    const togglePonsCard = () => {
        setShowPonsCard(!showPonsCard)
    };

    useEffect(() => {
        setShowTranslation(false);
        setShowPonsCard(false);
    }, [card]);

    return (
        <div className={`flex flex-col justify-center items-center w-80  rounded-3xl text-xl ${card.getColor()}`}>
            <div className='flex flex-row justify-between items-center  mt-4 w-64'>
                {status == "authenticated" && session.user.config.ponsSecret ?
                    <div className='relative inline-block'>
                        <button onClick={togglePonsCard} className='bg-black-card p-1 rounded-md'>
                            <BookText size={20} />
                        </button>
                        {showPonsCard ? <PonsContainerCard word={card.word} /> : <></>}
                    </div>
                    : <></>}
                <p className="underline">{card.getType()}</p>
            </div>

            {card.type === "MFNoun" ? (
                <div className='grid grid-cols-2 justify-items-center'>
                    <p className='mx-2 text-sm' >{card.getFullWord()}</p>
                    <p className='mx-1 text-sm' >{"die " + card.feminineSingular}</p>
                    <p className='mx-2 text-xs' >{"die " + card.masculinePlural}</p>
                    <p className='mx-1 text-xs' >{"die " + card.femininePlural}</p>
                </div>
            ) : (<p className='text-xl'>{card.getFullWord()}</p>)}

            <p>{card.plural ? "die " + card.plural : ""}</p>
            {card.type === "Verb" ? (
                <div className='flex  flex-col justify-center items-center'>
                    <p className='underline mt-2'>{(card.present[0] !== "" || card.present[1] !== "" || card.present[2] !== "" || card.present[3] !== "" || card.present[4] !== "" || card.present[5] !== "") ? "Präsens" : ""}</p>
                    <div class="grid grid-cols-3 justify-items-center">
                        <p className='mx-1 text-sm'>{card.present[0]}</p>
                        <p className='mx-1 text-sm'>{card.present[1]}</p>
                        <p className='mx-1 text-sm'>{card.present[2]}</p>
                        <p className='mx-1 text-sm'>{card.present[3]}</p>
                        <p className='mx-1 text-sm'>{card.present[4]}</p>
                        <p className='mx-1 text-sm'>{card.present[5]}</p>
                    </div>

                    <p className='underline mt-2'>{(card.past.length !== 0) ? "Präteritum" : ""}</p>
                    <div class="grid grid-cols-3 justify-items-center">
                        <p className='mx-1 text-sm'>{card.past[0]}</p>
                        <p className='mx-1 text-sm'>{card.past[1]}</p>
                        <p className='mx-1 text-sm'>{card.past[2]}</p>
                        <p className='mx-1 text-sm'>{card.past[3]}</p>
                        <p className='mx-1 text-sm'>{card.past[4]}</p>
                        <p className='mx-1 text-sm'>{card.past[5]}</p>
                    </div>

                    {card.participle2 ?
                        (<p className='underline mt-2'>Partizip II</p>) : ("")
                    }
                    <p className='text-sm'>{card.participle2}</p></div>) : ""}

            {card.image && (card.image[0] === "/" | card.image[0].toLowerCase() === "h") ? (
                <>
                    <div className='w-60 h-auto my-4'>
                        <Image src={card.image} alt={card.getFullWord()} width={240} height={240} className='rounded-2xl' />
                    </div>
                </>
            ) : (<div className='my-3' />)}
            <p className='mb-4'>{card.related}</p>
            <p className='mx-4 mb-4 text-center'>{card.example}</p>
            <p onClick={toggleTranslation} className='mb-5 bg-black-card p-1 rounded-md cursor-pointer text-sm'>{showTranslation ? card.translation : "Übersetzung"}</p>
        </div>
    );
}

export default Card;