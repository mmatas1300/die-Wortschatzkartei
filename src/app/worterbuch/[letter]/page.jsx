import Karte from "@/components/KarteWorterbuch";


async function WorterMitPage({ params }) {
    
    const response = await fetch('http://localhost:3000/api/cards');
    const data = await response.json();

    const datas = data.filter((card)=>{
        return card.wort.charAt(0) === params.letter
    })

    return (
        <section>
            <h1 className="text-lg text-center mt-12">Wörter mit {params.letter}</h1>
            <div className="flex flex-row flex-wrap justify-center items-center mt-12">
                {datas.map((karte) => {
                    return (<div key={karte._id} className="m-5"><Karte {...karte} /></div>)
                })}
            </div>
        </section>

    )

}

export default WorterMitPage