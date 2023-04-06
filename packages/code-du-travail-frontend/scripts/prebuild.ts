import path from "path";
import fs from "fs";

import { integrationData } from "../src/integration/data";

export const filePath = path.join(__dirname, "../public/robots.txt");
export const generateRobotsTxt = (isOnProduction: boolean, host: string) => {
  const robotsDev = ["User-agent: *", "Disallow: /"].join("\n");
  const robotsProd = [
    "User-agent: *",
    "Disallow: /assets/",
    "Disallow: /images/",
    "",
    `Sitemap: ${host}/sitemap.xml`,
  ].join("\n");

  const robot = isOnProduction ? robotsProd : robotsDev;

  fs.writeFileSync(filePath, robot);
};

export const generateWidgetScript = (host: string) => {
  const widgetInputScriptPath = path.join(__dirname, "widget-template.js");
  const widgetOutputScriptPath = path.join(__dirname, "../public/widget.js");
  const data = fs.readFileSync(widgetInputScriptPath, {
    encoding: "utf8",
    flag: "r",
  });
  if (!data) return;
  const widgets = Object.values(integrationData).map(
    ({ id: name, url: integrationUrl }) => ({
      name,
      url: `${host}${integrationUrl}`,
    })
  );
  const hostedData = data.replace(/__WIDGETS__/g, JSON.stringify(widgets));

  fs.writeFileSync(widgetOutputScriptPath, hostedData);
};

const run = () => {
  const isProduction = !!process.env.NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT;
  const host = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  generateRobotsTxt(isProduction, host);
  console.log("Robots.txt generated.");
  generateWidgetScript(host);
  console.log("widget.js generated.");
};

run();
