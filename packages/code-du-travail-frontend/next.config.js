const withSourceMaps = require("@zeit/next-source-maps");
const withTranspileModule = require("next-transpile-modules");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

const withTM = function(config) {
  if (process.env.NODE_ENV === "production") {
    return withTranspileModule(config);
  }
  return config;
};

const compose = (...fns) => args => fns.reduceRight((arg, fn) => fn(arg), args);

const nextConfig = {
  webpack: config => {
    config.module.rules.push({
      test: /\.test.js$/,
      loader: "ignore-loader"
    });
    config.watchOptions = {
      ignored: [/node_modules([\\]+|\/)+(?!react-ui)/]
    };
    return config;
  },
  // https://github.com/zeit/next.js/#disabling-file-system-routing
  useFileSystemPublicRoutes: true,
  poweredByHeader: false,
  publicRuntimeConfig: {
    API_SIRET2IDCC_URL:
      process.env.API_SIRET2IDCC_URL ||
      "https://siret2idcc.fabrique.social.gouv.fr/api/v2",
    API_ENTREPRISE_URL:
      process.env.API_ENTREPRISE_URL ||
      "https://entreprise.data.gouv.fr/api/sirene/v1",
    API_URL: process.env.API_URL || "http://127.0.0.1:1337/api/v1",
    FRONTEND_PORT: process.env.FRONTEND_PORT,
    NODE_ENV: process.env.NODE_ENV,
    PACKAGE_VERSION: process.env.VERSION || require("./package.json").version,
    PIWIK_SITE_ID: process.env.PIWIK_SITE_ID,
    PIWIK_URL: process.env.PIWIK_URL,
    SENTRY_PUBLIC_DSN: process.env.SENTRY_PUBLIC_DSN,
    SUGGEST_URL:
      process.env.SUGGEST_URL || "http://127.0.0.1:1337/api/v1/suggest"
  },
  transpileModules: ["@cdt/sources", "@cdt/data"]
};

module.exports = compose(
  withSourceMaps,
  withBundleAnalyzer,
  withTM
)(nextConfig);
