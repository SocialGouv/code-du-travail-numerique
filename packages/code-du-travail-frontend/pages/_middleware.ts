import { NextRequest, NextResponse } from "next/server";
import { getSourceUrlFromPath } from "../src/lib";

export function middleware(request: NextRequest) {
  const srcBaseUrl = getSourceUrlFromPath(request.url);
  const requestHeaders = new Headers(request.headers);
  if (srcBaseUrl) requestHeaders.set("referer", srcBaseUrl);

  const response = (NextResponse as any).next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  return response;
}
