import { NextResponse } from "next/server";
import { deleteUserCard, getUserCards, updateUserCard } from "@/app/api/_services/userService";

export async function PUT(request) {
    const { userId, card } = await request.json()
    try {
        await updateUserCard(userId, card)
        return NextResponse.json({ message: "Update successful" }, { status: 204 });
    } catch (error) {
        return NextResponse.json(error);
    }
}

export async function POST(request) {
    const { userId } = await request.json()
    try {
        const userCards = await getUserCards(userId);
        return NextResponse.json(userCards);
    } catch (error) {
        return NextResponse.json(error);
    }
}

export async function DELETE(request) {
    const { userId, cardId } = await request.json()
    try {
        await deleteUserCard(userId, cardId);
        return NextResponse.json({ message: "Delete successful" }, { status: 204 })
    } catch (error) {
        return NextResponse.json(error);
    }
}