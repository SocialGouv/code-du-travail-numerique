import Engine from "publicodes";
import { mergeModels } from "../internal/merger";
import "./matchers/PubliMatcher";
import { extractCcnIds } from "../internal/extractor";

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
      expect(rule.rawNode).toContainValidCdtnType();
    });
  });
});
