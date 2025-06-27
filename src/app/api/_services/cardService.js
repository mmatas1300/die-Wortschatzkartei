import { cardFindAll, cardFindByQuery } from "@/app/api/_repositories/_mongo/cardRepository";
import { filterCardsByRegExp} from "@/utils/filterCardsByRegExp";

export const getAllAppCards = async () => {
    return await cardFindAll();
};

export const getAppCardsByQuery = async (query) => {
    return await cardFindByQuery(query);
};

export const getAppCardsByFirstLetter = async (firstLetter) => {
    const regExpFirstLetter = new RegExp("^" + firstLetter.toLowerCase());
    const appCards = await getAllAppCards();
    const filterCards = filterCardsByRegExp(regExpFirstLetter, appCards);
    switch (firstLetter.toLowerCase()) {
        case "a":
            return filterCards.concat(filterCardsByRegExp(new RegExp("^ä"), appCards))
        case "o":
            return filterCards.concat(filterCardsByRegExp(new RegExp("^ö"), appCards))
        case "u":
            return filterCards.concat(filterCardsByRegExp(new RegExp("^ü"), appCards))
    }
    return filterCards;
};