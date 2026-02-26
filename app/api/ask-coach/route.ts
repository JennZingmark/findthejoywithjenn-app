import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { name, fromEmail, question } = await req.json();

    if (!question || typeof question !== "string" || !question.trim()) {
      return new NextResponse("Question is required.", { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      return new NextResponse(
        "Missing RESEND_API_KEY. Add it to .env.local and restart the server.",
        { status: 500 }
      );
    }

    const resend = new Resend(resendKey);

    const subject = "Ask a Coach — New question from the app";
    const safeName = (name || "").toString().trim();
    const safeFrom = (fromEmail || "").toString().trim();

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5">
        <h2>New Ask a Coach Question</h2>
        <p><strong>Name:</strong> ${safeName || "(not provided)"}</p>
        <p><strong>Email:</strong> ${safeFrom || "(not provided)"}</p>
        <hr />
        <p><strong>Question:</strong></p>
        <p>${String(question).replaceAll("\n", "<br/>")}</p>
      </div>
    `;

    await resend.emails.send({
      from: "Find the Joy App <onboarding@resend.dev>",
      to: ["jenn@jennzingmark.com"],
      subject,
      html,
      replyTo: safeFrom || undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return new NextResponse("Error sending email.", { status: 500 });
  }
}