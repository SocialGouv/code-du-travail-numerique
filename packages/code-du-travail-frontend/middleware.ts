import { NextResponse } from "next/server";

export function middleware(request) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const ContentSecurityPolicy = `
  img-src 'self' https://travail-emploi.gouv.fr https://www.service-public.fr https://cdtn-prod-public.s3.gra.io.cloud.ovh.net https://matomo.fabrique.social.gouv.fr data:;
  script-src 'self' 'nonce-${nonce}' https://mon-entreprise.urssaf.fr https://matomo.fabrique.social.gouv.fr ${
    process.env.NEXT_PUBLIC_APP_ENV !== "production" && "'unsafe-eval'"
  };
  frame-src 'self' https://mon-entreprise.urssaf.fr https://matomo.fabrique.social.gouv.fr *.dailymotion.com;
  connect-src 'self' https://geo.api.gouv.fr https://sentry.fabrique.social.gouv.fr https://matomo.fabrique.social.gouv.fr https://www3.doubleclick.net https://marketingplatform.google.com/about/enterprise/;
  worker-src 'self' blob:;
  `;
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = ContentSecurityPolicy.replace(
    /\s{2,}/g,
    " "
  ).trim();

  const requestHeaders = new Headers(request.headers);
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
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
