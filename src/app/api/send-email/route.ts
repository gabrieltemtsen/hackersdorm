import { NextRequest, NextResponse } from "next/server";
import { resend, SENDER_EMAIL, generateEmailHtml, EmailPayload } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const body: EmailPayload = await req.json();
    const { to, subject, type, hackathonTitle, data } = body;

    if (!to || !subject) {
      return NextResponse.json(
        { error: "Missing 'to' or 'subject' in email request." },
        { status: 400 }
      );
    }

    const html = generateEmailHtml(body);

    // If Resend API key is present in environment, send through Resend
    if (resend) {
      const { data: resendData, error } = await resend.emails.send({
        from: SENDER_EMAIL,
        to: [to],
        subject,
        html,
      });

      if (error) {
        console.error("Resend delivery failed:", error);
        return NextResponse.json({
          success: false,
          error: error.message,
          mode: "resend_error",
        }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        mode: "live_resend",
        messageId: resendData?.id,
        to,
        subject,
        preview: html,
      });
    }

    // Friendly developer mode simulation when RESEND_API_KEY is not yet populated
    console.log(`[HACKERSDORM EMAIL LOG] -> Simulated email to: ${to} | Subject: "${subject}" | Type: ${type}`);
    return NextResponse.json({
      success: true,
      mode: "simulated",
      notice: "Email simulated successfully. Add RESEND_API_KEY to .env.local to send live emails.",
      to,
      subject,
      sentAt: new Date().toISOString(),
      preview: html,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process email" },
      { status: 500 }
    );
  }
}
