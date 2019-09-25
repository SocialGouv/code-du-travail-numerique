const withSourceMaps = require("@zeit/next-source-maps");

module.exports = withSourceMaps({
  // https://github.com/zeit/next.js/#disabling-file-system-routing
  useFileSystemPublicRoutes: true,

  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module like mdx/runtime
    if (!isServer) config.node = { fs: "empty" };
    return config;
  },

  publicRuntimeConfig: {
    API_ADDRESS: "https://api-adresse.data.gouv.fr/search",
    API_SIRET2IDCC_URL:
      process.env.API_SIRET2IDCC_URL || "https://siret2idcc.num.social.gouv.fr",
    API_URL: process.env.API_URL || "http://127.0.0.1:1337/api/v1",
    FRONTEND_PORT: process.env.FRONTEND_PORT,
    NODE_ENV: process.env.NODE_ENV,
    PACKAGE_VERSION: process.env.VERSION || require("./package.json").version,
    PIWIK_SITE_ID: process.env.PIWIK_SITE_ID,
    PIWIK_URL: process.env.PIWIK_URL,
    SENTRY_PUBLIC_DSN: process.env.SENTRY_PUBLIC_DSN,
    SUGGEST_URL: process.env.SUGGEST_URL || "http://127.0.0.1:5000/api/suggest"
  }
});
