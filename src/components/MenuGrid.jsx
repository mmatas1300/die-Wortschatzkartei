import styles from "./MenuGrid.module.css";
import { CardMenuGrid } from "./CardMenuGrid.jsx";


export function MenuGrid(){

    const alph =["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

    return (<ul className={styles.menuGrid}>
        {alph.map((letter) => (<CardMenuGrid letter={letter}/>))}
    </ul>
    );
}