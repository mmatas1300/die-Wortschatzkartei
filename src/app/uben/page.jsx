'use client'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import PlayScreen from "@/components/PlayScreen";

function UbenPage() {

    const { data: session, status, update } = useSession();
    const [cards, setCards] = useState();



    const getStats = async () => {
        const responseStatistics = await fetch('/api/user/progress', {
            method: "POST", // 
            body: JSON.stringify({ email: session.user.email }), // 
            headers: {
                "Content-Type": "application/json",
            },
        });
        const dataStatistics = await responseStatistics.json();
        setStatistics(dataStatistics.progress)
        return dataStatistics.progress;
    }

    const getCards = async () => {
        //trae cartas
        if (session.user.config.cardsSet === "app") {
            const responseCards = await fetch('/api/cards');
            const dataCards = await responseCards.json();
            setCards(dataCards)
            return dataCards
        } else { //personal cards
            const responseCards = await fetch('/api/user/cards', {
                method: "POST", // 
                body: JSON.stringify({ email: session.user.email }), // 
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const dataCards = await responseCards.json()
            setCards(dataCards)
            return dataCards
        }
    }


    useEffect(() => {




    

        const initPractice = async ()=>{
            console.log(session.user)
            // if (status === "authenticated" ){
            //     const allowToPlayDate  =  new Date(session.user.lastPlay);
            //     allowToPlayDate.setDate(allowToPlayDate.getDate() + 1);
            //     const today= new Date();
            //     console.log(allowToPlayDate)
                
            //     //if(allowToPlayDate.getTime()<today.getTime()){
            //         //loadData();
            //     //}
    
            // }
        }

        if (status === "authenticated" )
            initPractice();


    }, [])

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            Hola
        </div>
    );
}

export default UbenPage