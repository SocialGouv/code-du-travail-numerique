import { NextRequest, NextResponse } from "next/server";
import { BUCKET_URL } from "./src/config";

export function proxy(request: NextRequest) {
  // Handle CORS for API routes
  if (request.nextUrl.pathname.startsWith("/api")) {
    const response = NextResponse.next();

    // Restrict CORS to specific origins (more secure than '*')
    const allowedOrigins = [
      "https://code.travail.gouv.fr",
      "https://www.code.travail.gouv.fr",
      process.env.NODE_ENV === "development" ? "http://localhost:3000" : null,
      process.env.NODE_ENV === "development" ? "http://127.0.0.1:3000" : null,
    ].filter(Boolean);

    const origin = request.headers.get("origin");

    // Check for review branches pattern: https://code-du-travail-numerique-*.ovh.fabrique.social.gouv.fr
    const isReviewBranch =
      origin &&
      /^https:\/\/code-du-travail-numerique-.+\.ovh\.fabrique\.social\.gouv\.fr$/.test(
        origin
      );

    const isAllowedOrigin =
      !origin || allowedOrigins.includes(origin) || isReviewBranch;

    if (isAllowedOrigin) {
      response.headers.set("Access-Control-Allow-Origin", origin || "*");
    }

    // Restrict allowed methods to only what's needed
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    // Be specific about allowed headers
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With"
    );

    // Add security headers for API routes
    response.headers.set("X-Content-Type-Options", "nosniff");
    // X-Frame-Options supprimé pour autoriser les iframes externes
    response.headers.set("X-XSS-Protection", "1; mode=block");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

    // Handle preflight requests
    if (request.method === "OPTIONS") {
      return new NextResponse(null, { status: 200, headers: response.headers });
    }

    // Block non-allowed origins for non-preflight requests
    if (!isAllowedOrigin && origin) {
      return new NextResponse("CORS policy violation", { status: 403 });
    }

    return response;
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const ContentSecurityPolicy = `
    default-src 'self';
    img-src 'self' https://travail-emploi.gouv.fr https://www.service-public.gouv.fr ${BUCKET_URL} https://matomo.fabrique.social.gouv.fr https://www.googletagmanager.com https://ad.doubleclick.net data:;
    script-src 'self' 'nonce-${nonce}' https://mon-entreprise.urssaf.fr https://matomo.fabrique.social.gouv.fr https://www.googletagmanager.com ${
      process.env.NEXT_PUBLIC_APP_ENV !== "production" ? "'unsafe-eval'" : ""
    };
    style-src 'self' 'unsafe-inline';
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-src 'self' https://mon-entreprise.urssaf.fr https://matomo.fabrique.social.gouv.fr https://www.googletagmanager.com *.dailymotion.com https://*.doubleclick.net;
    connect-src 'self' https://geo.api.gouv.fr https://sentry2.fabrique.social.gouv.fr https://matomo.fabrique.social.gouv.fr https://www.googletagmanager.com https://www.google.com;
    worker-src 'self' blob:;
    upgrade-insecure-requests;
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

  // Set comprehensive security headers
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );
  response.headers.set("X-Content-Type-Options", "nosniff");
  // X-Frame-Options supprimé pour autoriser les iframes externes
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=()"
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
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
