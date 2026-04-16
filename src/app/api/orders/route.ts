import { NextResponse } from "next/server";
import { createOrder, getOrders } from "@/lib/shop";
import type { OrderRecord } from "@/lib/shop-schema";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { COD_MAX_AMOUNT, isRazorpayConfigured } from "@/lib/payments";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await getOrders();
  return NextResponse.json({ orders });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as OrderRecord;

  if (!payload.customerName || !payload.email || !payload.phone || !payload.address) {
    return NextResponse.json({ error: "Missing customer details" }, { status: 400 });
  }

  if (!payload.items?.length) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const totalAmount = Number(payload.totalAmount || 0);
  const paymentMethod = payload.paymentMethod || "cod";

  if (paymentMethod === "cod" && totalAmount > COD_MAX_AMOUNT) {
    return NextResponse.json(
      { error: `Cash on Delivery is only available for orders up to Rs. ${COD_MAX_AMOUNT}.` },
      { status: 400 },
    );
  }

  if (paymentMethod === "razorpay" && !isRazorpayConfigured()) {
    return NextResponse.json(
      { error: "Razorpay is not configured yet." },
      { status: 400 },
    );
  }

  const order = await createOrder({
    ...payload,
    currency: "INR",
    paymentMethod,
    paymentStatus: payload.paymentStatus || (paymentMethod === "razorpay" ? "pending" : "cod"),
    orderStatus: payload.orderStatus || "new",
    adminNote: payload.adminNote || "",
    items: payload.items || [],
    totalAmount,
  });

  return NextResponse.json({ order });
}
