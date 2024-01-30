import { NextResponse } from "next/server";
import User from '@/models/user'
import {connectDB}  from "@/libs/mongodb";
import bcrypt from 'bcryptjs'

export async function POST(request) {
    const { email, password, cards } = await request.json()//Corresponde a recuperar el body

    if (!password || password.length < 3) //Validación contraseña
        return NextResponse.json(
            {
                message: "Passwörter müssen mindestens 3 Zeichen lang sein."
            },
            {
                status: 400
            }
        );
        
    try {
        await connectDB() //Conecta a db
        
        const userFound = await User.findOne({ email })//Validación cuenta ya existente

        if (userFound)
            return NextResponse.json(
                {
                    message: "Email already exists"
                },
                {
                    status: 400
                }
            );

        const hashedPassword = await bcrypt.hash(password, 10);//Encriptación de contraseña


        const user = new User({
            email,
            password: hashedPassword,
            cards
        })

        const savedUser = await user.save(); //Guardando en la db


        return NextResponse.json(savedUser);
    } catch (error) {
        console.log(error)
    }


}