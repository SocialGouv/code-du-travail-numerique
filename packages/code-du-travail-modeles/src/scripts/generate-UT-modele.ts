import { OptionResult } from "./lib";
import { generateModeleTestFiles } from "./lib";
import { generatePreavisLicenciementTree } from "./generatePreavisLicenciementTree";
import { generateHeureRechercheEmploiTree } from "./generateHeureRechercheEmploiTree";
import { generatePreavisDemissionTree } from "./generatePreavisDemissionTree";
import { generateIndemnitePrecariteTree } from "./generateIndemnitePrecarite";

async function main() {
  const dpl = generatePreavisLicenciementTree();
  await generateModeleTestFiles(
    dpl,
    "preavisLicenciement",
    (result: OptionResult) => {
      const valueText = result.texts.shift() ?? "";
      const [value, unit] = valueText.split(" ");
      const expectedValue = parseInt(value);
      const isNan = isNaN(expectedValue) || expectedValue === undefined;
      const expectedResult = !isNan
        ? { expectedValue, unit }
        : { expectedValue: 0, unit: "" };
      const expectedReferences = result.refs.map(({ label, url }) => ({
        article: label,
        url: url.trim(),
      }));
      return {
        expectedResult,
        expectedReferences,
        expectedNotifications: result.texts,
      };
    },
    () =>
      `"contrat salarié . convention collective . ancienneté légal": "'Moins de 6 mois'",`
  );

  const pd = generatePreavisDemissionTree();
  await generateModeleTestFiles(
    pd,
    "preavisDemission",
    (result: OptionResult) => {
      const valueText = result.texts.shift() ?? "";
      const [value, unit] = valueText.split(" ");
      const expectedValue = parseInt(value);
      const isNan = isNaN(expectedValue) || expectedValue === undefined;
      const expectedResult = !isNan
        ? { expectedValue, unit }
        : { expectedValue: 0, unit: "" };
      const expectedReferences = result.refs.map(({ label, url }) => ({
        article: label,
        url: url.trim(),
      }));
      return {
        expectedResult,
        expectedReferences,
        expectedNotifications: result.texts,
      };
    }
  );

  const ip = generateIndemnitePrecariteTree();
  await generateModeleTestFiles(
    ip,
    "indemnitePrecarite",
    (result: OptionResult) => {
      const texts =
        result.texts.length > 1 ? result.texts : ["300", result.texts[0]];
      const expectedResult = {
        expectedValue: parseInt(texts.shift() ?? "300"),
        unit: "€",
      };
      const expectedReferences = result.refs.map(({ label, url }) => ({
        article: label,
        url: url.trim(),
      }));
      const rate = parseInt(texts[0]);
      const isNan = isNaN(rate);
      const expectedFormula = {
        formula: isNan
          ? "1/10 * Sref"
          : `${rate === 10 ? "1/10" : `${rate}/100`} * Sref`,
        explanations: ["Sref : Salaire de référence (3000 €)"],
      };
      return {
        expectedResult,
        expectedReferences,
        expectedNotifications: [],
        expectedFormula,
      };
    },
    () => `"contrat salarié . salaire de référence": "3000",
        "contrat salarié . contractType": "'CDD'",
        "contrat salarié . finContratPeriodeDessai": "non",
        "contrat salarié . propositionCDIFindeContrat": "non",
        "contrat salarié . refusCDIFindeContrat": "non",
        "contrat salarié . interruptionFauteGrave": "non",
        "contrat salarié . refusRenouvellementAuto": "non",
        "contrat salarié . cttFormation": "non",
        "contrat salarié . ruptureContratFauteGrave": "non",
        "contrat salarié . propositionCDIFinContrat": "non",
        "contrat salarié . refusSouplesse": "non",`
  );

  const hre = generateHeureRechercheEmploiTree();
  await generateModeleTestFiles(
    hre,
    "HeuresRechercheEmploi",
    (result: OptionResult) => {
      const expectedResult = {
        expectedValue: result.texts[0],
        unit: "",
      };
      const expectedReferences = result.refs.map(({ label, url }) => ({
        article: label,
        url,
      }));
      const expectedNotifications = [
        ...(result.texts.length > 1 ? [result.texts[1]] : []),
        ...(result.texts.length > 2 ? [result.texts[2]] : []),
      ];
      return { expectedResult, expectedReferences, expectedNotifications };
    }
  );
}

main();
