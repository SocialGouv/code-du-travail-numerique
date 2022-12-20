const withTranspileModule = require("next-transpile-modules")([
  "@socialgouv/cdtn-sources",
  "@socialgouv/cdtn-slugify",
  "lit-element",
  "lit-html",
  "parse5",
  "p-debounce",
  "is-plain-obj",
]);

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const { version } = require("./package.json");

const ContentSecurityPolicy = `
default-src 'self' *.travail.gouv.fr *.data.gouv.fr *.fabrique.social.gouv.fr;
img-src 'self' data: *.fabrique.social.gouv.fr https://travail-emploi.gouv.fr https://mon-entreprise.urssaf.fr https://cdtnadminprod.blob.core.windows.net https://cdtnadmindev.blob.core.windows.net https://logs1412.xiti.com *.xiti.com;
script-src 'self' https://mon-entreprise.urssaf.fr *.fabrique.social.gouv.fr https://cdnjs.cloudflare.com ${
  process.env.NODE_ENV !== "production" && "'unsafe-eval'"
};
frame-src 'self' https://mon-entreprise.urssaf.fr https://matomo.fabrique.social.gouv.fr *.dailymotion.com;
style-src 'self' 'unsafe-inline';
font-src 'self' data: blob:;
prefetch-src 'self' *.fabrique.social.gouv.fr;
`;

const { withSentryConfig } = require("@sentry/nextjs");

const compose = (...fns) => (args) =>
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
    APP_VERSION: version,
  },
  sentry: {
    disableClientWebpackPlugin: true,
    disableServerWebpackPlugin: true,
  },
  swcMinify: true,
  compiler: {
    reactRemoveProperties:
      process.env.NODE_ENV === "production"
        ? { properties: ["data-testid"] }
        : false,
    styledComponents: true,
  },
};

module.exports = {
  async headers() {
    let headers;
    if (process.env.NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT) {
      headers = [
        {
          key: "X-Robots-Tag",
          value: "all",
        },
        {
          key: "Content-Security-Policy",
          value: ContentSecurityPolicy.replace(/\n/g, " ").trim(),
        },
      ];
    } else {
      headers = [
        {
          key: "X-Robots-Tag",
          value: "noindex, nofollow, nosnippet",
        },
      ];
    }
    return [
      {
        source: "/:path*",
        headers,
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
