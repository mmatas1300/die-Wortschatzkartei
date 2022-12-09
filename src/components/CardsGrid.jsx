import { CardTopic } from "./CardTopic.jsx";
import Cards from "./Cards.json";

export function CardsGrid(){
    return (
        <ul className="{styles.cardsGrid}">
            {Cards.map((card) => (<CardTopic key={card.id} card={card}/>))}
        </ul>
    );
}