import { NextResponse } from "next/server";
import { getAllAppCards } from "@/app/api/_services/cardService";

export async function GET(){
    try {
        const appCards = await getAllAppCards();
        throw new Error("mal conexion");
        return NextResponse.json({data: appCards, ok: true});
    } catch (error) {
        return NextResponse.json({mesagge: "something went wrong, try later"}, {status:400});
    }
}