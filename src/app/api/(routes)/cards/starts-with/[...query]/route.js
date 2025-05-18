import { NextResponse } from "next/server";
import { getAppCardsByFirstLetter } from "@/app/api/_services/cardService";

export async function GET(req, { params }){  
        try {
            const filterCards = await getAppCardsByFirstLetter(params.query[0])
            return NextResponse.json({data: filterCards, ok: true});
        } catch (error) {
            return NextResponse.json({message: error, ok: false});
        }
}