import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { runMiddleware } from "../../src/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res);
  try {
    console.log("API route hit:", req.url);
    console.log("Headers:", Object.fromEntries(headers()));

    const { searchParams } = new URL(req.url!);
    const shouldError = searchParams.get("trigger") === "true";

    console.log("Should trigger error:", shouldError);

    if (shouldError) {
      console.log("Throwing test error...");
      throw new Error("Test server-side error for Sentry integration");
    }

    // Return success response with proper headers
    return new NextResponse(
      JSON.stringify({
        message: "Test endpoint - add ?trigger=true to trigger error",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
  } catch (error) {
    console.error("API route error:", error);

    // Re-throw the error to be caught by Sentry
    throw error;
  }
}
