import { Card, NounCard, NounMFCard, NounPluralCard, VerbCard } from "@/utils/Card";
import { cardsMock } from "@/utils/cardsMock";

it('creates an array of Cards', () => {
    const cardsObject = cardsMock.map((card) => {
        switch (card.type) {
            case "MasculineNoun":
            case "FeminineNoun":
            case "NeuterNoun":
                return new NounCard(card);
            case "MFNoun":
                return new NounMFCard(card);
            case "Verb":
                return new VerbCard(card);
            case "PluralNoun":
                return new NounPluralCard(card);
            default:
                return new Card(card);
        }
    })
    cardsObject.forEach((card)=>{
        expect(card).toBeInstanceOf(Card);
    })
})

it('creates an array with full words', () => {
    const cardsObject = cardsMock.map((card) => {
        switch (card.type) {
            case "MasculineNoun":
            case "FeminineNoun":
            case "NeuterNoun":
                return new NounCard(card);
            case "MFNoun":
                return new NounMFCard(card);
            case "Verb":
                return new VerbCard(card);
            case "PluralNoun":
                return new NounPluralCard(card);
            default:
                return new Card(card);
        }
    })

    const fullWords = cardsObject.map((card)=>{
        return card.getFullWord();
    })
    expect(fullWords).toStrictEqual(["Aktuell","Jemand","der Friseur","der Arzt","Aufmachen","Brauchen","das Brot","das Bad","der Essig","der Herr","die Woche","die Zukunft","die Eltern","die Geschwister"]);
})