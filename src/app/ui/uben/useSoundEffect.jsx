import useSound from 'use-sound';

export const useSoundEffect = ()=>{

    const [winPlay] = useSound('/sounds/win.mp3');
    const [richtigPlay] = useSound('/sounds/richtig.mp3');
    const [falschPlay] = useSound('/sounds/falsch.mp3');
    const [flipCardPlay] = useSound('/sounds/flipcard.mp3');

    return {winPlay,richtigPlay,falschPlay, flipCardPlay};
};