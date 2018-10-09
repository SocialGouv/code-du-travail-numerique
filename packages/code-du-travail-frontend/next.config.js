const withCSS = require("@zeit/next-css");
//const withImages = require("next-images");

require("dotenv").config();

module.exports = withCSS({
  // use routes.js
  useFileSystemPublicRoutes: false,
  poweredByHeader: false
});
