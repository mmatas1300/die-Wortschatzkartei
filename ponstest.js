
const test = async ()=>{
    const URI = `https://api.pons.com/v1/dictionary?q=Obst&l=deen&in=de&language=en`;
    const resp = await fetch(URI,
        {
            headers: {
                "X-Secret": "f421ea05910cc5666db411650d074654a859e07d3ae16aec2ac6b9818c7bca8e"
            }
        }
    )
    const contenido = await resp.json();
    console.log(contenido[0].hits[0].roms[0]);
}

test();
