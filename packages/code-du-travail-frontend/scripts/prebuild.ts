import path from "path";
import fs from "fs";
import crypto from "crypto";

export const generateWidgetIntegrity = () => {
  const widgetLoaderPath = path.join(__dirname, "../public/widget-loader.js");
  const widgetIntegrityOutputPath = path.join(
    __dirname,
    "../src/modules/integration/widgetIntegrity.ts"
  );

  // The embed snippet uses a stable loader file (`/widget-loader.js`) so
  // integrators don't have to update their HTML on each release.
  const content = fs.readFileSync(widgetLoaderPath);
  const hash = crypto.createHash("sha384").update(content).digest("base64");
  const integrity = `sha384-${hash}`;

  fs.mkdirSync(path.dirname(widgetIntegrityOutputPath), { recursive: true });
  fs.writeFileSync(
    widgetIntegrityOutputPath,
    [
      "// This file is generated at build time by scripts/prebuild-cli.ts",
      "",
      "export const WIDGET_LOADER_INTEGRITY =",
      `  "${integrity}" as const;`,
      "",
    ].join("\n")
  );
};
