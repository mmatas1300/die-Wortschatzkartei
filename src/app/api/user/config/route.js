import { NextResponse } from "next/server";
import {connectDB}  from "@/libs/mongodb";
import User from '@/models/user';

export async function PUT(request){
    const { userId, config } = await request.json()//Corresponde a recuperar el body

    try {
        await connectDB();
        await User.findByIdAndUpdate(userId, {config: config});
        return NextResponse.json({message: "Update successful"},{status: 200});
    } catch (error) {
        return NextResponse.json(error);
    }
}