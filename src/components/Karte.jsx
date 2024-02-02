'use client'
import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';
import style from '@/components/Karte.module.css'

function Karte() {

    const [isFlipped, setIsFlipped] = useState(false);


    return (
        <div className='flex flex-col justify-center items-center'>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div className={`${style.karte} flex  flex-col justify-center items-center`}>
                    das Kind
                </div>

                <div className={`${style.karte} flex  flex-col justify-center items-center`}>
                    <p>Nomen</p>
                    <p>das Kind</p>
                    <p>die Kinder</p>
                    <p>bild</p>
                    <p>das Mädchen</p>
                    <p>Er ist ein Kind</p>
                    <p>Kid | Niño</p>
                </div>
            </ReactCardFlip>
            <button className={`${style.flipButton} ${isFlipped? "hidden" : ""}`} onClick={()=>{setIsFlipped(true)}}>Umdrehen</button>   

        </div>

    );
}

export default Karte