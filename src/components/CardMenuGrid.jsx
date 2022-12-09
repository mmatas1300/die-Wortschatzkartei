import styles from "./CardMenuGrid.module.css";
import { BrowserRouter as Router, Routes,  Route, Link} from "react-router-dom";


export function CardMenuGrid({letter}){
    return <Link to={"/die-Wortschatzkartei/"+letter}>
        <li className={styles.cardMenuGrid}>{letter}</li></Link>
} 



