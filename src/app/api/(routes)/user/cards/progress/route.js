import { NextResponse } from "next/server";
import { updateUserCardsProgress } from "@/app/api/_services/userService";

export async function PUT(request) {
    const { userId, cards, date } = await request.json()
    try {
        await updateUserCardsProgress(userId, cards, date)
        return NextResponse.json({ message: "Update successful" }, { status: 204 });
    } catch (error) {
        return NextResponse.json(error);
    }

}