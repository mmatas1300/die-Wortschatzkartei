import styles from "./CardSlidePage.module.css";
import {useParams} from "react-router-dom";
import {FaArrowCircleLeft} from "react-icons/fa";
import {Link} from "react-router-dom";
import { CardsSlideGrid } from "../components/CardsSlideGrid";

export function CardsSlidePage(){
    const {letterId} =useParams();
    return <div>
        <div className={styles.headPage}>
            <Link to="/" className={styles.backButton}><FaArrowCircleLeft size={35} /></Link>
            <h1 className={styles.titlePage}>Wörter mit {letterId}</h1>
        </div>
        <main>
            <CardsSlideGrid />
        </main>
    </div>;
}