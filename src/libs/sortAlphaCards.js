export const sortAlphaCards = (cards) => {
	return cards.sort((a, b) => a.wort.localeCompare(b.wort));
};