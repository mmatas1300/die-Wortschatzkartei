'use client'
import Karte from "@/components/Karte";
import FAQ from "@/components/hilfe/FAQ";
import Link from "next/link";

export default function Home() {

    const cardsDemo = [
        {
            "_id": {
                "$oid": "65bd5d16d809b03163205ed1"
            },
            "type": "Nomen-das",
            "wort": "Kino",
            "plural": "Kinos",
            "bild": "https://estaticos-cdn.prensaiberica.es/clip/d0f889bf-add0-4703-85fc-438abfb6fdbe_16-9-discover-aspect-ratio_default_0.jpg",
            "verwandte": "der Film",
            "beispiel": "Wir waren gestern im Kino.",
            "ubersetzung": "Cinema | Theater",
            "__v": 0
        },

        {
            "_id": {
                "$oid": "65bd5f8addfd9b03163205ea7"
            },
            "type": "Nomen-MUF",
            "wort": "Koch",
            "manner": "Köche",
            "frau": "Köchin",
            "frauen": "Köchinnen",
            "bild": "https://static.vecteezy.com/system/resources/previews/015/512/417/original/cute-chef-holding-frying-pan-and-knife-cartoon-icon-llustration-people-profession-icon-concept-isolated-premium-flat-cartoon-style-vector.jpg",
            "verwandte": "Kochen | der Beruf",
            "beispiel": " Köchinnen und Köche, Kellnerinnen und Kellner sind jetzt überall gesucht.",
            "ubersetzung": "Chef",
            "__v": 0
        },
        {
            "_id": {
                "$oid": "dfbd6232d809b03163205eab"
            },
            "type": "Adjektiv",
            "wort": "Schnell",
            "bild": "https://i.blogs.es/b2b7a6/correr-rapido/840_560.jpg",
            "verwandte": "Langsam",
            "beispiel": " Fahren Sie schneller!!!!",
            "ubersetzung": "Fast",
            "__v": 0
        }
    ]

    return (
        <section className="flex flex-col items-center justify-between my-12 mx-4">
            <h1 className="p-5 rounded-2xl my-3 mx-10 text-center">Make your own flashcards and review them!</h1>
            <div className="flex flex-row flex-wrap justify-center items-center">
                <div className="m-5 hover:scale-105 transition-all "><Karte {...cardsDemo[0]} /></div>
                <div className="m-5 hidden lg:block hover:scale-105 transition-all "><Karte {...cardsDemo[1]} /></div>
                <div className="m-5 hidden lg:block hover:scale-105 transition-all "><Karte {...cardsDemo[2]} /></div>
            </div>

            <div className="p-5 rounded-2xl my-3 mx-10 text-center text-xl">Ready to learn? <Link href="/login"><button className="bg-red-card mx-1 text-xl">Register</button></Link> now and get started!</div>

            <FAQ />

        </section>
    );
}