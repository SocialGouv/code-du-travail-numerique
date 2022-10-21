const withTranspileModule = require("next-transpile-modules")([
  "@socialgouv/cdtn-sources",
  "@socialgouv/cdtn-slugify",
  "@cdt/data",
  "lit-element",
  "lit-html",
  "parse5",
  "p-debounce",
  "is-plain-obj",
]);

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const ContentSecurityPolicy = `
default-src 'self' *.travail.gouv.fr *.data.gouv.fr *.fabrique.social.gouv.fr;
img-src 'self' data: *.fabrique.social.gouv.fr https://travail-emploi.gouv.fr https://mon-entreprise.urssaf.fr https://cdtnadminprod.blob.core.windows.net https://cdtnadmindev.blob.core.windows.net https://logs1412.xiti.com *.xiti.com *.doubleclick.net;
script-src 'self' https://mon-entreprise.urssaf.fr *.fabrique.social.gouv.fr https://cdnjs.cloudflare.com ${
  process.env.NODE_ENV !== "production" && "'unsafe-eval'"
} https://www.googletagmanager.com *.doubleclick.net nonce-tarteaucitron nonce-smarttag;
frame-src 'self' https://mon-entreprise.urssaf.fr https://matomo.fabrique.social.gouv.fr *.dailymotion.com *.doubleclick.net;
style-src 'self' 'unsafe-inline';
font-src 'self' data: blob:;
prefetch-src 'self' *.fabrique.social.gouv.fr;
`;

const { withSentryConfig } = require("@sentry/nextjs");

const compose =
  (...fns) =>
  (args) =>
    fns.reduceRight((arg, fn) => fn(arg), args);

const nextConfig = {
  devIndicators: {
    autoPrerender: false,
  },
  poweredByHeader: false,
  publicRuntimeConfig: {
    API_ENTREPRISE_URL:
      process.env.API_ENTREPRISE_URL ||
      "https://entreprise.data.gouv.fr/api/sirene",
    API_SIRET2IDCC_URL:
      process.env.API_SIRET2IDCC_URL ||
      "https://siret2idcc.fabrique.social.gouv.fr/api/v2",
    API_URL: process.env.API_URL || "http://127.0.0.1:1337/api/v1",
    AZURE_BASE_URL: process.env.AZURE_BASE_URL,
    AZURE_CONTAINER: process.env.AZURE_CONTAINER,
    COMMIT: process.env.COMMIT,
    FRONTEND_HOST: process.env.FRONTEND_HOST
      ? `https://${process.env.FRONTEND_HOST}`
      : `http://localhost:${process.env.FRONTEND_PORT || 3000}`,
    PACKAGE_VERSION: process.env.VERSION || require("./package.json").version,
    PIWIK_SITE_ID: process.env.PIWIK_SITE_ID,
    PIWIK_URL: process.env.PIWIK_URL,
  },
  sentry: {
    disableClientWebpackPlugin: true,
    disableServerWebpackPlugin: true,
  },
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy.replace(/\n/g, " ").trim(),
          },
          {
            key: "X-Robots-Tag",
            value: process.env.NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT
              ? "all"
              : "noindex, nofollow, nosnippet",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        destination: "/themes/:slug",
        permanent: true,
        source: "/themes/(\\d{1,}-):slug",
      },
      {
        destination: "/api/health",
        permanent: true,
        source: "/health",
      },
    ];
  },
  ...compose(
    withBundleAnalyzer,
    withTranspileModule,
    withSentryConfig
  )(nextConfig),
};
