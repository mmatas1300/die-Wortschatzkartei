export const sortAlphaCards = (cards) => {
	return cards.sort((a, b) => a.word.localeCompare(b.word));
};

export const sortCardsByLevel = (cards) =>{
    return cards.sort((a,b)=> b.level - a.level);
} 

export const shuffleArray = (array) => {
    return array.sort((a, b) => Math.random() - 0.5)
};