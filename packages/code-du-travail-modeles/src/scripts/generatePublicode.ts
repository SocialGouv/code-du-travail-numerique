import { generatePublicodeFiles } from "./lib";
// import { generatePreavisDemissionTree } from "./generatePreavisDemissionTree";
import { generatePreavisLicenciementTree } from "./generatePreavisLicenciementTree";
// import { generateHeureRechercheEmploiTree } from "./generateHeureRechercheEmploiTree";
import { generatePreavisDemissionTree } from "./generatePreavisDemissionTree";

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

  // const hre = generateHeureRechercheEmploiTree();
  // await generatePublicodeFiles(hre, "heures-recherche-emploi", (texts) => {
  //   const generateValue = (text: string) => `
  //   - ${text}`;
  //   const notification = texts
  //     .reduce<string[]>((arr, text, index) => {
  //       if (text && index !== 0) {
  //         arr.push(generateValue(text));
  //       }
  //       return arr;
  //     }, [])
  //     .join("");
  //   return {
  //     value: `"'${texts[0]}'"`,
  //     notification,
  //   };
  // });
}

main();
