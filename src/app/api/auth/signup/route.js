import { NextResponse } from "next/server";
import User from '@/models/user'
import {connectDB}  from "@/libs/mongodb";
import bcrypt from 'bcryptjs'

export async function POST(request) {
    const { email, password, progress, myCards,config } = await request.json()//Corresponde a recuperar el body

    if (!password || password.length < 3) //Validación contraseña
        return NextResponse.json(
            {
                message: "Passwörter müssen mindestens 3 Zeichen lang sein"
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
                    message: "Diese E-Mail Adresse existiert bereits"
                },
                {
                    status: 400
                }
            );

        const hashedPassword = await bcrypt.hash(password, 10);//Encriptación de contraseña



        const user = new User({
            email,
            password: hashedPassword,
            progress,
            myCards,
            config:{
                nick: "",
                cardsSet:"app"
            },
            lastPlay: new Date('1995-12-17T03:24:00')
        })
        const savedUser = await user.save(); //Guardando en la db
        console.log("guarado en db")

        return NextResponse.json(savedUser);
    } catch (error) {
        console.log(error)
    }


}