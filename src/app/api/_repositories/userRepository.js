import {connectDB}  from "@/services/mongodb";
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

export const userFindByEmail = async (email)=>{
    await connectDB();
    const userFound = await User.findOne({ email });
    return userFound;
};

export const userCreate = async (user) =>{
    await connectDB();
    await user.save();
};

/**
 * Delete a user card by its ID
 * @param {string} userId 
 * @param {string} cardId 
 * @returns {Promise<void>}
 */
export const userCardDeleteById = async (userId, cardId) =>{
    await connectDB();
    await User.updateOne({ _id: userId },{ $pull: { userCards: { _id: cardId } } });
}

/**
 * Create a user card
 * @param {string} userId 
 * @param {Types.Card} card 
 * @returns {Promise<void>}
 */
export const userCardCreate = async (userId,card)=>{
    await connectDB();
    await User.findOneAndUpdate({ _id: userId }, { $push: { userCards: card } });
}

export const userCardsDeleteByIds = async (userId,cardsIds)=>{
    await connectDB();
    await User.updateOne({ _id: userId },{ $pull: { userCards: { _id: { $in: cardsIds } } } });
}

export const userCardsCreate = async (userId,cards)=>{
    await connectDB();
    await User.updateOne({ _id: userId }, { $push: { userCards: { $each: cards } } });
}

export const userStreakUpdate = async (userId, date, cardsPlayed)=>{
    await connectDB();
    await User.updateOne({_id: userId}, {$push: {streak: {dayPlayed: date, cardsPlayed: cardsPlayed}} });
}

export const userConfigUpdate = async (userId,config)=>{
    await connectDB();
    await User.findByIdAndUpdate(userId, {config: config});
};

export const userProgressDeleteByIds = async (userId,cardIds)=>{
    await connectDB();
    await User.updateOne({_id: userId}, {$pull: { progressAppCards: { cardId: { $in: cardIds } } }});
};

export const userProgressCreate = async (userId, progress)=>{
    await connectDB();
    await User.updateOne({_id: userId}, {$push: {progressAppCards: {$each: progress}}});
};