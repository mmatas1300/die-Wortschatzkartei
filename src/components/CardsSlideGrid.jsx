import { useParams } from "react-router-dom";
import { CardsSlide } from "./CardsSlide.jsx";
import styles from "./CardsSlideGrid.module.css";
import { Fade } from "react-awesome-reveal";


export function CardsSlideGrid(){
    const {letterId} =useParams();
    const wortschatzkartei = require("./Wortschatzkartei.json");
    const filterWortschatzkartei =wortschatzkartei.filter(e => e.anfangsbuchstabe === letterId);
    filterWortschatzkartei.sort(( a, b ) => {return a.wort < b.wort ? -1 : a.wort > b.wort ? 1 : 0});
    return (<Fade cascade damping={0.02} triggerOnce><ul className={styles.cardsGrid}>
        {filterWortschatzkartei.map((card) => (<CardsSlide key={card.id} card={card}/>))}
    </ul></Fade>
    );
}