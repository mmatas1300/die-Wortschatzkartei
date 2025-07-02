import { Card, NounCard, NounMFCard, NounPluralCard, VerbCard } from "@/utils/Card";

export const createCard = (formData) => {
    if (formData.get('wordNoun')) {
        return new NounCard({
            _id: formData.get('wordNoun') + new Date.now(),
            type: formData.get('type'),
            word: formData.get('wordNoun'),
            plural: formData.get('plural'),
            image: formData.get('image'),
            related: formData.get('related'),
            example: formData.get('example'),
            translation: formData.get('translation'),
            level: 0,
            lastPlayedDate: new Date("2000")
        })
    }
    else if (formData.get('wordPlural')) {
        return new NounPluralCard({
            _id: formData.get('wordPlural') + new Date.now(),
            word: formData.get('wordPlural'),
            image: formData.get('image'),
            related: formData.get('related'),
            example: formData.get('example'),
            translation: formData.get('translation'),
            level: 0,
            lastPlayedDate: new Date("2000")
        })
    }
    else if (formData.get('wordGeneric')) {
        return new Card({
            _id: formData.get('wordGeneric') + new Date.now(),
            type: formData.get('type'),
            word: formData.get('wordGeneric'),
            image: formData.get('image'),
            related: formData.get('related'),
            example: formData.get('example'),
            translation: formData.get('translation'),
            level: 0,
            lastPlayedDate: new Date("2000")
        })
    }
    else if (formData.get('wordMF')) {
        return new NounMFCard({
            _id: formData.get('wordMF') + new Date.now(),
            word: formData.get('wordMF'),
            image: formData.get('image'),
            related: formData.get('related'),
            example: formData.get('example'),
            translation: formData.get('translation'),
            masculinePlural: formData.get('masculinePlural'),
            femininePlural: formData.get('femininePlural'),
            feminineSingular: formData.get('feminineSingular'),
            level: 0,
            lastPlayedDate: new Date("2000")
        })
    }
    else if (formData.get('wordVerb')) {
        const newVerbCard = new VerbCard({
            _id: formData.get('wordVerb') + Date.now(),
            word: formData.get('wordVerb'),
            present: [formData.get('ps1'), formData.get('ps2'), formData.get('ps3'), formData.get('ps4'), formData.get('ps5'), formData.get('ps6')],
            past: [formData.get('pm1'), formData.get('pm2'), formData.get('pm3'), formData.get('pm4'), formData.get('pm5'), formData.get('pm6')],
            participle2: formData.get('participle2'),
            image: formData.get('image'),
            related: formData.get('related'),
            example: formData.get('example'),
            translation: formData.get('translation'),
            level: 0,
            lastPlayedDate: new Date("2000")
        });

        if (formData.get('pm1') === "")
            newVerbCard.past = [];
        return newVerbCard;
    }
};

export const updateCard = (formData, type) => {
    if (formData.get('wortNomen')) {
        const updateCard = {
            type: type,
            wort: formData.get('wortNomen'),
            plural: formData.get('plural'),
            bild: formData.get('image'),
            verwandte: formData.get('related'),
            beispiel: formData.get('example'),
            ubersetzung: formData.get('translation')
        }
        return updateCard
    }

    else if (formData.get('wortAndere')) {
        const updateCard = {
            type: formData.get('typeAndere'),
            wort: formData.get('wortAndere'),
            bild: formData.get('image'),
            verwandte: formData.get('related'),
            beispiel: formData.get('example'),
            ubersetzung: formData.get('translation')
        }
        return updateCard
    }

    else if (formData.get('wortMUF')) {
        const updateCard = {
            type: "Nomen-MUF",
            wort: formData.get('wortMUF'),
            manner: formData.get('manner'),
            frau: formData.get('frau'),
            frauen: formData.get('frauen'),
            bild: formData.get('image'),
            verwandte: formData.get('related'),
            beispiel: formData.get('example'),
            ubersetzung: formData.get('translation')
        }
        return updateCard
    }

    else if (formData.get('wortVerb')) {
        const updateCard = {
            type: "Verb",
            wort: formData.get('wortVerb'),
            prasens: [formData.get('ps1'), formData.get('ps2'), formData.get('ps3'), formData.get('ps4'), formData.get('ps5'), formData.get('ps6')],
            prateritum: [formData.get('pm1'), formData.get('pm2'), formData.get('pm3'), formData.get('pm4'), formData.get('pm5'), formData.get('pm6')],
            partizip2: formData.get('partizip2'),
            bild: formData.get('image'),
            verwandte: formData.get('related'),
            beispiel: formData.get('example'),
            ubersetzung: formData.get('translation')
        }
        if (formData.get('pm1') === "") {
            updateCard.prateritum = [];
        }
        return updateCard
    }
};