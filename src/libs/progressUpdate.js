export const progressUpdate = (cards,userProgress)=>{
    cards.forEach(card => {
        const elementFound = userProgress.find((element)=>{
            return card._id === element.cardId;
        })
        if(!elementFound){
            const newElement = {cardId: card._id, level:0, practiceDate: new Date("2000")};
            userProgress.push(newElement);
        }
    });
    return userProgress;
};