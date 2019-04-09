import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import babel from "rollup-plugin-babel";

export default {
  input: "src/index.js",
  output: [
    {
      file: "lib/index.js",
      format: "cjs"
    },
    {
      file: "lib/index.esm.js",
      format: "esm"
    }
  ],
  external: ["prop-types", "react", "styled-components"],
  plugins: [
    resolve({
      browser: true
    }),
    commonjs({
      include: /node_modules\//,
      // This is tricky, if we ever decide to extract this subrepo from the mono repo,
      // then these paths will break and we will have to change them
      namedExports: {
        "../../node_modules/react-accessible-accordion/dist/umd/index.js": [
          "Accordion",
          "AccordionItem",
          "AccordionItemTitle",
          "AccordionItemBody"
        ],
        "../../node_modules/react-dom/index.js": ["createPortal"],
        "../../node_modules/focus-trap/index.js": ["default"]
      }
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    babel({
      exclude: "node_modules/**"
    })
  ],
  watch: {
    include: "src/**"
  }
};
