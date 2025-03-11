import { NextResponse } from "next/server";
import {connectDB}  from "@/libs/mongodb";
import User from '@/models/user';
import CryptoJS from "crypto-js";

export async function POST(req){

    const { userId, query } = await req.json();

    const URL = `https://api.pons.com/v1/dictionary?q=${query}&l=deen&in=de&language=en`;
    try {
        await connectDB();
        const userFound = await User.findById(userId);
        const ponsKey = CryptoJS.AES.decrypt(userFound.config.ponsSecret, process.env.CRYPTO_KEY).toString(CryptoJS.enc.Utf8);
        const resp = await fetch(URL,
            {
                headers: {
                    "X-Secret": ponsKey ,
                }
            }
        )
        const data = await resp.json()
        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
    }
}