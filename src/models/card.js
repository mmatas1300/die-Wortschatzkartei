import { Schema, model, models } from "mongoose";

const verbCardSchema = new Schema({
    type: String,
    wort: {type: String, unique: true, required: true},
    prasens: [String],
    prateritum:[String],
    partizip2: String,
    bild: String,
    verwandte: String,
    beispiel: String,
    ubersetzung: String
})

const nomenCardSchema = new Schema({
    type: String,
    wort: {type: String, unique: true, required: true},
    plural: String,
    bild: String,
    verwandte: String,
    beispiel: String,
    ubersetzung: String
})

const nomenMUFCardSchema = new Schema({
    type: String,
    wort: {type: String, unique: true, required: true},
    manner: String,
    frau: String,
    frauen: String,
    bild: String,
    verwandte: String,
    beispiel: String,
    ubersetzung: String
})

const andereCardSchema = new Schema({
    type: String,
    wort: {type: String, unique: true, required: true},
    bild: String,
    verwandte: String,
    beispiel: String,
    ubersetzung: String
})

const AndereCard = models.AndereCard || model('AndereCard', andereCardSchema,'cards'); 

const NomenMUFCard = models.NomenMUFCard || model('NomenMUFCard', nomenMUFCardSchema,'cards'); 

const NomenCard = models.NomenCard || model('NomenCard', nomenCardSchema,'cards'); 

const VerbCard = models.VerbCard || model('VerbCard', verbCardSchema,'cards'); //Si ya existe un modelo reutilizalo

export {NomenCard,VerbCard,NomenMUFCard,AndereCard}

