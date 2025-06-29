import { Card, NounCard, NounMFCard, NounPluralCard, VerbCard } from "@/utils/Card";

export const cardAdapter = (card) => {
    switch (card.type) {
        case "Verb":
            return new VerbCard(card);
        case "NeuterNoun":
        case "MasculineNoun":
        case "FeminineNoun":
            return new NounCard(card);
        case "PluralNoun":
            return new NounPluralCard(card);
        case "MFNoun":
            return new NounMFCard(card);
        default:
            return new Card(card);
    }
}