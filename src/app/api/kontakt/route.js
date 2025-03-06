import { NextResponse } from "next/server";
import { Resend } from 'resend';

export async function POST(request) {
    const {message} = await request.json()//Corresponde a recuperar el body

    const resend = new Resend(process.env.RESEND_API_KEY);

        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_DOMAIN,
            to: process.env.ADMIN_EMAIL,
            subject: 'die Wortschatzkartei',
            html: message,
          });

        console.log(error)
          
        if (error)
            return NextResponse.json({message: error},{status: 400});
        else
            return NextResponse.json({message: "ok"},{status: 200});

}