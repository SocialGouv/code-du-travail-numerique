import { generateUITestFiles } from "./lib";
// import { generateHeureRechercheEmploiTree } from "./generateHeureRechercheEmploiTree";
import { generatePreavisDemissionTree } from "./generatePreavisDemissionTree";
import { generatePreavisLicenciementTree } from "./generatePreavisLicenciementTree";
// import { generateIndemnitePrecariteTree } from "./generateIndemnitePrecarite";

async function main() {
  const path = "../code-du-travail-frontend/";
  // if (process.argv.length < 3) {
  //   throw new Error("missing argument 'path'");
  // }
  // const path = process.argv[2];
  // const hre = generateHeureRechercheEmploiTree();
  // await generateUITestFiles(
  //   hre,
  //   "HeuresRechercheEmploi",
  //   `${path}/src/outils/HeuresRechercheEmploi/__tests__/agreements`
  // );

  const dpd = generatePreavisDemissionTree();
  await generateUITestFiles(
    dpd,
    "DureePreavisDemission",
    `${path}/src/outils/DureePreavisDemission/__tests__/agreements`,
    (texts) => [
      texts[0] === "0" ? "il n’y a pas de préavis à effectuer" : texts[0],
    ]
  );

  const dpl = generatePreavisLicenciementTree();
  await generateUITestFiles(
    dpl,
    "DureePreavisLicenciement",
    `${path}/src/outils/DureePreavisLicenciement/__tests__/agreements`,
    (texts) => [texts[0] === "0" ? "Aucun préavis" : texts[0]]
  );

  // const ip = generateIndemnitePrecariteTree();
  // await generateUITestFiles(
  //   ip,
  //   "SimulateurIndemnitePrecarite",
  //   `${path}/src/outils/IndemnitePrecarite/__tests__/agreements`,
  //   (texts) => [texts[0]]
  // );
}

main();
