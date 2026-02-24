import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const db = await getDb();

    // save to Mongo
    await db.collection("leads").insertOne({
      ...data,
      date: new Date(),
    });

    // send email
    await resend.emails.send({
      from: "Kapis Lights <onboarding@resend.dev>",
      to: ["kapislights@gmail.com"], // ← change to your email
      subject: "New Dealer Enquiry",
      html: `
        <h2>New Dealer Lead</h2>
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Company:</b> ${data.company}</p>
        <p><b>Phone:</b> ${data.phone}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Message:</b> ${data.message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Dealer API error:", error);

    return NextResponse.json(
      { error: "Failed to save lead" },
      { status: 500 }
    );
  }
}