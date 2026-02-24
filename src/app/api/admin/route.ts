import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await getDb();

    const leads = await db
      .collection("leads")
      .find({})
      .sort({ date: -1 })
      .toArray();

    return NextResponse.json(leads);
  } catch (error) {
    console.error("Admin API error:", error);

    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}