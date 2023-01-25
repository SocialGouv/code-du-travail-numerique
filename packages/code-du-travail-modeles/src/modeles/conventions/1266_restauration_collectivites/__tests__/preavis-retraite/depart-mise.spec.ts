import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);
describe("Mise à la retraite", () => {
  test.each`
    seniority | category       | expectedNotice | expectedUnit
    ${5}      | ${"Employés"}  | ${8}           | ${"jours"}
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
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC1266'",
          "contrat salarié . convention collective . restauration collectivités . catégorie professionnelle": `'${category}'`,
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "non",
        },
        "contrat salarié . préavis de retraite en jours"
      );

      expect(result.value).toEqual(expectedNotice);
      expect(result.unit).toEqual(expectedUnit);
      expect(missingArgs).toEqual([]);
    }
  );
});
describe("Départ à la retraite", () => {
  test.each`
    seniority | category       | expectedNotice | expectedUnit
    ${5}      | ${"Employés"}  | ${8}           | ${"jours"}
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
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC1266'",
          "contrat salarié . convention collective . restauration collectivités . catégorie professionnelle": `'${category}'`,
          "contrat salarié . mise à la retraite": "non",
          "contrat salarié . travailleur handicapé": "non",
        },
        "contrat salarié . préavis de retraite en jours"
      );

      expect(result.value).toEqual(expectedNotice);
      expect(result.unit).toEqual(expectedUnit);
      expect(missingArgs).toEqual([]);
    }
  );
});
