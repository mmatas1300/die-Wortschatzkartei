import { getPonsInfo } from '@/libs/FetchAPI';

const findWord = async (id,word) => {
    const data = await getPonsInfo(id, word);
    if (data)
        return(data[0].hits[0].roms[0]);
        
    else
        return({ headword_full: "Error, please verify your word or PONS secret.", arabs: [] });
}

export default findWord;