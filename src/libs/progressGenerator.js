export const progressGenerator = async ()=>{
    const response = await fetch('api/cards');
    const cards = await response.json();
    const progress = cards.map((card)=>{
        return {cardId: card._id, level:0, practiceDate: new Date("2000")}
    });

    return progress;
};