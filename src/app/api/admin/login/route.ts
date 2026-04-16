import { NextResponse } from "next/server";
import { createAdminSession, validateAdminPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const { password } = await request.json();

  if (!validateAdminPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  await createAdminSession();

  return NextResponse.json({ success: true });
}
