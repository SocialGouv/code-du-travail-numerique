import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs";

const packageJson = require("./package.json");

export default {
  input: "src/index.js",
  output: [
    {
      file: packageJson.module,
      format: "esm",
    },
    {
      file: packageJson.main,
      format: "cjs",
    },
  ],
  plugins: [
    peerDepsExternal(),
    // using Babel to transform jsx
    babel({
      babelHelpers: "bundled",
      exclude: ["node_modules/**", "story.js", "test.js"],
      include: "src/**/*.js",
    }),
    resolve(),
    commonjs(),
  ],
  watch: {
    include: "src/**",
  },
};
