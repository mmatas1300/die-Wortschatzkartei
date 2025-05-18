import { NextResponse } from "next/server";
import { deleteUserCard, getUserCards, updateUserCard } from "@/app/api/_services/userService";

export async function PUT(request) {
    const { userId, card } = await request.json()
    try {
        await updateUserCard(userId, card)
        return NextResponse.json({ message: "Update successful", ok: true });
    } catch (error) {
        return NextResponse.json({message: error, ok: false});
    }
}

export async function POST(request) {
    const { userId } = await request.json()
    try {
        const userCards = await getUserCards(userId);
        return NextResponse.json({data: userCards, ok: true});
    } catch (error) {
        return NextResponse.json({message: error, ok: false});
    }
}

export async function DELETE(request) {
    const { userId, cardId } = await request.json()
    try {
        await deleteUserCard(userId, cardId);
        return NextResponse.json({ message: "Delete successful", ok: true })
    } catch (error) {
        return NextResponse.json({message: error, ok: false});
    }
}