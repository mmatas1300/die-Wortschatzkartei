import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: String,
    password:String,
    userCards:[Schema.Types.Mixed],
    config:{nick:String, cardsSet:String, cardsPerDay: Number, ponsSecret: String},
    streak: [{lastPlayedDate: Date, cardsPlayed: Number}],
    progressAppCards:[{cardId: Schema.Types.ObjectId, level: Number, lastPlayedDate: Date}],
})

const User = models.User || model('User', userSchema,'users');

export default User;