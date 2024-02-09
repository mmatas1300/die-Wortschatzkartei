import { useState } from "react";

function PlayScreen({stats}) {

    const [cards, setCards] = useState();

    const getCards = async () => {
        //trae cartas
        if (session.user.config.cardsSet === "app") {
            const responseCards = await fetch('/api/cards');
            const dataCards = await responseCards.json();
            setCards(dataCards)
            return dataCards
        } else { //personal cards
            const responseCards = await fetch('/api/user/cards', {
                method: "POST", // 
                body: JSON.stringify({ email: session.user.email }), // 
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const dataCards = await responseCards.json()
            setCards(dataCards)
            return dataCards
        }
    }


    return(
        <div>
            <div>{JSON.stringify(stats)}</div>
            <div>Card</div>
            <button>Wiederholen</button>
            <button>Nächste</button>
        </div>
    );
}

export default PlayScreen