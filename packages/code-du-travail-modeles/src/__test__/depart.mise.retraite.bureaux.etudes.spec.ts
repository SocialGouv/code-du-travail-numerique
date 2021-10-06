import Engine from "publicodes";
import { mergeModels } from "../internal/merger";

const engine = new Engine(mergeModels());

describe("Vérification des préavis de départ et de mise à la retraite pour la CC 1486", () => {
  test.each`
    seniority | expectedResult
    ${2}      | ${0}
    ${7}      | ${1}
    ${24}     | ${2}
    ${32}     | ${2}
  `(
    "Pour un salarié disposant d'une ancienneté $seniority, son préavis de départ à la retraite devrait être $expectedResult mois",
    ({ expectedResult, seniority }) => {
      const result = engine
        .setSituation({
          "contrat salarié . convention collective": "'IDCC1486'",
          "contrat salarié . mise à la retraite": "non",
          "contrat salarié . travailleur handicapé": "non",
          "contrat salarié . ancienneté": seniority,
        })
        .evaluate("contrat salarié . préavis de retraite");

      expect(result.missingVariables).toEqual({});
      expect(result.nodeValue).toEqual(expectedResult);
      expect(result.unit?.numerators).toEqual(["mois"]);
    }
  );

  test.each`
    category                             | seniority | expectedResult
    ${"Chargés d'enquête intermittents"} | ${2}      | ${6}
    ${"Chargés d'enquête intermittents"} | ${7}      | ${6}
    ${"Chargés d'enquête intermittents"} | ${24}     | ${6}
    ${"Chargés d'enquête intermittents"} | ${28}     | ${6}
    ${"Autres salariés"}                 | ${2}      | ${4}
    ${"Autres salariés"}                 | ${7}      | ${4}
    ${"Autres salariés"}                 | ${24}     | ${4}
    ${"Autres salariés"}                 | ${28}     | ${4}
  `(
    "Pour un salarié de tel $category possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedResult mois",
    ({ seniority, category, expectedResult }) => {
      const result = engine
        .setSituation({
          "contrat salarié . convention collective": "'IDCC1486'",
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "non",
          "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle": `'${category}'`,
        })
        .evaluate("contrat salarié . préavis de retraite");

      expect(result.missingVariables).toEqual({});
      expect(result.nodeValue).toEqual(expectedResult);
      expect(result.unit?.numerators).toEqual(["mois"]);
    }
  );
});
