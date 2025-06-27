export const filterCardsByRegExp = (expRegFirstLetter, cards)=>{
        return cards.filter((card) => {
                return expRegFirstLetter.test(card.word.toLowerCase());
        });
}