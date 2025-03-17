import { NextResponse } from "next/server";
import {connectDB}  from "@/libs/mongodb";
import User from '@/models/user';

export async function POST(request){
    const { userId, query } = await request.json();
    try {
        await connectDB();
        const userFound = await User.findById(userId);
        if(query==="lastPlay"){
            return NextResponse.json({lastPlay: userFound.streak[userFound.streak.length-1]});
        } else if(query==="streak"){
            return NextResponse.json({progress: userFound.streak});
        } else if(query==="progress"){
            return NextResponse.json({progress: userFound.progress});
        }
    } catch (error) {
        return NextResponse.json(error);
    }
}

export async function PUT(request){
    const {userId, progress, update, date} = await request.json();
    const cardIds = progress.map((elemento)=>{return elemento.cardId});
    try {
        await connectDB();
        await User.updateOne({_id: userId}, {$pull: { progress: { cardId: { $in: cardIds } } }});
        await User.updateOne({_id: userId}, {$push: {progress: {$each: progress}}});
        if(update === "play") await User.updateOne({_id: userId}, {$push: {streak: {dayPlayed: date, cardsPlayed: progress.length}} });
        return NextResponse.json({message: "Update successful"},{status: 200});
    } catch (error) {
        return NextResponse.json(error);
    }
}