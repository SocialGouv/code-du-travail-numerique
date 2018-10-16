const withCSS = require("@zeit/next-css");
const withImages = require("next-images");

require("dotenv").config();

module.exports = withImages(
  withCSS({
    // use routes.js
    useFileSystemPublicRoutes: false,
    poweredByHeader: false,
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
    }
  })
);
