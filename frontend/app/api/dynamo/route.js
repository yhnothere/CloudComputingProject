import { getAllBeans } from "@/lib/dynamodb";

export async function GET() {
    const beans = await getAllBeans();
    return Response.json(beans);
}