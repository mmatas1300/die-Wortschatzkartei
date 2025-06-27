import { NextResponse } from "next/server";
import { getAllAppCards } from "@/app/api/_services/cardService";

export async function GET(){
    try {
        const appCards = await getAllAppCards();
        return NextResponse.json({cards: appCards},{status: 200});
    } catch (error) {
        return NextResponse.json({mesagge: error.mesagge}, {status:400});
    }
}