import { NextResponse } from "next/server";
import {connectDB}  from "@/libs/mongodb";
import {AndereCard} from '@/app/api/_models/card';

export async function GET(req, { params }){

    if(params.query[0] === "search"){
        try {
            await connectDB();        
            const searchCards = await AndereCard.find({ $or:[
                {wort: { $regex: params.query[1], $options: 'i' }} ,
                {beispiel: { $regex: params.query[1], $options: 'i' }} ,
                {verwandte: { $regex: params.query[1], $options: 'i' }} ,
            ]});
            return NextResponse.json(searchCards);
        } catch (error) {
            return NextResponse.json(error);
        }
    } else{
        const regExpFirstLetter = new RegExp("^"+ params.query[0]);
        try {
            await connectDB();        
            const initialLetterCards = await AndereCard.find({ 
                wort: { $regex: regExpFirstLetter, $options: 'i' }
            });
            if(params.query[0]==="A" || params.query[0]==="O" || params.query[0]==="U"){
                const initialLetterCardsUmlaut = await findCardUmlaut(params.query[0]);
                return NextResponse.json(initialLetterCards.concat(initialLetterCardsUmlaut));
            }
            return NextResponse.json(initialLetterCards);
        } catch (error) {
            return NextResponse.json(error);
        }
    }
}

const findCardUmlaut = async (letter)=>{
    if(letter === "A"){
        const umlautCards = await AndereCard.find({ 
            wort: { $regex: new RegExp("^ä"), $options: 'i' }
        });
        return umlautCards;
    } else if (letter === "O"){
        const umlautCards = await AndereCard.find({ 
            wort: { $regex: new RegExp("^ö"), $options: 'i' }
        });
        return umlautCards;
    } else if (letter === "U"){
        const umlautCards = await AndereCard.find({ 
            wort: { $regex: new RegExp("^ü"), $options: 'i' }
        });
        return umlautCards;
    }
};