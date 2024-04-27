import { NextResponse } from "next/server";
import {connectDB}  from "@/libs/mongodb";
import {AndereCard} from '@/models/card';

export async function GET(req, { params }){
    try {
        await connectDB();
        const allCards = await AndereCard.find({});
        console.log(params.letter)
        return NextResponse.json(allCards);
    } catch (error) {
        return NextResponse.json(error);
    }
}