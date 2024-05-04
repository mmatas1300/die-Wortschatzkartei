import ReactFlipCard from 'reactjs-flip-card'
import Karte from '../Karte';

const FlipCard = ({ card , flipCard, setFlipCard, vanish, richtigButton, falschButton }) => {

    const frontCardColor =()=>{
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

    return (
        <div className={`flex flex-col justify-center items-center ${vanish?"opacity-0 invisible":"opacity-100 visible"} transition ease-in-out delay-75 -mt-[450px]`}>
            <ReactFlipCard flipTrigger={'disabled'} flipByProp={flipCard}
                frontComponent={
                    <div className='flex flex-col justify-center items-center'>
                        <div className={`${frontCardColor()} p-32 rounded-3xl`}>{card.wort}</div>
                        <button onClick={setFlipCard} className={`bg-black-card border-2 border-green-card  ${flipCard?"opacity-0 invisible":"opacity-100 visible"}`}>Wenden</button>
                    </div>
                }
                backComponent={
                    <>
                        <Karte {...card} />
                        <div className={`flex flex-row justify-center items-center space-x-8 mt-3 ${vanish?"opacity-0 invisible":"opacity-100 visible"}`}>
                            <button onClick={falschButton} className="bg-black-card border-2 border-red-card">Falsch</button>
                            <button onClick={richtigButton} className="bg-black-card border-2 border-green-card">Richtig</button>
                        </div>
                    </>
                }
            />
        </div>
    )
}

export default FlipCard;