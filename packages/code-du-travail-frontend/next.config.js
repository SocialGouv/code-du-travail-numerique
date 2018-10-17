const withCSS = require("@zeit/next-css");
const withImages = require("next-images");

require("dotenv").config();

module.exports = withImages(
  withCSS({
    // https://github.com/zeit/next.js/#disabling-file-system-routing
    useFileSystemPublicRoutes: false
  })
);
