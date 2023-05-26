import react from "@vitejs/plugin-react";
import fs from "fs/promises";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/index.ts"),
      // the proper extensions will be added
      fileName: "react-ui",

      name: "@socialgouv/react-ui",
    },
  },
  esbuild: {
    exclude: [],
    include: /(src|\.storybook)\/.*\.[tj]sx?$/,
    loader: "tsx",
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: "load-js-files-as-jsx",
          setup(build) {
            build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
              contents: await fs.readFile(args.path, "utf8"),
              loader: "jsx",
            }));
          },
        },
      ],
    },
  },
  plugins: [react()],
});
