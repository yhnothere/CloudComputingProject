import { NextResponse } from "next/server";
import { getAllBeans } from "@/lib/dynamodb";

export async function GET() {
  try {
    const beans = await getAllBeans();
    return NextResponse.json(beans);
  } catch (err) {
    console.error("Dynamo error:", err);
    return NextResponse.json({ error: "Failed to fetch beans" }, { status: 500 });
  }
}
