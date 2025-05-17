import { NextResponse } from "next/server";
import { updateUserConfig } from "@/app/api/_services/userService";

export async function PUT(request){
    const { userId, config } = await request.json();
    try {
        await updateUserConfig(userId, config);
        return NextResponse.json({message: "Update successful"},{status: 204});
    } catch (error) {
        return NextResponse.json(error);
    }
}