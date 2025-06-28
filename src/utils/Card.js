export class Card {
    _id
    type
    word
    image
    related
    example
    translation
    level
    lastPlayedDate

    constructor({ _id, type, word, image, related, example, translation, level, lastPlayedDate }) {
        this._id = _id;
        this.type = type;
        this.word = word;
        this.image = image;
        this.related = related;
        this.example = example;
        this.translation = translation;
        this.level = level;
        this.lastPlayedDate = lastPlayedDate;
    }

    getFullWord() {
        return this.word;
    }

    getColor() {
        switch (this.type) {
            case "NeuterNoun":
                return "bg-green-card";
            case "MasculineNoun":
                return "bg-blue-card";
            case "FeminineNoun":
                return "bg-red-card";
            case "PluralNoun":
                return "bg-yellow-card";
            case "MFNoun":
                return "bg-gradient-to-r from-blue-card to-red-card";
            case "Verb":
                return `bg-orange-card`;
            default:
                return "bg-purple-card";
        }
    }
}

export class NounPluralCard extends Card {
    constructor({ _id, word, image, related, example, translation, level, lastPlayedDate }) {
        super({ _id, type: "PluralNoun", word, image, related, example, translation, level, lastPlayedDate });
    }

    getFullWord() {
        return "die " + this.word;
    }
}

export class NounCard extends Card {
    plural

    constructor({ _id, type, word, plural, image, related, example, translation, level, lastPlayedDate }) {
        super({ _id, type, word, image, related, example, translation, level, lastPlayedDate });
        this.plural = plural;
    }

    getFullWord() {
        switch (this.type) {
            case "NeuterNoun":
                return "das " + this.word;
            case "MasculineNoun":
                return "der " + this.word;
            case "FeminineNoun":
                return "die " + this.word;
        }
    }
}

export class VerbCard extends Card {
    present
    past
    participle2

    constructor({ _id, word, present, past, participle2, image, related, example, translation, level, lastPlayedDate }) {
        super({ _id, type: "Verb", word, image, related, example, translation, level, lastPlayedDate });
        this.present = present;
        this.past = past;
        this.participle2 = participle2;
    }
}

export class NounMFCard extends Card {
    masculinePlural
    feminineSingular
    femininePlural

    constructor({ _id, word, image, related, example, translation, masculinePlural, femininePlural, feminineSingular, level, lastPlayedDate }) {
        super({ _id, type: "MFNoun", word, image, related, example, translation, level, lastPlayedDate });
        this.masculinePlural = masculinePlural;
        this.feminineSingular = feminineSingular;
        this.femininePlural = femininePlural;
    }

    getFullWord() {
        return "der " + this.word;
    }
}