import { NextResponse } from "next/server";
import { getAllAppCards } from "@/app/api/_services/cardService";

export async function GET(){
    try {
        const appCards = await getAllAppCards();
        return NextResponse.json({data: appCards, ok: true});
    } catch (error) {
        return NextResponse.json({mesagge: error, ok: false});
    }
}