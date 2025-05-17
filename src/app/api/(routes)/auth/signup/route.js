import { NextResponse } from "next/server";
import { signup } from "@/app/api/_services/userService";

export async function POST(request) {
    const { email, password} = await request.json()
    try {
        const resp = await signup(email,password);
        return NextResponse.json(resp);
    } catch (error) {
        console.log(error)
    }
}