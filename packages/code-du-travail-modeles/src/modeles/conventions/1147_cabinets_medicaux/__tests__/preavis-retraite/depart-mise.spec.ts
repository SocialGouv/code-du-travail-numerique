import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);
describe("Mise à la retraite", () => {
  test.each`
    seniority | category        | expectedNotice | expectedUnit
    ${4}      | ${"Cadres"}     | ${3}           | ${"mois"}
    ${10}     | ${"Cadres"}     | ${3}           | ${"mois"}
    ${24}     | ${"Cadres"}     | ${3}           | ${"mois"}
    ${5}      | ${"Non-cadres"} | ${15}          | ${"jours"}
    ${10}     | ${"Non-cadres"} | ${1}           | ${"mois"}
    ${24}     | ${"Non-cadres"} | ${2}           | ${"mois"}
  `(
    "Pour un $category possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice $expectedUnit",
    ({ seniority, category, expectedNotice, expectedUnit }) => {
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC1147'",
          "contrat salarié . convention collective . cabinets médicaux . catégorie professionnelle": `'${category}'`,
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
    seniority | expectedNotice | expectedUnit
    ${4}      | ${0}           | ${"semaines"}
    ${10}     | ${1}           | ${"mois"}
    ${24}     | ${2}           | ${"mois"}
  `(
    "Pour un employé de cabinet medical possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice mois",
    ({ seniority, expectedNotice, expectedUnit }) => {
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC1147'",
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
describe("Notifications", () => {
  test.each`
    seniority | category
    ${4}      | ${"Cadres"}
    ${10}     | ${"Cadres"}
    ${24}     | ${"Cadres"}
    ${10}     | ${"Non-cadres"}
    ${24}     | ${"Non-cadres"}
  `(
    "Pour un $category possédant $seniority mois d'ancienneté lors d'une mise à la retraite, on attend une notification",
    ({ seniority, category }) => {
      engine.setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC1147'",
        "contrat salarié . convention collective . cabinets médicaux . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
      });
      const notifications = engine.getNotifications();

      expect(notifications).toHaveLength(0);
    }
  );

  test("Pour un non-cadres possédant 2 mois d'ancienneté lors d'une mise à la retraite, on attend une notification", () => {
    engine.setSituation({
      "contrat salarié . ancienneté": "2",
      "contrat salarié . convention collective": "'IDCC1147'",
      "contrat salarié . convention collective . cabinets médicaux . catégorie professionnelle":
        "'Non-cadres'",
      "contrat salarié . mise à la retraite": "oui",
      "contrat salarié . travailleur handicapé": "non",
    });
    const notifications = engine.getNotifications();

    expect(notifications).toHaveLength(1);
    expect(notifications[0].description).toBe(
      `Ce délai ne concerne pas le personnel embauché sous contrat à durée déterminée.`
    );
  });
});
