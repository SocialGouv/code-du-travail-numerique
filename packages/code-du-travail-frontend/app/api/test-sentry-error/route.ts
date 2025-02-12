import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Ensure the route is not statically optimized

export async function GET(request: Request) {
  try {
    console.log("API route hit:", request.url);
    console.log("Headers:", Object.fromEntries(headers()));

    const { searchParams } = new URL(request.url);
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
