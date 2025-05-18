import { NextResponse } from "next/server";
import { getAppCardsByFirstLetter } from "@/app/api/_services/cardService";

export async function GET(req, { params }){  
        try {
            const filterCards = await getAppCardsByFirstLetter(params.query[0])
            return NextResponse.json(filterCards);
        } catch (error) {
            return NextResponse.json(error);
        }
}