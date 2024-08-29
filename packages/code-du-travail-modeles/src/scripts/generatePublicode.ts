import { generatePublicodeFiles } from "./lib";
// import { generateHeureRechercheEmploiTree } from "./generateHeureRechercheEmploiTree";
// import { generatePreavisDemissionTree } from "./generatePreavisDemissionTree";
import { generatePreavisLicenciementTree } from "./generatePreavisLicenciementTree";

async function main() {
  const dpl = generatePreavisLicenciementTree();
  // console.log("dpl", dpl);
  await generatePublicodeFiles(dpl, "preavis-licenciement", (texts) => {
    const [value] = texts;
    const [number, unit] = value.split(" ");
    const regExp = /\(([^)]+)\)/;
    const regExpValue = regExp.exec(value);
    const isNan = isNaN(parseInt(number));
    if (isNan) return { value: "0 mois", notification: value };
    return { value: `${number} ${unit}`, notification: regExpValue?.[1] ?? "" };
  });
}

main();
