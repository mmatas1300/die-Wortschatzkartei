import { NextResponse } from "next/server";
import { getUserCardsByQuery } from "@/app/api/_services/userService";

export async function POST(request, { params }) {
    const { userId } = await request.json()
    try{    
        const filterCards = getUserCardsByQuery(userId, params.query[0]);
        return NextResponse.json(filterCards);
    } catch (error) {
        return NextResponse.json(error);
    }
}