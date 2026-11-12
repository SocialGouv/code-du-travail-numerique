import { generateWidgetIntegrity } from "./prebuild";

const run = () => {
  generateWidgetIntegrity();
  console.log("widgetIntegrity.ts generated.");
};

run();
