import { userCardCreate, userCardDeleteById, userCardsCreate, userCardsDeleteByIds, userConfigUpdate, userCreate, userFindByEmail, userFindById, userProgressCreate, userProgressDeleteByIds, userStreakUpdate } from "@/app/api/_repositories/_mongo/userRepository";
import { bcryptCompare, bcryptHash } from "@/libs/bcrypt";
import { decrypt, encrypt } from "@/libs/crypto";
import { filterCardsByRegExp } from "@/utils/filterCardsByRegExp";
import User from '@/app/api/_models/user';
import { getAllAppCards } from "@/app/api/_services/cardService";


export const deleteUserCard = async (userId, cardId) => {
        await userCardDeleteById(userId, cardId);
};

export const getUserCards = async (userId) => {
        const userFound = await userFindById(userId);
        return userFound.userCards;
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
                return regExp.test(card.word.toLowerCase()) || regExp.test(card.example.toLowerCase()) || regExp.test(card.related.toLowerCase())
        });
        return filterCards;
};

export const getUserCardsByFirstLetter = async (userId, firstLetter) => {
        const regExpFirstLetter = new RegExp("^" + firstLetter.toLowerCase());
        const userCards = await getUserCards(userId);
        const filterCards = filterCardsByRegExp(regExpFirstLetter, userCards);
        switch (firstLetter.toLowerCase()) {
                case "a":
                        return filterCards.concat(filterCardsByRegExp(new RegExp("^ä"), userCards))
                case "o":
                        return filterCards.concat(filterCardsByRegExp(new RegExp("^ö"), userCards))
                case "u":
                        return filterCards.concat(filterCardsByRegExp(new RegExp("^ü"), userCards))
        }
        return filterCards;
};

export const updateUserConfig = async (userId, config) => {
        config.ponsSecret = encrypt(config.ponsSecret, process.env.CRYPTO_KEY);
        await userConfigUpdate(userId, config);
};

export const getUserStreak = async (userId) => {
        const userFound = await userFindById(userId);
        return userFound.streak;
};

export const getUserLastGame = async (userId) => {
        const userStreak = await getUserStreak(userId);
        return userStreak[userStreak.length - 1];

};

export const getUserProgressAppCards = async (userId) => {
        const userFound = await userFindById(userId);
        return userFound.progressAppCards;
};

export const updateUserProgress = async (userId, progress) => {
        const cardsIds = progress.map((elemento) => { return elemento.cardId });
        await userProgressDeleteByIds(userId, cardsIds);
        await userProgressCreate(userId, progress);
};

export const updateAppCardsProgress = async (userId, progress, date) => {
        await updateUserProgress(userId, progress);
        await userStreakUpdate(userId, date, progress.length);
};

export const createUserProgress = async ()=>{
        const cards = await getAllAppCards();
        const progress = cards.map((card)=>{
            return {cardId: card._id, level:0, lastPlayedDate: new Date("2000")}
        });
        return progress;
};

export const signup = async (email, password) => {
        if (!password || password.length < 3)
                throw new Error("Passwörter müssen mindestens 3 Zeichen lang sein");
        const userFound = await userFindByEmail(email);
        if (userFound)
                throw new Error("Diese E-Mail existiert bereits");
        const hashedPassword = await bcryptHash(password);
        const user = new User({
                email,
                password: hashedPassword,
                userCards: [],
                config: {
                        nick: "",
                        cardsSet: "app",
                        cardsPerDay: 10,
                        ponsSecret: "",
                },
                streak: [{ lastPlayedDate: new Date('2000'), cardsPlayed: 0 }],
                progressAppCards: await createUserProgress(),
        });
        await userCreate(user);
        return {message: "Erfolgreiche Registrierung!"};
};

export const authorize = async (email, password) => {
        const userFound = await userFindByEmail(email);
        if (!userFound) throw new Error("Ungültige Daten");
        const passwordMatch = await bcryptCompare(password, userFound.password)
        if (!passwordMatch) throw new Error("Ungültige Daten");
        if(userFound.config.ponsSecret != "")
                userFound.config.ponsSecret = decrypt(userFound.config.ponsSecret, process.env.CRYPTO_KEY);
        const userData = {
                email: userFound.email,
                config: userFound.config,
                _id: userFound._id,
        }
        return userData;
};

export const getUserConfig = async (userId)=>{
        const userFound = await userFindById(userId);
        return userFound.config;
};