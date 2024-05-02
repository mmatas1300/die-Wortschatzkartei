import { NextResponse } from "next/server";
import {connectDB}  from "@/libs/mongodb";
import User from '@/models/user';

export async function POST(request){
    const { userId, query } = await request.json()
    try {
        await connectDB();
        const userFound = await User.findById(userId);
        if(query==="lastPlay"){
            return NextResponse.json({lastPlay: userFound.lastPlay});
        } else if(query==="progress"){
            return NextResponse.json({progress: userFound.progress});
        }
    } catch (error) {
        return NextResponse.json(error);
    }
}