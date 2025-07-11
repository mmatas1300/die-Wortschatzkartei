import { NextResponse } from "next/server";
import { getUserLastGame } from "@/app/api/_services/userService";

export async function POST(request) {
    const { userId } = await request.json();
    try {
        const lastGame = await getUserLastGame(userId);
        return NextResponse.json({lastGameData: lastGame},{status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message},{status:400});
    }
}