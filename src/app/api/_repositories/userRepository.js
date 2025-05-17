import {connectDB}  from "@/libs/mongodb";
import User from '@/app/api/_models/user';
import * as Types from "@/app/types.js"

/**
 * Find a user by ID
 * @param {string} userId 
 * @returns {Promise<Types.User>} userFound
 */
export const userFindById = async (userId)=>{
    await connectDB();
    const userFound = await User.findOne({_id: userId});
    return userFound;
}

/**
 * Delete a user card by its ID
 * @param {string} userId 
 * @param {string} cardId 
 * @returns {Promise<void>}
 */
export const userCardDeleteById = async (userId, cardId) =>{
    await connectDB();
    await User.updateOne({ _id: userId },{ $pull: { myCards: { _id: cardId } } });
}

/**
 * Create a user card
 * @param {string} userId 
 * @param {Types.Card} card 
 * @returns {Promise<void>}
 */
export const userCardCreate = async (userId,card)=>{
    await connectDB();
    await User.findOneAndUpdate({ _id: userId }, { $push: { myCards: card } });
}

export const userCardFindAll = async (userId)=>{
    const userFound = await userFindById(userId);
    return userFound.myCards;
}

export const userCardsDeleteByIds = async (userId,cardsIds)=>{
    await connectDB();
    await User.updateOne({ _id: userId },{ $pull: { myCards: { _id: { $in: cardsIds } } } });
}

export const userCardsCreate = async (userId,cards)=>{
    await connectDB();
    await User.updateOne({ _id: userId }, { $push: { myCards: { $each: cards } } });
}

export const userStreakUpdate = async (userId, date, cardsPlayed)=>{
    await connectDB();
    await User.updateOne({_id: userId}, {$push: {streak: {dayPlayed: date, cardsPlayed: cardsPlayed}} });
}

export const userConfigUpdate = async (userId,config)=>{
    await connectDB();
    await User.findByIdAndUpdate(userId, {config: config});
};

export const userStreakFindById = async (userId)=>{
    const userFound = await userFindById(userId);
    return userFound.streak;
};











