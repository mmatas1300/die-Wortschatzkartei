import { NextResponse } from "next/server";
import { getUserCardsByFirstLetter } from "@/app/api/_services/userService";

export async function POST(request, { params }) {
    const { userId } = await request.json()
    try {
        const cards = await getUserCardsByFirstLetter(userId, params.query[0]);
        return NextResponse.json({cards: cards},{status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message},{status:400});
    }
}