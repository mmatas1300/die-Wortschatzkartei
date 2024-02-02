import Karte from "@/components/Karte";


function UbenPage() {

    const myKarte ={
        type:"Nomen-die",
        wort:"Ananas",
        plural:"Ananase",
        bild:"https://previews.123rf.com/images/aquir/aquir2306/aquir230600648/207729001-pi%C3%B1a-pi%C3%B1a-dibujado-a-mano-ilustraci%C3%B3n-vector-doodle-estilo-dibujos-animados-ilustraci%C3%B3n.jpg",
        verwandte:"das Essen | das Obst",
        beispiel:"Die Ananas wurde von den Ureinwohnerinnen angepflanzt.",
        ubersetzung:"Pineapple | Piña"
    }

    return(
        <div>
            <div className="flex flex-col justify-center items-center mt-12">
                <Karte {...myKarte}/>
            </div>
        </div>
    );

    
}

export default UbenPage