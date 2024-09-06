import { generatePublicodeFiles } from "./lib";
// import { generatePreavisDemissionTree } from "./generatePreavisDemissionTree";
import { generatePreavisLicenciementTree } from "./generatePreavisLicenciementTree";
import { generateHeureRechercheEmploiTree } from "./generateHeureRechercheEmploiTree";

async function main() {
  const dpl = generatePreavisLicenciementTree();

  await generatePublicodeFiles(dpl, "preavis-licenciement", (texts) => {
    const [value] = texts;
    const [number, unit] = value.split(" ");
    const regExp = /\(([^)]+)\)/;
    const regExpValue = regExp.exec(value);
    const isNan = isNaN(parseInt(number));
    if (isNan) return { value: "0 mois", notification: value };
    return { value: `${number} ${unit}`, notification: regExpValue?.[1] ?? "" };
  });

  const hre = generateHeureRechercheEmploiTree();
  await generatePublicodeFiles(hre, "heures-recherche-emploi", (texts) => {
    const generateValue = (text: string) => `
    - ${text}`;
    const notification = texts
      .reduce<string[]>((arr, text, index) => {
        if (text && index !== 0) {
          arr.push(generateValue(text));
        }
        return arr;
      }, [])
      .join("");
    return {
      value: `"'${texts[0]}'"`,
      notification,
    };
  });
}

main();
