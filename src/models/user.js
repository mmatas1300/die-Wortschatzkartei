import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: String,
    password:String,
    myCards:[Schema.Types.Mixed],
    config:{nick:String, cardsSet:String},
    lastPlay: {type:Date}
})

const User = models.User || model('User', userSchema,'users'); //Si ya existe un modelo reutilizalo

export default User