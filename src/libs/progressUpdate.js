/**
 * The `progressUpdate` function checks if each card in the array `cards` is present in the
 * `userProgress` array, and if not, adds a new element with level 0 and a practice date of 2000.
 * @param cards - An array of card objects. Each card object contains properties such as _id, title,
 * description, etc.
 * @param userProgress - `userProgress` is an array that contains objects representing the progress of
 * a user in learning different cards. Each object in the `userProgress` array has the following
 * structure:
 * @returns The function `progressUpdate` returns the updated `userProgress` array after checking each
 * card in the `cards` array and adding a new element if it doesn't already exist in the `userProgress`
 * array.
 */
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