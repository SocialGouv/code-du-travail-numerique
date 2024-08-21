import { generatePublicodeFiles } from "./lib";
// import { generateHeureRechercheEmploiTree } from "./generateHeureRechercheEmploiTree";
// import { generatePreavisDemissionTree } from "./generatePreavisDemissionTree";
import { generatePreavisLicenciementTree } from "./generatePreavisLicenciementTree";

async function main() {
  if (process.argv.length < 3) {
    throw new Error("missing argument 'path'");
  }

  const path = process.argv[2];
  const dpl = generatePreavisLicenciementTree();
  // console.log("dpl", dpl);
  await generatePublicodeFiles(dpl, "DureePreavisLicenciement", path);
}

main();
