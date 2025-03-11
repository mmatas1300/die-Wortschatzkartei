import { NextResponse } from "next/server";
import {connectDB}  from "@/libs/mongodb";
import User from '@/models/user';
import CryptoJS from "crypto-js";

export async function PUT(request){
    const { userId, config } = await request.json();
    const ponsKey = config.ponsSecret;
    config.ponsSecret = CryptoJS.AES.encrypt(ponsKey,process.env.CRYPTO_KEY).toString();

    try {
        await connectDB();
        await User.findByIdAndUpdate(userId, {config: config});
        return NextResponse.json({message: "Update successful"},{status: 200});
    } catch (error) {
        return NextResponse.json(error);
    }
}