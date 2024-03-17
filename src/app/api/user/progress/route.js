import { NextResponse } from "next/server";
import {connectDB}  from "@/libs/mongodb";
import User from '@/models/user';

export async function POST(request){
    const { email} = await request.json()//Corresponde a recuperar el body

    try {
        await connectDB();
        const userFound = await User.findOne({email: email});
        return NextResponse.json({progress:userFound.progress});
    } catch (error) {
        return NextResponse.json(error);
    }
}

export async function PUT(request){

    const { email, progress} = await request.json()//Corresponde a recuperar el body

    try {
        await connectDB();
        console.log(email)
        const userNew = await User.findOneAndUpdate({ email: email },{lastPlay:lastPlay, $push: {progress: progress}});
        console.log(userNew)
        return NextResponse.json({message: "Update successful"},{status: 200});
    } catch (error) {
        return NextResponse.json(error);
    }
}