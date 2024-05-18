export const sortAlphaCards = (cards) => {
	return cards.sort((a, b) => a.wort.localeCompare(b.wort));
};

export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};