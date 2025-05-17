import { NextResponse } from "next/server";
import { getUserLastGame } from "@/app/api/_services/userService";

export async function POST(request) {
    const { userId } = await request.json();
    try {
        const lastGame = await getUserLastGame(userId);
        return NextResponse.json(lastGame);
    } catch (error) {
        return NextResponse.json(error);
    }
}