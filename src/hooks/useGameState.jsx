import { useState } from "react";

export const useGameState = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);

    return {gameStarted, setGameStarted, gameFinished, setGameFinished}
}

