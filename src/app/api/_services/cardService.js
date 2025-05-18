import { cardFindAll, cardFindByQuery } from "@/app/api/_repositories/cardRepository";
import { filterCardsByFirstLetter } from "@/utils/filterCardsByFirstLetter";

export const getAllAppCards = async () => {
    return await cardFindAll();
};

export const getAppCardsByQuery = async (query) => {
    return await cardFindByQuery(query);
};

export const getAppCardsByFirstLetter = async (firstLetter) => {
    const regExpFirstLetter = new RegExp("^" + firstLetter.toLowerCase());
    const appCards = await getAllAppCards();
    const filterCards = filterCardsByFirstLetter(regExpFirstLetter, appCards);
    switch (firstLetter.toLowerCase()) {
        case "a":
            return filterCards.concat(filterCardsByFirstLetter(new RegExp("^ä"), appCards))
        case "o":
            return filterCards.concat(filterCardsByFirstLetter(new RegExp("^ö"), appCards))
        case "u":
            return filterCards.concat(filterCardsByFirstLetter(new RegExp("^ü"), appCards))
    }
    return filterCards;
};