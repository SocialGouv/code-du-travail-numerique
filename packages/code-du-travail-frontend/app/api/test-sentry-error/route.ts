import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Ensure the route is not statically optimized

export async function GET(request: Request) {
  const data = ["a", "b", "c"];
  const letterD = data[4];
  const uppderLetterD = letterD.toUpperCase();

  // Return success response with proper headers
  return new NextResponse(
    JSON.stringify({
      reponse: uppderLetterD,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    }
  );
}
