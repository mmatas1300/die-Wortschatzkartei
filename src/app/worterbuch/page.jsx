'use client'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useState } from 'react';
import Karte from "@/components/KarteWorterbuch";
import { Spinner } from "@material-tailwind/react";

function WorterbuchPage() {

  const { data: session, status } = useSession();
  const [cardsSuchen, setCardsSuchen] = useState(null);

  const alphaNum = Array.from(Array(26)).map((e, i) => i + 65);
  alphaNum.splice(23, 2)

  const handleSuchen = (e) =>{
    e.preventDefault();
    const suchen = new FormData(e.currentTarget)//extraer datos del form
    const mySuch = suchen.get("search");

    if (status==="authenticated") {
      if (session.user.config.cardsSet === "app") {
          fetchAppCards(mySuch);
      } else { //personal cards
          fetchPersonalCards(mySuch);
      }
    } else if(status==="unauthenticated"){
      fetchAppCards(mySuch);
    }
  };

  const fetchAppCards = (such)=>{
    fetch('/api/cards')
    .then((res) => res.json())
    .then((data) => mapCards(data,such))
  }

  const fetchPersonalCards =(such)=>{
    fetch('/api/user/cards', {
        method: "POST", // 
        body: JSON.stringify({ email: session.user.email }), // 
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json())
        .then((data) => mapCards(data,such))
  }

  const mapCards = (data,such) => {
    const regex = new RegExp(`.*${such.toLowerCase()}.*`);
    const dataFilter = data.filter((card) => {
        return  regex.test(card.wort.toLowerCase())
    })
    setCardsSuchen(dataFilter);
  }

  return (
    <>
      <form onSubmit={handleSuchen} className="max-w-md mx-auto mt-4">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-red-card"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            name="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm "
          />
          <button
            type="submit"
            className="absolute end-2.5 bottom-2.5 bg-green-card cursor-pointer px-4 py-2"
          >
            Suchen
          </button>
        </div>
      </form>



      {cardsSuchen ? (<div className="flex flex-row flex-wrap justify-center items-center mt-12">
               {cardsSuchen.map(karte => <div key={karte._id} className="m-5"><Karte {...karte} /></div>)}
      </div>):(<div className="flex flex-row justify-center items-center flex-wrap mt-4">
        {alphaNum.map((x) => {
          return (
            <Link key={x} href={`/worterbuch/${String.fromCharCode(x)}`} className='bg-orange-card hover:bg-yellow-card w-32 h-32 m-3 cursor-pointer text-base flex justify-center items-center rounded-xl transition duration-200 hover:scale-110'>
              {String.fromCharCode(x)}
            </Link>
          )
        })}
      </div>)}
      
    </>
  );

}

export default WorterbuchPage
