import react from "@vitejs/plugin-react";
import fs from "fs/promises";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
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
              loader: "tsx",
            }));
          },
        },
      ],
    },
  },
  plugins: [react()],
});
