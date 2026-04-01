import { getAllBeans } from "@/lib/dynamodb";

export async function GET() {
  try {
    const beans = await getAllBeans();
    return Response.json(beans);
  } catch (err) {
    console.error("DynamoDB error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}