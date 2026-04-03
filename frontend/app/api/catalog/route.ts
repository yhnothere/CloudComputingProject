import { NextResponse } from "next/server";
import { getAllBeans } from "@/lib/dynamodb";

export async function GET() {
  const beans = await getAllBeans();

  const catalog = beans.map((b) => ({
    bean_id: b.bean_id,
    name: b.name,
    roast: b.roast_level,
    origin: b.origin_country,
    notes: b.tasting_notes,
    acidity: b.acidity_score,
    bitterness: b.bitterness_score,
    body: b.body_score,
    price: b.price,
  }));

  return NextResponse.json(catalog);
}