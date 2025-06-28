import { NextResponse } from "next/server";
import { getUserStreak } from "@/app/api/_services/userService";


export async function POST(request){
    const { userId} = await request.json();
    try {
        const userStreak = await getUserStreak(userId);
        return NextResponse.json({userStreak: userStreak},{status: 200});

    } catch (error) {
        return NextResponse.json({message: error.message},{status:400});
    }
}
