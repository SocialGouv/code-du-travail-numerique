import { generatePublicodeFiles } from "./lib";
import { generatePreavisLicenciementTree } from "./generatePreavisLicenciementTree";
import { generateHeureRechercheEmploiTree } from "./generateHeureRechercheEmploiTree";
import { generatePreavisDemissionTree } from "./generatePreavisDemissionTree";
import { generateIndemnitePrecariteTree } from "./generateIndemnitePrecarite";

async function main() {
  const dpl = generatePreavisLicenciementTree();
  await generatePublicodeFiles(dpl, "preavis-licenciement", (texts) => {
    const value = texts.shift() ?? "";
    return { value, notification: texts.length > 1 ? texts : texts[0] };
  });

  const pd = generatePreavisDemissionTree();
  await generatePublicodeFiles(pd, "preavis-demission", (texts) => {
    const value = texts.shift() ?? "";
    return { value, notification: texts.length > 1 ? texts : texts[0] };
  });

  const ip = generateIndemnitePrecariteTree();
  await generatePublicodeFiles(ip, "indemnite-precarite", (texts) => {
    texts.shift();
    const rate = parseInt(texts[0]);

    const isNan = isNaN(rate);
    const value = !isNan
      ? `
    produit:
      assiette: contrat salarié . salaire de référence
      facteur: ${rate / 100}
  arrondi: 2 décimales
  unité: €
  cdtn:
    formule:
      explanations:
        - "Sref : Salaire de référence": contrat salarié . salaire de référence
      formula: ${rate === 10 ? "1/10" : `${rate}/100`} * Sref`
      : "0";
    return { value, notification: [] };
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
