import { NextResponse } from "next/server";
import { getUserStreak } from "@/app/api/_services/userService";


export async function POST(request){
    const { userId} = await request.json();
    try {
        const userStreak = await getUserStreak(userId);
        return NextResponse.json({progress: userStreak});

    } catch (error) {
        return NextResponse.json(error);
    }
}
