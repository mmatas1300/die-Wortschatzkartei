import { NextResponse } from "next/server";
import { getUserProgressAppCards, updateUserProgress } from "@/app/api/_services/userService";

export async function POST(request){
    const { userId } = await request.json();
    try {
        const userProgressAppCards = await getUserProgressAppCards(userId);
        return NextResponse.json({userProgressAppCards: userProgressAppCards},{status:200});
    } catch (error) {
        return NextResponse.json({message: error.message},{status:400});
    }
}

export async function PUT(request){
    const {userId, progress} = await request.json();
    try {
        await updateUserProgress(userId,progress);
        return new NextResponse(null, {status: 204});
    } catch (error) {
        return NextResponse.json({message: error.message},{status:400});
    }
}