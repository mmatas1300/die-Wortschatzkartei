import ReactFlipCard from 'reactjs-flip-card'
import { useSoundEffect } from "../../../../hooks/useSoundEffect";
import CircularChart from '@/components/CircularChart';
import Card from '@/components/Card';

const FlipCard = ({ card, flipCard, setFlipCard, vanish, correctButton, incorrectButton }) => {

    const { flipCardSound } = useSoundEffect();

    const cardBorderLevel = (card)=>{
        if(card.level < 3)
            return ""; 
        else if (card.level > 2 && card.level<5)
            return 'animate-glowLvl34';
        else if (card.level > 4 && card.level < 7)
            return 'animate-glowLvl56';
        else if (card.level == 7)
            return 'animate-glowLvl7';
    };

    return (
        <ReactFlipCard flipTrigger={'disabled'} flipByProp={flipCard} containerCss={`flex flex-col justify-center items-center ${vanish ? "opacity-0 invisible" : "opacity-100 visible"} transition ease-in-out delay-75 basis-1/2`}
            frontComponent={
                <div className='flex flex-col justify-center items-center'>
                    <div className={`${card.getColor()} w-80 h-72 rounded-3xl flex flex-col justify-center items-center relative ${cardBorderLevel(card)} `}>
                        <div className='absolute w-10 -translate-y-28 translate-x-32'>
                            <CircularChart level={card.level} type={card.type}/>
                        </div>
                        {card.getFullWord()}
                    </div>
                    <button onClick={() => { setFlipCard(true); flipCardSound(); }} className={`bg-black-card border-2 border-green-card  ${flipCard ? "opacity-0 invisible" : "opacity-100 visible"}`}>Wenden</button>
                </div>
            }
            backComponent={
                <div className={`flex flex-col justify-center items-center`}>
                    <div className={`relative rounded-3xl ${cardBorderLevel(card)}`}>
                        <Card card={card} />
                    </div>

                    <div className={`flex flex-row justify-center items-center space-x-8 mt-3 ${vanish ? "opacity-0 invisible" : "opacity-100 visible"}`}>
                        <button onClick={incorrectButton} className="bg-black-card border-2 border-red-card">Falsch</button>
                        <button onClick={correctButton} className="bg-black-card border-2 border-green-card">Richtig</button>
                    </div>
                </div>
            }
        />
    )
}

export default FlipCard;