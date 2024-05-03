import ReactFlipCard from 'reactjs-flip-card'
import Karte from '../Karte';
import { useState } from 'react';

const FlipCard = ({ card }) => {

    const [flipCard, setFlipCard] = useState(false);

    return (

        <div>
            <ReactFlipCard flipTrigger={'disabled'} flipByProp={flipCard}
                frontComponent={
                    <div className='flex flex-col justify-center items-center'>
                        <div className='bg-red-600 p-32'>{card.wort}</div>
                        <button onClick={() => setFlipCard(true)}>Wenden</button>
                    </div>
                }

                backComponent={
                    <>
                        <Karte {...card} />
                        <div className="flex flex-row justify-center items-center space-x-8 mt-4">
                            <button className="bg-black-card border-2 border-red-card">Falsch</button>
                            <button className="bg-black-card border-2 border-green-card">Richtig</button>
                        </div>
                    </>
                }
            />
        </div>
    )
}

export default FlipCard;