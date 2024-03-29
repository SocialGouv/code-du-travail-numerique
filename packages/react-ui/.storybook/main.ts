import type { StorybookConfig } from "@storybook/react-vite";

const path = require("path");

const config: StorybookConfig = {
  stories: ["../src/**/story.@(js|mdx|ts|tsx|jsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
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
  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: {
        viteConfigPath: path.resolve(__dirname, "../vite.config.js"),
      },
    },
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
