import styles from "./CardsSlide.module.css";

export function CardsSlide({card}){
    
    if(card.type === "Nomen-das"){
        var cardStyleColor = styles.karteNomenDas;
    }else if(card.type === "Nomen-der"){
        cardStyleColor = styles.karteNomenDer;
    }else if(card.type === "Nomen-die"){
        cardStyleColor = styles.karteNomenDie;
    }else if(card.type === "Nomen-2"){
        cardStyleColor = styles.karteNomen2;
    }else if(card.type === "Verbe"){
        cardStyleColor = styles.karteVerbe;
    }else if(card.type === "Nomen-pl"){
        cardStyleColor = styles.karteNomenPl;
    }

    return<li className={`${cardStyleColor} ${styles.karte}`}>
        
        <p className={styles.typ}>{card.typ}</p>

        <p className={styles.sg}>{card.sg}</p>
        <p className={styles.pl}>{card.pl}</p>


        <p className={styles.infinitiv}>{card.infinitiv}</p>
        <p className={styles.präsens1}>{card.präsens1}</p>
        <p className={styles.präsens2}>{card.präsens2}</p>
        <p className={styles.präsens3}>{card.präsens3}</p>
        <p className={styles.präsens4}>{card.präsens4}</p>
        <p className={styles.präsens5}>{card.präsens5}</p>
        <p className={styles.präsens6}>{card.präsens6}</p>

        <p className={styles.mann}>{card.mann}</p>
        <p className={styles.manner}>{card.manner}</p>
        <p className={styles.frau}>{card.frau}</p>
        <p className={styles.frauen}>{card.frauen}</p>

        <p className={styles.verwandte}>{card.verwandte}</p>
        <p className={styles.beispiel}>{card.beispiel}</p>

        <img className={styles.bild} src={card.bild} alt={card.wort} />

    </li>;
}


