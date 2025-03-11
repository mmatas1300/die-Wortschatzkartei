import { NextResponse } from "next/server";
import User from '@/models/user'
import {connectDB}  from "@/libs/mongodb";
import bcrypt from 'bcryptjs'
import { progressGenerator } from "@/libs/progressGenerator";

export async function POST(request) {
    const { email, password} = await request.json()

    if (!password || password.length < 3)
        return NextResponse.json({message: "Passwörter müssen mindestens 3 Zeichen lang sein"},{status: 400});
        
    try {
        await connectDB()
        const userFound = await User.findOne({ email })
        if (userFound)
            return NextResponse.json({message: "Diese E-Mail Adresse existiert bereits"},{status: 400});

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            password: hashedPassword,
            myCards: [],
            config:{
                nick: "",
                cardsSet:"app", 
                cardsPerDay: 10,
                ponsSecret: "",
            },
            streak: [{dayPlayed: new Date('2000'), cardsPlayed: 0}],
            progress: await progressGenerator(),
            
        })
        
        await user.save();
        return NextResponse.json({status: 200});
    } catch (error) {
        console.log(error)
    }
}