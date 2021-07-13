import resolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const packageJson = require("./package.json");

export default {
  input: "src/index.js",
  output: [
    {
      file: packageJson.exports,
      format: "esm",
    },
  ],
  plugins: [
    peerDepsExternal(),
    // using Babel to transform jsx
    // using Babel to transform jsx
    babel({
      exclude: ["node_modules/**", "__tests__/**"],
      externalHelpers: false,
      include: "src/**/*.js",
    }),

    resolve(),
  ],
  watch: {
    include: "src/**",
  },
};
