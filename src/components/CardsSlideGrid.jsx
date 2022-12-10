import { useParams } from "react-router-dom";



export function CardsSlideGrid(){

    const {letterId} =useParams();
    const wortschatzkartei = require("./Wortschatzkartei.json");
    const filterWortschatzkartei =wortschatzkartei.filter(e => e.anfangsbuchstabe == letterId);

    
    for (const i in filterWortschatzkartei) {
        if (filterWortschatzkartei[i].typ == "Verb") {
            var verben = filterWortschatzkartei[i];
        }
    }


    console.log(verben);
    return "Hecho mi pana";
}