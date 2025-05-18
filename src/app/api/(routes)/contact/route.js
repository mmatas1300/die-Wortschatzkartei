import { NextResponse } from "next/server";

export async function POST(request) {
    const {message} = await request.json()
    const error = await resendSendEmail(message);  
    if (error)
        return NextResponse.json({message: error},{status: 400});
    else
        return NextResponse.json({message: "ok"},{status: 200});
}