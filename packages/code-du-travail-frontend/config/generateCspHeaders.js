const SENTRY_PUBLIC_DSN = process.env.SENTRY_PUBLIC_DSN;
const dev = process.env.NODE_ENV !== "production";
const PACKAGE_VERSION = process.env.VERSION || "";
const FRONTEND_HOST = process.env.FRONTEND_HOST || `http://localhost:${PORT}`;

function getSentryCSPUrl() {
  // NOTE(douglasduteil): is pre production if we can find the version in the url
  // All "http://<version>-code-travail.dev.frabrique.social.gouv.fr" are preprod
  // "http://code.travail.gouv.fr" is prod
  const isPreProduction =
    PACKAGE_VERSION && /^v\d+-\d+-\d+/.test(FRONTEND_HOST);
  const environment = isPreProduction ? "preproduction" : "production";

  return `${SENTRY_PUBLIC_DSN}&sentry_environment=${environment}&sentry_release=${PACKAGE_VERSION}`;
}

function generateCSPHeader() {
  const headers = {
    "Content-Security-Policy": {
      "default-src": [
        "'self'",
        "*.travail.gouv.fr",
        "*.data.gouv.fr",
        "*.fabrique.social.gouv.fr",
      ],
      "font-src": ["'self'", "data:", "blob:"],
      frameSrc: [
        "'self'",
        "https://mon-entreprise.fr",
        "https://matomo.fabrique.social.gouv.fr",
        "*.dailymotion.com",
      ],
      "img-src": [
        "'self'",
        "data:",
        "*.fabrique.social.gouv.fr",
        "https://travail-emploi.gouv.fr",
        "https://mon-entreprise.fr",
        "https://ad.doubleclick.net",
      ],
      "script-src": [
        "'self'",
        "'unsafe-inline'",
        "https://mon-entreprise.fr",
        "https://www.googletagmanager.com",
        "*.fabrique.social.gouv.fr",
        "https://cdnjs.cloudflare.com",
      ],
      "style-src": ["'self'", "'unsafe-inline'"],
      ...(SENTRY_PUBLIC_DSN && { "report-uri": getSentryCSPUrl() }),
    },
    ...(dev && { "Content-Security-Policy-Report-Only": true }),
  };
  if (dev) {
    headers["Content-Security-Policy"]["default-src"].push(
      "http://127.0.0.1:*/"
    );
    headers["Content-Security-Policy"]["script-src"].push("'unsafe-eval'");
  }
  return Object.entries(headers).map(([header, value]) => ({
    key: header,
    value: values.,
  }));
}

module.exports = generateCSPHeader;
