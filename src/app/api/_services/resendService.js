import { Resend } from 'resend';

export const resendSendEmail = async (message)=>{
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
        from: process.env.RESEND_DOMAIN,
        to: process.env.ADMIN_EMAIL,
        subject: 'die Wortschatzkartei',
        html: message,
    });

    return error;
};