import { NextResponse } from "next/server";
import { updateOrder } from "@/lib/shop";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import type { OrderRecord } from "@/lib/shop-schema";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const payload = (await request.json()) as Partial<OrderRecord>;

  const order = await updateOrder(id, {
    paymentMethod: payload.paymentMethod,
    paymentStatus: payload.paymentStatus,
    orderStatus: payload.orderStatus,
    razorpayOrderId: payload.razorpayOrderId,
    razorpayPaymentId: payload.razorpayPaymentId,
    adminNote: payload.adminNote,
  });

  return NextResponse.json({ order });
}
