//Put de update + inclusión del streak
import { NextResponse } from "next/server";
import { updateAppCardsProgress } from "@/app/api/_services/userService";


export async function PUT(request){
    const {userId, progress, date } = await request.json();
    try {
        await updateAppCardsProgress(userId,progress,date);
        return new NextResponse(null, {status: 204});
    } catch (error) {
        return NextResponse.json({message: error.message},{status:400});
    }
}