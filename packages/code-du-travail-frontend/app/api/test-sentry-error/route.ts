import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const data = ["a", "b", "c"];
  const letterD = data[4];
  const uppderLetterD = letterD.toUpperCase();

  return new NextResponse(
    JSON.stringify({
      reponse: uppderLetterD,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
