const withSourceMaps = require("@zeit/next-source-maps");

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

const PORT = parseInt(process.env.FRONTEND_PORT, 10) || 3000;
const PACKAGE_VERSION = process.env.VERSION || "";
const FRONTEND_HOST = process.env.FRONTEND_HOST || `http://localhost:${PORT}`;
const SENTRY_PUBLIC_DSN = process.env.SENTRY_PUBLIC_DSN;

const IS_PRODUCTION_DEPLOYMENT =
  process.env.IS_PRODUCTION_DEPLOYMENT === "true";
  const PROD_HOSTNAME = process.env.PROD_HOSTNAME || "code.travail.gouv.fr";

function getSentryCspUrl() {
  // NOTE(douglasduteil): is pre production if we can find the version in the url
  // All "http://<version>-code-travail.dev.frabrique.social.gouv.fr" are preprod
  // "http://code.travail.gouv.fr" is prod
  const isPreProduction =
    PACKAGE_VERSION && /^v\d+-\d+-\d+/.test(FRONTEND_HOST);
  const environment = isPreProduction ? "preproduction" : "production";

  return `${SENTRY_PUBLIC_DSN}&sentry_environment=${environment}&sentry_release=${PACKAGE_VERSION}`;
}

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const compose = (...fns) => (args) =>
  fns.reduceRight((arg, fn) => fn(arg), args);


  // en prod faire ça:

  if (IS_PRODUCTION_DEPLOYMENT) {
    server.use(async function (ctx, next) {
      const isProdUrl = ctx.host === PROD_HOSTNAME;
      const isHealthCheckUrl = ctx.path === "/health";
      if (!isProdUrl && !isHealthCheckUrl) {
        const productionUrl = `https://${PROD_HOSTNAME}${ctx.originalUrl}`;
        if (process.env.NODE_ENV !== "test") {
          console.log(
            `301 redirect ${ctx.host}${ctx.originalUrl} to production url ${productionUrl}`
          );
        }
        ctx.status = 301;
        ctx.redirect(productionUrl);
        return;
      }
      await next();
    });

  // en dev setter ce header là:
  server.use(async function (ctx, next) {
    ctx.set({ "X-Robots-Tag": "noindex, nofollow, nosnippet" });
    await next();
  });

const nextConfig = {
  devIndicators: {
    autoPrerender: false,
  },
  async headers() {
    return [
      {
        headers: [
          {
            key: "Content-Security-Policy",
            value: "",
          },
        ],
        source: "/*",
      },
    ];
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
    COMMIT: process.env.COMMIT,
    FRONTEND_HOST:
      `https://${process.env.FRONTEND_HOST}` ||
      `http://localhost:${process.env.FRONTEND_PORT || 3000}`,
    PACKAGE_VERSION: process.env.VERSION || require("./package.json").version,
    PIWIK_SITE_ID: process.env.PIWIK_SITE_ID,
    PIWIK_URL: process.env.PIWIK_URL,
    SENTRY_PUBLIC_DSN: process.env.SENTRY_PUBLIC_DSN,
  },
  // https://github.com/zeit/next.js/#disabling-file-system-routing
  useFileSystemPublicRoutes: true,
  webpack: (config) => {
    config.module.rules.push({
      loader: "ignore-loader",
      test: /\.test.js$/,
    });
    return config;
  },
};

module.exports = compose(
  withSourceMaps,
  withBundleAnalyzer,
  withTranspileModule
)(nextConfig);
