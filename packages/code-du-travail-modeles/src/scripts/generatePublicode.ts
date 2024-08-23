import { generatePublicodeFiles } from "./lib";
// import { generateHeureRechercheEmploiTree } from "./generateHeureRechercheEmploiTree";
// import { generatePreavisDemissionTree } from "./generatePreavisDemissionTree";
import { generatePreavisLicenciementTree } from "./generatePreavisLicenciementTree";

async function main() {
  const dpl = generatePreavisLicenciementTree();
  // console.log("dpl", dpl);
  await generatePublicodeFiles(dpl, "preavis-licenciement", (texts) => {
    const [value] = texts;
    const [number] = value.split(" ");
    const isNan = isNaN(parseInt(number));
    if (isNan) return "0";
    return value;
  });
}

main();
