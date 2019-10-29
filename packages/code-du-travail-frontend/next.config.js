const withSourceMaps = require("@zeit/next-source-maps");
const withTMProd = require("next-transpile-modules");

const withTM = function(config) {
  if (process.env.NODE_ENV === "production") {
    return withTMProd(config);
  }
  return config;
};

module.exports = withSourceMaps(
  withTM({
    webpack: config => {
      config.module.rules.push({
        test: /\.test.js$/,
        loader: "ignore-loader"
      });
      return config;
    },
    // https://github.com/zeit/next.js/#disabling-file-system-routing
    useFileSystemPublicRoutes: true,
    poweredByHeader: false,
    publicRuntimeConfig: {
      API_SIRET2IDCC_URL:
        process.env.API_SIRET2IDCC_URL ||
        "https://siret2idcc.num.social.gouv.fr",
      API_URL: process.env.API_URL || "http://127.0.0.1:1337/api/v1",
      FRONTEND_PORT: process.env.FRONTEND_PORT,
      NODE_ENV: process.env.NODE_ENV,
      PACKAGE_VERSION: process.env.VERSION || require("./package.json").version,
      PIWIK_SITE_ID: process.env.PIWIK_SITE_ID,
      PIWIK_URL: process.env.PIWIK_URL,
      SENTRY_PUBLIC_DSN: process.env.SENTRY_PUBLIC_DSN,
      SUGGEST_URL:
        process.env.SUGGEST_URL || "http://127.0.0.1:5000/api/suggest"
    },
    transpileModules: ["@cdt/sources", "@cdt/data"]
  })
);
