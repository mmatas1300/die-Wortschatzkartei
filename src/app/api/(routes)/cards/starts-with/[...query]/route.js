import { NextResponse } from "next/server";
import { getAppCardsByFirstLetter } from "@/app/api/_services/cardService";

export async function GET(req, { params }){  
        try {
            const cards = await getAppCardsByFirstLetter(params.query[0])
            return NextResponse.json({cards: cards},{status: 200});
        } catch (error) {
            return NextResponse.json({message: error.message},{status:400});
        }
}