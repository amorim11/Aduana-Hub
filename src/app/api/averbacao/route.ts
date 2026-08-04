import { NextResponse } from "next/server";
import { delay } from "@/mocks/delay";

type AverbacaoRequestBody = {
  dtaNumber?: unknown;
  processType?: unknown;
};

export async function POST(request: Request) {
  await delay();

  const body = (await request.json().catch(() => null)) as
    | AverbacaoRequestBody
    | null;

  if (
    !body ||
    typeof body.dtaNumber !== "string" ||
    !body.dtaNumber.trim() ||
    (body.processType !== "DUIMP" && body.processType !== "DI")
  ) {
    return NextResponse.json(
      { message: "Payload inválido para averbação." },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      id: crypto.randomUUID(),
      status: "processing",
    },
    { status: 201 },
  );
}
