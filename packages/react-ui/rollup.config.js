import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";

export default {
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
  external: ["prop-types", "react", "react-dom", "styled-components"],
  plugins: [babel(), resolve(), commonjs()],
  watch: {
    include: "src/**",
  },
};
