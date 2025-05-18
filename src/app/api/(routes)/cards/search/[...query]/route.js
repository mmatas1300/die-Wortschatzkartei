import { NextResponse } from "next/server";
import { getAppCardsByQuery } from "@/app/api/_services/cardService";

export async function GET(req, { params }) {
    try {
        const searchCards = await getAppCardsByQuery(params.query[0]);
        return NextResponse.json({data: searchCards, ok: true});
    } catch (error) {
        return NextResponse.json(error);
    }
}