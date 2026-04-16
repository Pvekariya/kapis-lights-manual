import { NextResponse } from "next/server";
import { getPublicPaymentConfig } from "@/lib/payments";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const total = Number(searchParams.get("total") || 0);

  return NextResponse.json({
    paymentMethods: getPublicPaymentConfig(total),
  });
}
