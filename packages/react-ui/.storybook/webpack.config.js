const path = require("path");
const storysource = require.resolve("@storybook/addon-storysource/loader");

module.exports = function({ config }) {
  config.module.rules.push({
    test: /story\.js?$/,
    loaders: [storysource],
    include: path.resolve(__dirname, "../"),
    enforce: "pre",
  });

  return config;
};
