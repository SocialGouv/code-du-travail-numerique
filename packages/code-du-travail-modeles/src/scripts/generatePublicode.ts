import { generatePublicodeFiles } from "./lib";
// import { generateHeureRechercheEmploiTree } from "./generateHeureRechercheEmploiTree";
// import { generatePreavisDemissionTree } from "./generatePreavisDemissionTree";
import { generatePreavisLicenciementTree } from "./generatePreavisLicenciementTree";

async function main() {
  const dpl = generatePreavisLicenciementTree();
  // console.log("dpl", dpl);
  await generatePublicodeFiles(dpl, "DureePreavisLicenciement");
}

main();
