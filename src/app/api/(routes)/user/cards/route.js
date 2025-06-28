import { NextResponse } from "next/server";
import { deleteUserCard, getUserCards, updateUserCard } from "@/app/api/_services/userService";

export async function PUT(request) {
    const { userId, card } = await request.json()
    try {
        await updateUserCard(userId, card)
        return new NextResponse(null, {status: 204});
    } catch (error) {
        return NextResponse.json({message: error.message},{status: 400});
    }
}

export async function POST(request) {
    const { userId } = await request.json()
    try {
        const cards = await getUserCards(userId);
        return NextResponse.json({cards: cards},{status:200});
    } catch (error) {
        return NextResponse.json({message: error.message},{status: 400});
    }
}

export async function DELETE(request) {
    const { userId, cardId } = await request.json()
    try {
        await deleteUserCard(userId, cardId);
        return new NextResponse(null, {status: 204});
    } catch (error) {
        return NextResponse.json({message: error.message},{status: 400});
    }
}