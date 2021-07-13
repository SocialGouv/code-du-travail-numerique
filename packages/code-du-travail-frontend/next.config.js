const withSourceMaps = require("@zeit/next-source-maps");

const withTranspileModule = require("next-transpile-modules")([
  "@socialgouv/cdtn-sources",
  "@socialgouv/cdtn-slugify",
  "@socialgouv/cdtn-ui",
  "@socialgouv/react-fiche-service-public",
  "@ungap/url-search-params",
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

const compose = (...fns) => (args) =>
  fns.reduceRight((arg, fn) => fn(arg), args);

const nextConfig = {
  devIndicators: {
    autoPrerender: false,
  },
  future: {
    webpack5: true,
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

module.exports = {
  async redirects() {
    return [
      {
        destination: "/api/sitemap",
        permanent: false,
        source: "/sitemap.xml",
      },
      {
        destination: "/themes/:slug",
        permanent: true,
        source: "/themes/(\\d{1,}-):slug",
      },
    ];
  },
  ...compose(
    withSourceMaps,
    withBundleAnalyzer,
    withTranspileModule
  )(nextConfig),
};
