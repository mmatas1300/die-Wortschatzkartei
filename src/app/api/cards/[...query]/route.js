import { NextResponse } from "next/server";
import {connectDB}  from "@/libs/mongodb";
import {AndereCard} from '@/models/card';

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
            return NextResponse.json(initialLetterCards);
        } catch (error) {
            return NextResponse.json(error);
        }
    }
}