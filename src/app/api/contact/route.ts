import ContactEmail from '@/Components/Email/ContactEmail';
import { render } from '@react-email/components';
import React from 'react';
import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
    try {
        const { name, email, subject, message } = await req.json();

        // Initialise Resend DANS la fonction, là où process.env est dispo
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Cast ContactEmail as a JSX component function
        const emailHtml = render(
            React.createElement(ContactEmail as any, { name, email, message })
        );

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'tshensowgamer2004@gmail.com',
            subject: subject,
            html: emailHtml,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to send email' },
            { status: 500 }
        );
    }
}
