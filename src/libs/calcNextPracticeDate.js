export const calcNextPracticeDate = (level) => {
    const practiceTime = [86_400_000, 86_400_000 * 3, 86_400_000 * 6, 86_400_000 * 12, 86_400_000 * 24, 86_400_000 * 48, 86_400_000 * 72];
    return practiceTime[level-1];
};