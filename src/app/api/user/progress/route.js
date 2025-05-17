import { NextResponse } from "next/server";
import { getUserProgress, updateUserProgress } from "@/app/api/_services/userService";

export async function POST(request){
    const { userId } = await request.json();
    try {
        const userProgress = getUserProgress(userId);
        return NextResponse.json({progress: userProgress});
    } catch (error) {
        return NextResponse.json(error);
    }
}

export async function PUT(request){
    const {userId, progress} = await request.json();
    try {
        await updateUserProgress(userId,progress);
        return NextResponse.json({message: "Update successful"},{status: 204});
    } catch (error) {
        return NextResponse.json(error);
    }
}