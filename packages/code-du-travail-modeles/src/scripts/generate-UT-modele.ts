import { generateModeleTestFiles } from "./lib";
import { generatePreavisLicenciementTree } from "./generatePreavisLicenciementTree";

async function main() {
  const dpl = generatePreavisLicenciementTree();
  await generateModeleTestFiles(dpl, "preavisLicenciement");
}

main();
