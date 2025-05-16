import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: String,
    password:String,
    myCards:[Schema.Types.Mixed],
    config:{nick:String, cardsSet:String, cardsPerDay: Number, ponsSecret: String},
    streak: [{dayPlayed: Date, cardsPlayed: Number}],
    progress:[{cardId: Schema.Types.ObjectId, level: Number, practiceDate: Date}],
})

const User = models.User || model('User', userSchema,'users');

export default User;