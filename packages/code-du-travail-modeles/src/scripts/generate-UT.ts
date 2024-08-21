import { generateTestFiles } from "./lib";
import { generateHeureRechercheEmploiTree } from "./generateHeureRechercheEmploiTree";
import { generatePreavisDemissionTree } from "./generatePreavisDemissionTree";
import { generatePreavisLicenciementTree } from "./generatePreavisLicenciementTree";
// import { generateIndemnitePrecariteTree } from "./generateIndemnitePrecarite";

async function main() {
  if (process.argv.length < 3) {
    throw new Error("missing argument 'path'");
  }
  const path = process.argv[2];
  const hre = generateHeureRechercheEmploiTree();
  await generateTestFiles(
    hre,
    "HeuresRechercheEmploi",
    `${path}/src/outils/HeuresRechercheEmploi/__tests__/agreements`
  );

  const dpd = generatePreavisDemissionTree();
  await generateTestFiles(
    dpd,
    "DureePreavisDemission",
    `${path}/src/outils/DureePreavisDemission/__tests__/agreements`
  );

  const dpl = generatePreavisLicenciementTree();
  await generateTestFiles(
    dpl,
    "DureePreavisLicenciement",
    `${path}/src/outils/DureePreavisLicenciement/__tests__/agreements`
  );

  // const ip = generateIndemnitePrecariteTree();
  // await generateTestFiles(
  //   ip,
  //   "SimulateurIndemnitePrecarite",
  //   `${path}/src/outils/IndemnitePrecarite/__tests__/agreements`
  // );
}

main();
