import {Link} from "react-router-dom";
import styles from "./CardMenuGrid.module.css";

export function CardMenuGrid({letter}){
    return <Link to={"/"+letter}>
        <li className={styles.cardMenuGrid}>{letter}</li></Link>
} 