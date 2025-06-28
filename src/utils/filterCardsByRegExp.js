export const filterCardsByRegExp = (expReg, cards)=>{
        return cards.filter((card) => {
                return expReg.test(card.word.toLowerCase());
        });
}