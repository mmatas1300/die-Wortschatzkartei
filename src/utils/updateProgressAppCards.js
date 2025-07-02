export const updateProgressAppCards = (cards, userProgress) => {
    return cards.map((card) => {
        const progressFound = userProgress.find((element) => {
            return card._id === element.cardId;
        })
        card.level = progressFound.level;
        card.lastPlayedDate = progressFound.lastPlayedDate;
        return card;
    })
};