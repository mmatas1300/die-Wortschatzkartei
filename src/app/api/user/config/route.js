import { NextResponse } from "next/server";
import {connectDB}  from "@/libs/mongodb";
import User from '@/models/user';

export async function PUT(request){
    const { _id, config } = await request.json()//Corresponde a recuperar el body

    try {
        await connectDB();
        await User.findByIdAndUpdate(_id, {config: config});
        return NextResponse.json({message: "Update successful"},{status: 200});
    } catch (error) {
        return NextResponse.json(error);
    }
}