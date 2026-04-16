import { NextResponse } from "next/server";
import { isRazorpayConfigured } from "@/lib/payments";

type RazorpayOrderResponse = {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
};

export async function POST(request: Request) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!isRazorpayConfigured() || !keyId || !keySecret) {
    return NextResponse.json(
      { error: "Razorpay is not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET." },
      { status: 500 },
    );
  }

  const { amount, receipt } = await request.json();

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
      currency: "INR",
      receipt,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    return NextResponse.json({ error: message || "Failed to create Razorpay order" }, { status: 500 });
  }

  const order = (await response.json()) as RazorpayOrderResponse;

  return NextResponse.json({
    order,
    keyId,
  });
}
