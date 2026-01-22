import path from "path";
import fs from "fs";
import crypto from "crypto";

export const filePath = path.join(__dirname, "../public/robots.txt");
export const generateRobotsTxt = (isOnProduction: boolean, host: string) => {
  const robotsDev = ["User-agent: *", "Disallow: /"].join("\n");
  const robotsProd = [
    "User-agent: *",
    "Disallow: /assets/",
    "Disallow: /images/",
    "Disallow: /recherche",
    "",
    `Sitemap: ${host}/sitemap.xml`,
  ].join("\n");

  const robot = isOnProduction ? robotsProd : robotsDev;

  fs.writeFileSync(filePath, robot);
};

export const generateWidgetScript = (host: string) => {
  const widgetInputScriptPath = path.join(__dirname, "widget-template.js");
  const widgetOutputScriptPath = path.join(__dirname, "../public/widget.js");
  const normalizedHost = host.replace(/\/$/, "");
  const data = fs.readFileSync(widgetInputScriptPath, {
    encoding: "utf8",
    flag: "r",
  });
  if (!data) return;
  const hostedData = data.replace(/__HOST__/g, normalizedHost);

  fs.writeFileSync(widgetOutputScriptPath, hostedData);
};

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
      'export const WIDGET_LOADER_INTEGRITY = "' + integrity + '" as const;',
      "",
    ].join("\n")
  );
};
