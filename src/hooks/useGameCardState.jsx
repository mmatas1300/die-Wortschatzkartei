import { useState } from "react";

export const useGameCardState = () => {
    const [flipCard, setFlipCard] = useState(false);
    const [vanish, setVanish] = useState(false);

    return {flipCard, setFlipCard, vanish, setVanish};
}