const withCSS = require("@zeit/next-css");
module.exports = withCSS({
  // https://github.com/zeit/next.js/#disabling-file-system-routing
  useFileSystemPublicRoutes: false,

  // allow next-css to handle file contains in vendors css files
  //https://github.com/zeit/next.js/issues/5225#issuecomment-430710929
  //https://github.com/akiran/react-slick/issues/842#issuecomment-385378629
  webpack(config) {
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
});
