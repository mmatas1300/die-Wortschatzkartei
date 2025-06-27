import { NextResponse } from "next/server";
import { resendSendEmail } from "@/app/api/_services/resendService";

export async function POST(request) {
    const {message} = await request.json()
    const error = await resendSendEmail(message);  
    if (error)
        return NextResponse.json({message: error.message},{status:400});
    else
        return NextResponse.json({message: "Email sent"},{status:202});
}