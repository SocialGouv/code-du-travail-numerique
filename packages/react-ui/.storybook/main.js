const path = require("path");

module.exports = {
  stories: ["../src/**/story.@(js|mdx|ts|tsx|jsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    {
      name: "@storybook/addon-storysource",
      options: {
        rule: {
          test: [/story\.jsx?$/, /story\.tsx?$/],
          include: [path.resolve(__dirname, "../src")],
        },
      },
    },
  ],
};
