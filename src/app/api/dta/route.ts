import { NextResponse } from "next/server";
import { delay } from "@/mocks/delay";
import { dtaRecords } from "@/mocks/data";

export async function GET(request: Request) {
  await delay();

  const { searchParams } = new URL(request.url);
  const numero = searchParams.get("numero")?.trim();

  if (!numero) {
    return NextResponse.json(
      { message: "Informe o número da DTA." },
      { status: 400 },
    );
  }

  const record = dtaRecords[numero];

  if (!record) {
    return NextResponse.json(
      { message: `Nenhuma DTA encontrada para o número ${numero}.` },
      { status: 404 },
    );
  }

  return NextResponse.json(record);
}
