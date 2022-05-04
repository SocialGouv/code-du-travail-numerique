import "./publicode-matcher";

import Engine from "publicodes";

import { extractCcnIds } from "../../internal/extractor";
import { mergeModels } from "../../internal/merger";

const engine = new Engine(mergeModels());
const allCc = extractCcnIds(engine).concat("");
allCc.forEach((idcc) => {
  test(`Vérification que l'ensemble des données manquantes pour la CC ${idcc} possède un titre avec un type cdtn`, () => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": `'${idcc}'`,
      })
      .evaluate("contrat salarié . préavis de retraite");

    Object.keys(result.missingVariables).forEach((missingVariable) => {
      const rule = engine.getRule(missingVariable);
      expect(rule.rawNode).toContainTitre();
      expect(rule.rawNode).toContainQuestion();
      expect(rule.rawNode).toContainValidCdtnType();
    });
  });
});

test("Vérification que toutes les règles avec une question ont bien un titre avec un type cdtn", () => {
  Object.values(engine.getParsedRules())
    .filter(
      (rule) => rule.rawNode.nom !== "contrat salarié . convention collective"
    )
    .filter((rule) => rule.rawNode.question !== undefined)
    .forEach((rule) => {
      expect(rule.rawNode).toContainTitre();
      expect(rule.rawNode).toContainValidCdtnType();
    });
});
