import Karte from "@/components/KarteWorterbuch";
import arrow from '@/app/ui/arrow.png';
import Link from 'next/link'
import style from "@/app/ui/worterbuch.module.css"

async function WorterMitPage({ params }) {

    const response = await fetch('http://localhost:3000/api/cards');
    const data = await response.json();

    const datas = data.filter((card) => {
        return card.wort.charAt(0) === params.letter
    })

    return (
        <section>
            <div className="flex flex-row justify-between items-center mt-12"> 
                <Link href="/worterbuch" className={`${style.card} ms-12 h-10 w-10 rounded-full`}>
                    <img className="" src={arrow.src} alt="aaa" />
                </Link>
                <h1 className="text-lg text-center mx-auto">Wörter mit {params.letter}</h1>
                <div className="me-12 h-10 w-10"></div>
            </div>

            <div className="flex flex-row flex-wrap justify-center items-center mt-12">
                {datas.map((karte) => {
                    return (<div key={karte._id} className="m-5"><Karte {...karte} /></div>)
                })}
            </div>
        </section>

    )

}

export default WorterMitPage