import { useParams } from "react-router-dom";
import { CardsSlide } from "./CardsSlide.jsx";
import styles from "./CardsSlideGrid.module.css";
import { Fade } from "react-awesome-reveal";
import { useState, useEffect } from 'react';

export function CardsSlideGrid(){
    const {letterId} =useParams();
    const [karten, setKarten] = useState([])  
    useEffect(() => {
    fetch("https://die-wortschatzkartei-default-rtdb.firebaseio.com/.json").then((response) => {
        return response.json()
      })
      .then((karten) => {
        setKarten(karten)
      })
  }, [])
    const Wortschatzkartei =karten.filter(e => e.anfangsbuchstabe === letterId);
    Wortschatzkartei.sort(( a, b ) => {return a.wort < b.wort ? -1 : a.wort > b.wort ? 1 : 0});
    return (<Fade cascade damping={0.02} triggerOnce><ul className={styles.cardsGrid}>
        {Wortschatzkartei.map((card) => (<CardsSlide key={card.id} card={card}/>))}
    </ul></Fade>
    );
}