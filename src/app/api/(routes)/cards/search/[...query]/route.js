import { NextResponse } from "next/server";
import { getAppCardsByQuery } from "@/app/api/_services/cardService";

export async function GET(req, { params }) {
    try {
        const searchCards = getAppCardsByQuery(params.query[0]);
        return NextResponse.json(searchCards);
    } catch (error) {
        return NextResponse.json(error);
    }
}