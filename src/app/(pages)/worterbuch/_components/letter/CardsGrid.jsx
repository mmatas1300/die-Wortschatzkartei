import { Spinner } from "@material-tailwind/react";
import Karte from "@/components/Karte";

const CardsGrid = ({cards}) => {
    return (
        <div className="flex flex-row flex-wrap justify-center items-center mt-12">
            {cards ? (cards.length != 0 ?
                (cards.map(card => <div key={card._id} className="m-5 hover:scale-105 transition-all"><Karte {...card} /></div>)) : (
                    <h1 className="mt-[calc(30vh)]">Oh, es ist leer</h1>
                )
            ) : (<Spinner className="mt-[calc(30vh)] h-10 w-10" />)}
        </div>
    );
};

export default CardsGrid; 