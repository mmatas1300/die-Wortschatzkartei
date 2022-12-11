import styles from "./CardMenuGrid.module.css";
import {Link} from "react-router-dom";

export function CardMenuGrid({letter}){
    return <Link to={"/"+letter}>
        <li className={styles.cardMenuGrid}>{letter}</li></Link>
} 