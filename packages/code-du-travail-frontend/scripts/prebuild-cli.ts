import {
  generateRobotsTxt,
  generateWidgetScript,
  generateWidgetIntegrity,
} from "./prebuild";

const run = () => {
  const isProduction = !!process.env.NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT;
  const host = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  generateRobotsTxt(isProduction, host);
  console.log("Robots.txt generated.");
  generateWidgetScript(host);
  console.log("widget.js generated.");
  generateWidgetIntegrity();
  console.log("widgetIntegrity.ts generated.");
};

run();
