import { filterCardsByRegExp } from "@/utils/filterCardsByRegExp";
import { cardsMock } from "@/utils/cardsMock";

it('filters cards when first letter is a', () => {
    const regExp = new RegExp("^a");
    const cardsFiltered = filterCardsByRegExp(regExp, cardsMock);
    expect(cardsFiltered).toStrictEqual([
        {
            _id: {
                $oid: "67b8e5777373903de5bd7d21"
            },
            type: "Adjektiv",
            word: "Aktuell",
            image: "",
            related: "heutig, gegenwärtig, modern",
            example: "Die Nachrichten sind sehr aktuell.",
            translation: "Current"
        },
        {
            _id: {
                $oid: "67b8e5777373903de5bd7c35"
            },
            type: "MFNoun",
            word: "Arzt",
            image: "/imgs/cards/Arzt.jpg",
            related: "Medizin, Gesundheit, Behandlung",
            example: "Der Arzt hat mir ein Rezept für das Medikament verschrieben.",
            translation: "Doctor",
            masculinePlural: "Ärzte",
            feminineSingular: "Ärztin",
            femininePlural: "Ärztinnen"
        },
        {
            _id: {
                $oid: "67b8e5777373903de5bd7e19"
            },
            type: "Verb",
            word: "Aufmachen",
            image: "/imgs/cards/Aufmachen.jpg",
            related: "Öffnen",
            example: "Ich mache die Tür auf.",
            translation: "To Open",
            present: [
                "Mache auf",
                "Machst auf",
                "Macht auf",
                "Machen auf",
                "Macht auf",
                "Machen auf"
            ],
            past: [
                "Machte auf",
                "Matchtest auf",
                "Machte auf",
                "Machten auf",
                "Machtet auf",
                "Machten auf"
            ],
            participle2: "Aufgemacht"
        }
    ])
})

it('filters cards when first letter is J ', () => {
    const regExp = new RegExp("^j");
    const cardsFiltered = filterCardsByRegExp(regExp, cardsMock);
    expect(cardsFiltered).toStrictEqual([
        {
            _id: {
                $oid: "664a4fb4723647b7567bb25a"
            },
            type: "Pronomen",
            word: "Jemand",
            image: "",
            related: "Niemand",
            example: "Ich glaube, jemand klingelt an der Tür.",
            translation: "Somebody | Someone"
        }
    ])
})

