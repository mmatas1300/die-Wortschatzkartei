import useSound from 'use-sound';

export const useSoundEffect = ()=>{

    const [winSound] = useSound('/sounds/win.mp3');
    const [correctSound] = useSound('/sounds/correct.mp3');
    const [incorrectSound] = useSound('/sounds/incorrect.mp3');
    const [flipCardSound] = useSound('/sounds/flipcard.mp3');

    return {winSound,correctSound,incorrectSound, flipCardSound};
};