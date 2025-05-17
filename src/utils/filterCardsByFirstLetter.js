export const filterCardsByFirstLetter = (expRegFirstLetter, cards)=>{
        return cards.filter((card) => {
                return expRegFirstLetter.test(card.wort.toLowerCase());
        });
}