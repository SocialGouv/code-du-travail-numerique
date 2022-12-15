import Engine from "publicodes";

import modeles from "../../../../../../src/modeles/modeles-preavis-retraite.json";

const engine = new Engine(modeles as any);
describe("Mise à la retraite", () => {
  test.each`
    seniority | category       | expectedNotice | expectedUnit
    ${5}      | ${"Employés"}  | ${8}           | ${"jour"}
    ${12}     | ${"Employés"}  | ${1}           | ${"mois"}
    ${25}     | ${"Employés"}  | ${2}           | ${"mois"}
    ${5}      | ${"Maîtrises"} | ${1}           | ${"mois"}
    ${12}     | ${"Maîtrises"} | ${1}           | ${"mois"}
    ${25}     | ${"Maîtrises"} | ${2}           | ${"mois"}
    ${5}      | ${"Cadres"}    | ${3}           | ${"mois"}
    ${12}     | ${"Cadres"}    | ${3}           | ${"mois"}
    ${25}     | ${"Cadres"}    | ${3}           | ${"mois"}
  `(
    "Pour un $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedNotice $expectedUnit",
    ({ seniority, category, expectedNotice, expectedUnit }) => {
      const result = engine
        .setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC1266'",
          "contrat salarié . convention collective . restauration collectivités . catégorie professionnelle": `'${category}'`,
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "non",
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
    ${5}      | ${"Employés"}  | ${8}           | ${"jour"}
    ${12}     | ${"Employés"}  | ${1}           | ${"mois"}
    ${25}     | ${"Employés"}  | ${1}           | ${"mois"}
    ${5}      | ${"Maîtrises"} | ${1}           | ${"mois"}
    ${12}     | ${"Maîtrises"} | ${1}           | ${"mois"}
    ${25}     | ${"Maîtrises"} | ${2}           | ${"mois"}
    ${5}      | ${"Cadres"}    | ${3}           | ${"mois"}
    ${12}     | ${"Cadres"}    | ${1}           | ${"mois"}
    ${25}     | ${"Cadres"}    | ${2}           | ${"mois"}
  `(
    "Pour un $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedNotice $expectedUnit",
    ({ seniority, category, expectedNotice, expectedUnit }) => {
      const result = engine
        .setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC1266'",
          "contrat salarié . convention collective . restauration collectivités . catégorie professionnelle": `'${category}'`,
          "contrat salarié . mise à la retraite": "non",
          "contrat salarié . travailleur handicapé": "non",
        })
        .evaluate("contrat salarié . préavis de retraite");

      expect(result.nodeValue).toEqual(expectedNotice);
      expect(result.unit?.numerators).toEqual([expectedUnit]);
      expect(result.missingVariables).toEqual({});
    }
  );
});
