'use client'
import Karte from "@/components/Karte";
import { useEffect, useState } from "react";

function UbenPage() {

    const [myKarten, setMyKarten] = useState(["a","b"]);

    useEffect(()=>{
        fetch('/api/cards')
            .then(res=> res.json())
            .then(data=> setMyKarten(data))
    },[])

  
    return (
        <div className="flex flex-col justify-center items-center mt-12">
            {myKarten.map((karte) => {
                return (<div key={karte._id} className="my-5"><Karte {...karte}  /></div>)
            })} 
        </div>
    );


}

export default UbenPage