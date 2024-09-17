import { NextRequest, NextResponse } from "next/server";

const unsafeInDevMode =
  process.env.NEXT_PUBLIC_APP_ENV !== "production" ? "'unsafe-eval'" : "";

const replaceNewlinesAndSpace = (header) =>
  header.replace(/\s{2,}/g, " ").trim();

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
    connect-src 'self' https://geo.api.gouv.fr https://sentry.fabrique.social.gouv.fr https://matomo.fabrique.social.gouv.fr;
    script-src 'self' https://mon-entreprise.urssaf.fr https://matomo.fabrique.social.gouv.fr ${unsafeInDevMode} 'nonce-${nonce}';
    img-src 'self' https://travail-emploi.gouv.fr https://www.service-public.fr https://cdtn-prod-public.s3.gra.io.cloud.ovh.net https://matomo.fabrique.social.gouv.fr data:;
    frame-src 'self' https://mon-entreprise.urssaf.fr https://matomo.fabrique.social.gouv.fr *.dailymotion.com;
    worker-src 'self' blob:;
`;

  const contentSecurityPolicyHeaderValue = replaceNewlinesAndSpace(cspHeader);

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
