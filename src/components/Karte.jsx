'use client'
import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';

function Karte(){

    const [isFlipped, setIsFlipped] = useState(true);

    function FlipCard(){
        setIsFlipped(!isFlipped);
    }

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <div className='bg-blue-gray-400'>
          This is the front of the card.
          <button onClick={FlipCard}>Click to flip</button>
        </div>

        <div className='border-b-deep-orange-700'>
          This is ssssthe back of the card.
          <button onClick={FlipCard}>Click to flip</button>
        </div>

        </ReactCardFlip>

    );
}

export default Karte