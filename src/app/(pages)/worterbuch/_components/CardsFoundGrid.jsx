import Card from "@/components/Card";

const CardsFoundGrid = ({ cards }) => {
    return (
        <div className="flex flex-row flex-wrap justify-center items-center mt-4">
            {cards.map((card) => {
                return (
                    <div key={card._id} className="m-5 hover:scale-105 transition-all">
                        <Card card={card} />
                    </div>
                )
            })}
        </div>
    );
};

export default CardsFoundGrid;