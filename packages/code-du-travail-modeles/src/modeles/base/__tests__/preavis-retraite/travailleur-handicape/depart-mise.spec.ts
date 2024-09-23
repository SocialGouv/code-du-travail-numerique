import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

describe("Travailleur handicapé - Depart et mise à la retraite", () => {
  test.each`
    seniority | expectedNotice | expectedUnit
    ${3}      | ${0}           | ${"semaines"}
    ${6}      | ${2}           | ${"mois"}
    ${24}     | ${3}           | ${"mois"}
  `(
    "Mise à la retraite: en ayant $seniority mois d'ancienneté, son préavis devrait être $expectedNotice mois",
    ({ seniority, expectedNotice, expectedUnit }) => {
      const { result, missingArgs } = engine.setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "''",
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "oui",
      });

      expect(result.value).toEqual(expectedNotice);
      expect(missingArgs).toEqual([]);
      expect(result.unit).toEqual(expectedUnit);
    }
  );

  test.each`
    seniority | expectedNotice | expectedUnit
    ${3}      | ${0}           | ${"semaines"}
    ${6}      | ${2}           | ${"mois"}
    ${24}     | ${3}           | ${"mois"}
  `(
    "Depart à la retraite: en ayant $seniority mois d'ancienneté, son préavis devrait être $expectedNotice mois",
    ({ seniority, expectedNotice, expectedUnit }) => {
      const { result, missingArgs } = engine.setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "''",
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "oui",
      });

      expect(result.value).toEqual(expectedNotice);
      expect(result.unit).toEqual(expectedUnit);
      expect(missingArgs).toEqual([]);
    }
  );

  test.each`
    seniority | expectedNotice
    ${6}      | ${2}
    ${24}     | ${6}
  `(
    "En ayant $seniority mois d'ancienneté, son préavis devrait être $expectedNotice mois",
    ({ seniority, expectedNotice }) => {
      const { result, missingArgs } = engine.setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": `'IDCC0843'`,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "oui",
      });

      expect(result.value).toEqual(expectedNotice);
      expect(result.unit).toEqual("mois");
      expect(missingArgs).toEqual([]);
    }
  );

  test.each`
    seniority | expectedNotice | expectedUnit
    ${3}      | ${2}           | ${"semaines"}
    ${24}     | ${3}           | ${"mois"}
  `(
    "En ayant $seniority mois d'ancienneté, son préavis devrait être $expectedNotice mois",
    ({ seniority, expectedNotice, expectedUnit }) => {
      const { result, missingArgs } = engine.setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": `'IDCC0843'`,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "oui",
      });

      expect(result.value).toEqual(expectedNotice);
      expect(result.unit).toEqual(expectedUnit);
      expect(missingArgs).toEqual([]);
    }
  );
});
