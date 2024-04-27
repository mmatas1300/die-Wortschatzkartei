import { NextResponse } from "next/server";
import {connectDB}  from "@/libs/mongodb";
import {AndereCard} from '@/models/card';

export async function GET(req, { params }){
    try {
        await connectDB();        
        console.log(params.letter)
        const allCards = await AndereCard.find({ $or:[
            {wort: { $regex: params.letter, $options: 'i' }} ,
            {type: { $regex: params.letter, $options: 'i' }} ,
            {beispiel: { $regex: params.letter, $options: 'i' }} ,
            {verwandte: { $regex: params.letter, $options: 'i' }} ,
        ]});
        return NextResponse.json(allCards);
    } catch (error) {
        return NextResponse.json(error);
    }
}