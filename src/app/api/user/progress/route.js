import { NextResponse } from "next/server";
import {connectDB}  from "@/libs/mongodb";
import User from '@/models/user';

export async function POST(request){
    const { email} = await request.json()//Corresponde a recuperar el body

    try {
        await connectDB();
        const userFound = await User.findOne({email: email});
        return NextResponse.json({progress:userFound.progress,lastPlay:userFound.lastPlay});
    } catch (error) {
        return NextResponse.json(error);
    }
}