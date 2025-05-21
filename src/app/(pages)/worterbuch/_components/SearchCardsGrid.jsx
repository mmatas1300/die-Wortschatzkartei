import Karte from "@/components/Karte";

const SearchCardsGrid = ({ cards }) => {
    return (
        <div className="flex flex-row flex-wrap justify-center items-center mt-4">
            {cards.map((card) => {
                return (
                    <div key={card._id} className="m-5 hover:scale-105 transition-all">
                        <Karte {...card} />
                    </div>
                )
            })}
        </div>
    );
};

export default SearchCardsGrid;