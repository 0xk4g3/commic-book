import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        const formData = await req.formData();
        const email = formData.get('email');
        const pdfFile = formData.get('file');

        if (!email || !pdfFile) {
            return NextResponse.json(
                { error: 'Email and PDF file are required' },
                { status: 400 }
            );
        }

        // Convert file to buffer
        const buffer = Buffer.from(await pdfFile.arrayBuffer());

        // Send email via Resend
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Your UAE Winter Tale Comic Book!',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
            <h1 style="color: #1e3a8a;">Your Mirbad Express Comic is Here! 🚂</h1>
            <p>Hello,</p>
            <p>Thank you for creating a story with <strong>UAE Winter Tales</strong>!</p>
            <p>We've attached your custom comic book PDF to this email. It features your unique characters and journey through our beautiful winter traditions.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
            <p style="font-size: 12px; color: #666;">
            UAE Winter Tales © 2024 | Celebrating Heritage through Storytelling
            </p>
        </div>
        `,
            attachments: [
                {
                    filename: 'My_Mirbad_Story.pdf',
                    content: buffer,
                },
            ],
        });

        if (data.error) {
            console.error('Resend API Error:', data.error);
            return NextResponse.json({ error: data.error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'Email sent successfully!', data });

    } catch (error) {
        console.error('Email sending error:', error);
        return NextResponse.json(
            { error: 'Failed to send email', details: error.message },
            { status: 500 }
        );
    }
}
