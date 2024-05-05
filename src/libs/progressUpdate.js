const progressUpdate = (cards,userProgress)=>{
    const newUserProgress = [];
    userProgress.forEach(element => {
        const newCard = cards.filter((card)=>{
            return card._id != element.cardId;
        });
        const newProgress = {cardId: newCard._id, level:0, practiceDate: new Date("2000")};
        newUserProgress.push(newProgress);
    });
    
    return userProgress.concat(newUserProgress);
};

export default progressUpdate;