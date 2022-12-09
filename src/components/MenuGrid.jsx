import styles from "./MenuGrid.module.css";

export function MenuGrid(){
    const alph =["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    return <ul className={styles.menuGrid}>
        {alph.map((letter) => (<li className={styles.elementGrid}>{letter}</li>))}
    </ul>;
}


