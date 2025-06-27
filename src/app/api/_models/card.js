import { Schema, model, models } from "mongoose";

const cardSchema = new Schema({
    type: String,
    word: String,
    plural: String,
    image: String,
    related: String,
    example: String,
    translation: String,
    present: [String],
    past: [String],
    participle2: String,
    masculinePlural: String,
    feminineSingular: String,
    femininePlural: String,
})

const Card = models.Card || model('Card', cardSchema,'cards'); 


export {Card};