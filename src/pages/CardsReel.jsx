import {useParams} from "react-router-dom";
import {FaArrowCircleLeft} from "react-icons/fa";
import { BrowserRouter as Router, Routes,  Route, Link} from "react-router-dom";
import styles from "./CardReel.module.css";

export function CardsReel(){
    const {letterId} =useParams();
    return <div className={styles.headPage}>
        <Link to="/die-Wortschatzkartei/" className={styles.backButton}><FaArrowCircleLeft size={35} /></Link>
        <h1 className={styles.titlePage}>Wörter mit {letterId}</h1>
    </div>;
}