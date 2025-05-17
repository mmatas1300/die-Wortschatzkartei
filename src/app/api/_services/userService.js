import { userCardCreate, userCardDeleteById, userCardFindAll, userCardsCreate, userCardsDeleteByIds, userStreakUpdate } from "@/app/api/_repositories/userRepository";

export const deleteUserCard = async (userId, cardId) => {
        await userCardDeleteById(userId, cardId);
};

export const getUserCards = async (userId) => {
        const userCards = await userCardFindAll(userId);
        return userCards;
};

export const updateUserCard = async (userId, card) => {
        if (card._id) await userCardDeleteById(userId, card._id);
        await userCardCreate(userId, card);
};

export const updateUserCardsProgress = async (userId, cards, date) => {
        const cardsIds = cards.map((card) => { return card._id })
        await userCardsDeleteByIds(userId, cardsIds);
        await userCardsCreate(userId, cards);
        await userStreakUpdate(userId, date, cards.length);
};


export const getUserCardsByQuery = async (userId, query) => {
        const regExp = new RegExp(`.*${query.toLowerCase()}.*`);
        const userCards = await getUserCards(userId);
        const filterCards = userCards.filter((card) => {
                return regExp.test(card.wort.toLowerCase()) || regExp.test(card.beispiel.toLowerCase()) || regExp.test(card.verwandte.toLowerCase())
        });
        return filterCards;
};

export const getUserCardsByFirstLetter = async (userId, firstLetter) => {
        const regExpFirstLetter = new RegExp("^" + firstLetter.toLowerCase());
        const userCards = await getUserCards(userId);
        const filterCards = filterCardsByFirstLetter(regExpFirstLetter,userCards);
        switch (firstLetter.toLowerCase()) {
                case "a":
                        return filterCards.concat(filterCardsByFirstLetter(new RegExp("^ä"),userCards))
                case "o":
                        return filterCards.concat(filterCardsByFirstLetter(new RegExp("^ö"),userCards))
                case "u":
                        return filterCards.concat(filterCardsByFirstLetter(new RegExp("^ü"),userCards))
        }
        return filterCards;
};


///????????
const filterCardsByFirstLetter = (expRegFirstLetter, cards)=>{
        return cards.filter((card) => {
                return expRegFirstLetter.test(card.wort.toLowerCase());
        });
}



//Revisión futura
export const createUserCard = async (userId, card) => {
        await userCardCreate(userId, card);
};