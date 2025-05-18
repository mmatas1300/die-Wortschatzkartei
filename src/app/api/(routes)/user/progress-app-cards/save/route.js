//Put de update + inclusión del streak
import { NextResponse } from "next/server";
import { updateAppCardsProgress } from "@/app/api/_services/userService";


export async function PUT(request){
    const {userId, progress, date } = await request.json();
    try {
        await updateAppCardsProgress(userId,progress,date);
        return NextResponse.json({message: "Update successful" , ok: true});
    } catch (error) {
        return NextResponse.json({message: error , ok: false});
    }
}