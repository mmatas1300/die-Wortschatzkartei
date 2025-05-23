import ReactFlipCard from 'reactjs-flip-card'
import Karte from '@/components/Karte';
import { useSoundEffect } from "./useSoundEffect";
import CircularChart from '@/components/karteneditor/CircularChart';

const FlipCard = ({ card, flipCard, setFlipCard, vanish, richtigButton, falschButton }) => {

    const { flipCardPlay } = useSoundEffect();

    const frontCardColor = () => {
        switch (card.type) {
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
    }

    const getCardWort = () => {
        if (card.type === "Nomen-das")
            return "das " + card.wort;
        else if (card.type === "Nomen-der" || card.type === "Nomen-MUF")
            return "der " + card.wort;
        else if (card.type === "Nomen-die" || card.type === "Nomen-pl")
            return "die " + card.wort;
        else
            return card.wort;
    }

    const getBorder = ()=>{
        if(card.level < 3)
            return ""; 
        else if (card.level > 2 && card.level<5)
            return 'animate-glowLvl34';
        else if (card.level > 4 && card.level < 7)
            return 'animate-glowLvl56';
        else if (card.level == 7)
            return 'animate-glowLvl7';

    }


    return (
        <ReactFlipCard flipTrigger={'disabled'} flipByProp={flipCard} containerCss={`flex flex-col justify-center items-center ${vanish ? "opacity-0 invisible" : "opacity-100 visible"} transition ease-in-out delay-75 basis-1/2`}
            frontComponent={
                <div className='flex flex-col justify-center items-center'>
                    <div className={`${frontCardColor()} w-80 h-72 rounded-3xl flex flex-col justify-center items-center relative ${getBorder()} `}>
                        <div className='absolute w-10 -translate-y-28 translate-x-32'>
                            <CircularChart level={card.level} type={card.type}/>
                        </div>
                        {getCardWort()}
                    </div>
                    <button onClick={() => { setFlipCard(true); flipCardPlay(); }} className={`bg-black-card border-2 border-green-card  ${flipCard ? "opacity-0 invisible" : "opacity-100 visible"}`}>Wenden</button>
                </div>
            }
            backComponent={
                <div className={`flex flex-col justify-center items-center`}>
                    <div className={`relative rounded-3xl ${getBorder()}`}>
                        <Karte {...card} />
                    </div>

                    <div className={`flex flex-row justify-center items-center space-x-8 mt-3 ${vanish ? "opacity-0 invisible" : "opacity-100 visible"}`}>
                        <button onClick={falschButton} className="bg-black-card border-2 border-red-card">Falsch</button>
                        <button onClick={richtigButton} className="bg-black-card border-2 border-green-card">Richtig</button>
                    </div>
                </div>
            }
        />
    )
}

export default FlipCard;