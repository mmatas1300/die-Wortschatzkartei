import { NextResponse } from "next/server";
import { getUserProgressAppCards, updateUserProgress } from "@/app/api/_services/userService";

export async function POST(request){
    const { userId } = await request.json();
    try {
        const userProgressAppCards = await getUserProgressAppCards(userId);
        return NextResponse.json({data: userProgressAppCards, ok: true});
    } catch (error) {
        return NextResponse.json({message: error, ok: false});
    }
}

export async function PUT(request){
    const {userId, progress} = await request.json();
    try {
        await updateUserProgress(userId,progress);
        return NextResponse.json({message: "Update successful", ok: true});
    } catch (error) {
        return NextResponse.json({message: error, ok: false});
    }
}