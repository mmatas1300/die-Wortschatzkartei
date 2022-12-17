import styles from "./MenuGrid.module.css";
import { CardMenuGrid } from "./CardMenuGrid.jsx";
import { Fade } from "react-awesome-reveal";


export function MenuGrid(){

    const alph =["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","R","S","T","U","V","W","Z"];

    return (<Fade triggerOnce><ul className={styles.menuGrid}>
        {alph.map((letter) => (<CardMenuGrid key={letter} letter={letter}/>))}
    </ul></Fade>
    );
}