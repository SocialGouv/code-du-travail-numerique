const withCSS = require("@zeit/next-css");
const withTM = require("next-plugin-transpile-modules");

module.exports = withTM(
  withCSS({
    // https://github.com/zeit/next.js/#disabling-file-system-routing
    useFileSystemPublicRoutes: false,
    transpileModules: ["p-debounce"],
    webpack(config, options) {
      config.module.rules.push({
        test: /\.(png|woff|woff2|eot|ttf|svg|gif|jpg)$/,
        loader: "file-loader",
        options: {
          publicPath: "/_next/static/",
          outputPath: "static/"
        }
      });
      return config;
    },
    publicRuntimeConfig: {
      API_URL: process.env.API_URL || "http://127.0.0.1:1337/api/v1",
      API_ADDRESS: "https://api-adresse.data.gouv.fr/search",
      PACKAGE_VERSION: require("./package.json").version,
      SENTRY_PUBLIC_DSN: process.env.SENTRY_PUBLIC_DSN,
      PIWIK_URL: process.env.PIWIK_URL,
      PIWIK_SITE_ID: process.env.PIWIK_SITE_ID,
      FRONTEND_PORT: process.env.FRONTEND_PORT,
      NODE_ENV: process.env.NODE_ENV
    }
  })
);
