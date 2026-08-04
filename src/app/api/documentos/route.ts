import { NextResponse } from "next/server";
import { delay } from "@/mocks/delay";
import { seedDocuments } from "@/mocks/data";

export async function GET() {
  await delay();

  return NextResponse.json(seedDocuments);
}
