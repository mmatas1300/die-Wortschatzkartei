export const ponsAdapter = (ponsResp) => {
    const wordDataPons = ponsResp[0].hits[0].roms[0];
    const entries = wordDataPons.arabs.slice(0, 2).map((entry)=>{
        return(
            {
                header: entry.header,
                translations: entry.translations.slice(0,2)
            }
        )
    });

    return { word: wordDataPons.headword_full, entries: entries}
}