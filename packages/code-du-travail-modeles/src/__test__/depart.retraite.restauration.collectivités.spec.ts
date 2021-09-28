import Engine from "publicodes";
import { mergeModels } from "../internal/merger";
import { getNotifications } from "../utils/GetNotifications";

const engine = new Engine(mergeModels());
describe("Mise à la retraite", () => {
  test.each`
    seniority | category       | expectedNotice | expectedUnit
    ${4}      | ${"Employés"}  | ${8}           | ${"jour"}
    ${12}     | ${"Employés"}  | ${1}           | ${"mois"}
    ${24}     | ${"Employés"}  | ${2}           | ${"mois"}
    ${5}      | ${"Maîtrises"} | ${1}           | ${"mois"}
    ${12}     | ${"Maîtrises"} | ${1}           | ${"mois"}
    ${24}     | ${"Maîtrises"} | ${2}           | ${"mois"}
    ${5}      | ${"Cadres"}    | ${3}           | ${"mois"}
    ${12}     | ${"Cadres"}    | ${3}           | ${"mois"}
    ${24}     | ${"Cadres"}    | ${3}           | ${"mois"}
  `(
    "Pour un $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedNotice $expectedUnit",
    ({ seniority, category, expectedNotice, expectedUnit }) => {
      const result = engine
        .setSituation({
          "contrat salarié . convention collective": "'IDCC1266'",
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "non",
          "contrat salarié . convention collective . restauration collectivités . catégorie professionnelle": `'${category}'`,
        })
        .evaluate("contrat salarié . préavis de retraite");

      expect(result.nodeValue).toEqual(expectedNotice);
      expect(result.unit?.numerators).toEqual([expectedUnit]);
      expect(result.missingVariables).toEqual({});
    }
  );
});
describe("Départ à la retraite", () => {
  test.each`
    seniority | category       | expectedNotice | expectedUnit
    ${4}      | ${"Employés"}  | ${8}           | ${"jour"}
    ${12}     | ${"Employés"}  | ${1}           | ${"mois"}
    ${24}     | ${"Employés"}  | ${1}           | ${"mois"}
    ${5}      | ${"Maîtrises"} | ${1}           | ${"mois"}
    ${12}     | ${"Maîtrises"} | ${1}           | ${"mois"}
    ${24}     | ${"Maîtrises"} | ${2}           | ${"mois"}
    ${5}      | ${"Cadres"}    | ${3}           | ${"mois"}
    ${12}     | ${"Cadres"}    | ${1}           | ${"mois"}
    ${24}     | ${"Cadres"}    | ${2}           | ${"mois"}
  `(
    "Pour un $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedNotice $expectedUnit",
    ({ seniority, category, expectedNotice, expectedUnit }) => {
      const result = engine
        .setSituation({
          "contrat salarié . convention collective": "'IDCC1266'",
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . mise à la retraite": "non",
          "contrat salarié . travailleur handicapé": "non",
          "contrat salarié . convention collective . restauration collectivités . catégorie professionnelle": `'${category}'`,
        })
        .evaluate("contrat salarié . préavis de retraite");

      expect(result.nodeValue).toEqual(expectedNotice);
      expect(result.unit?.numerators).toEqual([expectedUnit]);
      expect(result.missingVariables).toEqual({});
    }
  );
});
