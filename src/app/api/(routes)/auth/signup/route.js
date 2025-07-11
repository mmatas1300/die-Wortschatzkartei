import { NextResponse } from "next/server";
import { signup } from "@/app/api/_services/userService";

export async function POST(request) {
    const { email, password} = await request.json()
    try {
        const resp = await signup(email,password);
        return NextResponse.json(resp,{status: 201});
    } catch (error) {
        return NextResponse.json({message:error.message},{status: 400});
    }
}