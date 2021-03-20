import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";

export default {
  external: ["prop-types", "react", "react-dom", "styled-components"],
  input: "src/index.js",
  output: [
    {
      file: "lib/index.js",
      format: "cjs",
    },
    {
      file: "lib/index.esm.js",
      format: "esm",
    },
  ],
  plugins: [babel({ babelHelpers: "bundled" }), nodeResolve(), commonjs()],
  watch: {
    include: "src/**",
  },
};
