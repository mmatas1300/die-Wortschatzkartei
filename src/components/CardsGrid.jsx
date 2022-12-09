import { CardTopic } from "./CardTopic.jsx";
import Cards from "./Cards.json";

export function CardsGrid(){
    const details = require('./Cards.json');
    console.log(details);
    return (
        <ul>
            {Cards.map((card) => (<CardTopic key={card.id} card={card}/>))}
        </ul>
    );
}