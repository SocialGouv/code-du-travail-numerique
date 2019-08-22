module.exports = {
  presets: [
    [
      "next/babel",
      {
        "preset-env": {
          targets: {
            browsers: ["last 5 version", "IE>=10"]
          }
        }
      }
    ]
  ],
  "plugins": ["babel-plugin-styled-components"]
};
