import Karte from "@/components/Karte";
import axios from "axios";

const getCards = async () => {
    const res = await axios.get('/api/cards')
    return res.data
  };


async function UbenPage() {


    const myKarten = await getCards();
  
    return (
        <div className="flex flex-col justify-center items-center mt-12">
            {myKarten.map((karte) => {
                return (<div key={karte._id} className="my-5"><Karte {...karte}  /></div>)
            })} 
        </div>
    );


}

export default UbenPage