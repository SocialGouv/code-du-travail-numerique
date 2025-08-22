import { NextRequest, NextResponse } from "next/server";
import { BUCKET_URL } from "./src/config";

export function middleware(request: NextRequest) {
  // Handle CORS for API routes
  if (request.nextUrl.pathname.startsWith("/api")) {
    const response = NextResponse.next();

    // Add CORS headers
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    // Handle preflight requests
    if (request.method === "OPTIONS") {
      return new NextResponse(null, { status: 200, headers: response.headers });
    }

    return response;
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const ContentSecurityPolicy = `
  img-src 'self' https://travail-emploi.gouv.fr https://www.service-public.fr ${BUCKET_URL} https://matomo.fabrique.social.gouv.fr https://www.googletagmanager.com https://ad.doubleclick.net data:;
  script-src 'self' 'nonce-${nonce}' https://mon-entreprise.urssaf.fr https://matomo.fabrique.social.gouv.fr https://www.googletagmanager.com ${
    process.env.NEXT_PUBLIC_APP_ENV !== "production" ? "'unsafe-eval'" : ""
  };
  frame-src 'self' https://mon-entreprise.urssaf.fr https://matomo.fabrique.social.gouv.fr https://www.googletagmanager.com *.dailymotion.com https://*.doubleclick.net;
  connect-src 'self' https://geo.api.gouv.fr https://sentry2.fabrique.social.gouv.fr https://matomo.fabrique.social.gouv.fr https://www.googletagmanager.com https://www.google.com;
  worker-src 'self' blob:;
  `;
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = ContentSecurityPolicy.replace(
    /\s{2,}/g,
    " "
  ).trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.nextUrl.pathname);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
