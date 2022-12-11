import styles from "./CardsSlide.module.css";

export function CardsSlide({card}){
    
    if(card.type=="Nomen-das"){
        var cardStyleColor = styles.karteNomenDas;
    }else if(card.type=="Nomen-der"){
        cardStyleColor = styles.karteNomenDer;
    }else if(card.type=="Nomen-die"){
        cardStyleColor = styles.karteNomenDie;
    }else if(card.type=="Nomen-2"){
        cardStyleColor = styles.karteNomen2;
    }else if(card.type=="Verbe"){
        cardStyleColor = styles.karteVerbe;
    }

    return <div className={`${cardStyleColor} ${styles.karte}`}>
        
        <li className={styles.typ}>{card.typ}</li>

        <li className={styles.sg}>{card.sg}</li>
        <li className={styles.pl}>{card.pl}</li>


        <li className={styles.infinitiv}>{card.infinitiv}</li>
        <li className={styles.präsens1}>{card.präsens1}</li>
        <li className={styles.präsens2}>{card.präsens2}</li>
        <li className={styles.präsens3}>{card.präsens3}</li>
        <li className={styles.präsens4}>{card.präsens4}</li>
        <li className={styles.präsens5}>{card.präsens5}</li>
        <li className={styles.präsens6}>{card.präsens6}</li>

        <li className={styles.mann}>{card.mann}</li>
        <li className={styles.manner}>{card.manner}</li>
        <li className={styles.frau}>{card.frau}</li>
        <li className={styles.frauen}>{card.frauen}</li>

        <li className={styles.verwandte}>{card.verwandte}</li>
        <li className={styles.beispiel}>{card.beispiel}</li>

    </div>;
}


