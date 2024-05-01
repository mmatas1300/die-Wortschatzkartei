import { NextResponse } from "next/server";
import {connectDB}  from "@/libs/mongodb";
import User from '@/models/user';

export async function PUT(request){
    const { email, card } = await request.json()//Corresponde a recuperar el body
    try {
        await connectDB();
        await User.findOneAndUpdate({ email: email }, { $push: { myCards: card } });
        return NextResponse.json({message: "Update successful"},{status: 200});
    } catch (error) {
        return NextResponse.json(error);
    }
}

export async function POST(request){
    const {email} = await request.json()
    try{
        await connectDB();
        const userFound = await User.findOne({email: email});
        return NextResponse.json(userFound.myCards)
    } catch (error) {
        return NextResponse.json(error);
    }
}

export async function DELETE(request){
    const {userId,cardId} = await request.json()
    try{
        await connectDB();
        await User.updateOne({ _id: userId },{ $pull: { myCards: { _id: cardId } } });
        return NextResponse.json({message: "Update successful"},{status: 200})
    } catch (error) {
        return NextResponse.json(error);
    }
}