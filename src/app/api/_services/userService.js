import { userCardCreate, userCardDeleteById, userCardsCreate, userCardsDeleteByIds, userConfigUpdate, userProgressCreate, userProgressDeleteByIds, userStreakUpdate } from "@/app/api/_repositories/userRepository";
import { encrypt } from "@/libs/encrypt";
import { filterCardsByFirstLetter } from "@/utils/filterCardsByFirstLetter";


export const deleteUserCard = async (userId, cardId) => {
        await userCardDeleteById(userId, cardId);
};

export const getUserCards = async (userId) => {
        const userFound = await userFindById(userId);
        return userFound.myCards;
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

export const updateUserConfig = async (userId, config)=>{
        config.ponsSecret = encrypt(config.ponsSecret, process.env.CRYPTO_KEY);
        await userConfigUpdate(userId,config);
};

export const getUserStreak = async (userId)=>{
        const userFound = await userFindById(userId);
        return userFound.streak;
};

export const getUserLastGame = async (userId)=>{
        const userStreak = await getUserStreak(userId);
        return userStreak[userStreak.length-1];

};

export const getUserProgress = async (userId)=>{
        const userFound = await userFindById(userId);
        return userFound.progress;
};

export const updateUserProgress = async (userId, progress)=>{
        const cardsIds = progress.map((elemento)=>{return elemento.cardId});
        await userProgressDeleteByIds(userId,cardsIds);
        await userProgressCreate(userId,progress);
};

export const updateAppCardsProgress = async (userId,progress,date)=>{
        await updateUserProgress(userId, progress);
        await userStreakUpdate(userId,date,progress.length);
};