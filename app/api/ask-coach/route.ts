import { Resend } from "resend";

export const runtime = "nodejs";

function safeStr(x: unknown) {
  return typeof x === "string" ? x.trim() : "";
}

// ✅ This lets you visit /api/ask-coach in a browser and confirm env + route is deployed
export async function GET() {
  return Response.json({
    ok: true,
    hasResendKey: Boolean(process.env.RESEND_API_KEY),
    nodeEnv: process.env.NODE_ENV,
  });
}

export async function POST(req: Request) {
  try {
    const { name, fromEmail, question } = await req.json();

    const cleanQuestion = safeStr(question);
    const cleanName = safeStr(name);
    const cleanFromEmail = safeStr(fromEmail);

    if (!cleanQuestion) {
      return new Response("Missing question", { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      return new Response("Missing RESEND_API_KEY (Vercel env var)", {
        status: 500,
      });
    }

    const resend = new Resend(resendKey);

    const subject = "New Ask-a-Coach question (Find the Joy app)";
    const from = "Find the Joy with Jenn <onboarding@resend.dev>"; // safe default
    const replyTo = cleanFromEmail ? cleanFromEmail : undefined;

    const bodyText =
      `New question submitted from the app:\n\n` +
      (cleanName ? `Name: ${cleanName}\n` : "") +
      (cleanFromEmail ? `Email: ${cleanFromEmail}\n` : "") +
      `\nQuestion:\n${cleanQuestion}\n`;

    const result = await resend.emails.send({
      from,
      to: "jenn@jennzingmark.com",
      subject,
      text: bodyText,
      replyTo,
    });

    if (result.error) {
      return new Response(
        `Resend error: ${result.error.message || "Unknown error"}`,
        { status: 500 }
      );
    }

    return new Response("OK", { status: 200 });
  } catch (err: any) {
    return new Response(`Server error: ${err?.message || "Unknown"}`, {
      status: 500,
    });
  }
}