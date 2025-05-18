import { NextResponse } from "next/server";
import { getUserCardsByQuery } from "@/app/api/_services/userService";

export async function POST(request, { params }) {
    const { userId } = await request.json()
    try{    
        const filterCards = await getUserCardsByQuery(userId, params.query[0]);       
        return NextResponse.json({data: filterCards, ok: true});
    } catch (error) {
        return NextResponse.json({message: error, ok: false});
    }
}