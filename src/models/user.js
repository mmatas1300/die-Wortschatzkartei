import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: String,
    password:String,
    progress: [{cardId: Schema.Types.ObjectId, phase: Number, date: Date}],
    myCards:[Schema.Types.Mixed],
    config:{nick:String, cardsSet:String}
          
})

const User = models.User || model('User', userSchema,'users'); //Si ya existe un modelo reutilizalo

export default User