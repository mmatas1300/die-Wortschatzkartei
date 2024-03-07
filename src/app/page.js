'use client'
import Karte from "@/components/KarteWorterbuch";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';


export default function Home() {

  const alphaNum = ["A","B","C"]

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
    <main className="flex  flex-col items-center justify-between mt-12">
      <h1>Make your own flashcards and review them!</h1>
      <div className="flex flex-row flex-wrap justify-center items-center">
        <div className="m-5"><Karte {...cardsDemo[0]} /></div>
        <div className="m-5 hidden lg:block"><Karte {...cardsDemo[1]} /></div>
        <div className="m-5 hidden lg:block"><Karte {...cardsDemo[2]} /></div>
      </div>


      <h1 className="my-3 mx-10">Create your account by clicking on <span className="bg-blue-card p-2 text-base">Anmelden</span> and then <button className="cursor-default">Registrieren</button></h1>

      <div className="flex flex-row flex-wrap justify-center items-start">
        <div>
          <h1 className="mt-3">Create your own cards in der Karteneditor</h1>
          <div className="w-96 rounded-br-3xl rounded-bl-3xl rounded-tl-lg rounded-tr-3xl bg-red-card">
            <form className="flex flex-col justify-normal items-center mx-12  ">
              <label htmlFor="type" className="pt-8">Typ:</label>
              <select name="type">
                <option value="Nomen-die">Feminin</option>
                <option value="Nomen-das">Neutrum</option>
                <option value="Nomen-der">Maskulim</option>
                <option value="Nomen-pl">Plural</option>
              </select>
              <label htmlFor="wortNomen">Wort:</label>
              <input type="text" placeholder='Mango' name="wortNomen" />
              <label htmlFor="plural">Plural:</label>
              <input type="text" placeholder='Mangos' name="plural" />
              <label htmlFor="verwandte">Verwandte Wörter:</label>
              <input type="text" placeholder='das Obst' name="verwandte" />
              <label htmlFor="beispiel">Beispiel:</label>
              <input type="text" placeholder='Ich esse eine Mango' name="beispiel" />
              <label htmlFor="bild">Bild:</label>
              <input type="text" placeholder='https://www.example.com/mango.png' name="bild" />
              <label htmlFor="ubersetzung">Übersetzung:</label>
              <input type="text" placeholder='Mango' name="ubersetzung" />
              <button className="bg-black-card mb-8" disabled>Fertig</button>
            </form>
          </div>
        </div>

        <div className="mx-5">
          <h1 className="mt-3 text-center">See your flashcards to review</h1>
          <div className="flex flex-row flex-wrap justify-center items-center mt-4">
            {alphaNum.map((x) => {
              return (
                <div key={x} className='bg-orange-card hover:bg-yellow-card w-32 h-32 m-4 cursor-pointer text-base flex justify-center items-center rounded-xl transition duration-200 hover:scale-110'>
                  {x}
                </div>
              )
            })}
          </div>

        </div>



      </div>




    </main>
  );
}
