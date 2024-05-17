export const calcNextPracticeDate = (level) => {
    let nextPracticeDate;
    switch (level) {
        case 1:
            nextPracticeDate = 86_400_000;
            break;
        case 2:
            nextPracticeDate = 86_400_000 * 3;
            break;
        case 3:
            nextPracticeDate = 86_400_000 * 6;
            break;
        case 4:
            nextPracticeDate = 86_400_000 * 12;
            break;
        case 5:
            nextPracticeDate = 86_400_000 * 24;
            break;
        case 6:
            nextPracticeDate = 86_400_000 * 48;
            break;
        case 7:
            nextPracticeDate = 86_400_000 * 72;
            break;
        default:
            break;
    }
    return nextPracticeDate
};