import { useParams } from "react-router-dom";
import { CardsSlide } from "./CardsSlide.jsx";

export function CardsSlideGrid(){

    const {letterId} =useParams();
    const wortschatzkartei = require("./Wortschatzkartei.json");
    const filterWortschatzkartei =wortschatzkartei.filter(e => e.anfangsbuchstabe == letterId);  
    return (<ul>
        {filterWortschatzkartei.map((card) => (<CardsSlide card={card}/>))}
    </ul>
    );
}