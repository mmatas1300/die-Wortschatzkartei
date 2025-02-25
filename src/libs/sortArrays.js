/**
 * The function `sortAlphaCards` sorts an array of objects containing cards alphabetically based on the
 * `wort` property.
 * @param cards - An array of objects representing cards, where each card object has a property "wort"
 * that contains the word on the card.
 * @returns The `sortAlphaCards` function is returning the `cards` array sorted alphabetically based on
 * the `wort` property of each card object.
 */
export const sortAlphaCards = (cards) => {
	return cards.sort((a, b) => a.wort.localeCompare(b.wort));
};

/**
 * The function `sortCardsByLevel` sorts an array of cards based on their level in descending order.
 * @param cards - The `sortCardsByLevel` function takes an array of `cards` as input. Each card in the
 * array is expected to have a `level` property that represents the level of the card. The function
 * sorts the cards in descending order based on their `level` property.
 * @returns The function `sortCardsByLevel` is being returned. It takes an array of cards as input and
 * sorts them in descending order based on their level property.
 */
export const sortCardsByLevel = (cards) =>{
    return cards.sort((a,b)=> b.level - a.level);
} 

/**
 * The `shuffleArray` function takes an array as input and returns a shuffled version of that array.
 * @param array - The `array` parameter in the `shuffleArray` function is an array of elements that you
 * want to shuffle.
 * @returns The `shuffleArray` function is returning the input array after it has been shuffled
 * randomly.
 */
export const shuffleArray = (array) => {
    return array.sort((a, b) => Math.random() - 0.5)
};