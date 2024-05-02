import { NextResponse } from "next/server";
import User from '@/models/user'
import {connectDB}  from "@/libs/mongodb";
import bcrypt from 'bcryptjs'

export async function POST(request) {
    const { email, password} = await request.json()//Corresponde a recuperar el body

    if (!password || password.length < 3) //Validación contraseña
        return NextResponse.json({message: "Passwörter müssen mindestens 3 Zeichen lang sein"},{status: 400});
        
    try {
        await connectDB()
        const userFound = await User.findOne({ email })//Validación cuenta ya existente
        if (userFound)
            return NextResponse.json({message: "Diese E-Mail Adresse existiert bereits"},{status: 400});

        const hashedPassword = await bcrypt.hash(password, 10);//Encriptación de contraseña

        const user = new User({
            email,
            password: hashedPassword,
            myCards: [],
            config:{
                nick: "",
                cardsSet:"app"
            },
            lastPlay: new Date('2000'),
        })
        const savedUser = await user.save();
        return NextResponse.json(savedUser);
    } catch (error) {
        console.log(error)
    }
}