import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { runMiddleware } from "../../src/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res);
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
