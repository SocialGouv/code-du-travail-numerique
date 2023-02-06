import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);
describe("Départ à la retraite", () => {
  test.each`
    seniority | expectedNotice | expectedUnit
    ${5}      | ${15}          | ${"jours"}
    ${10}     | ${1}           | ${"mois"}
    ${25}     | ${2}           | ${"mois"}
  `(
    "Pour un employé avec $seniority mois d'ancienneté, son préavis est $expectedNotice $expectedUnit",
    ({ seniority, expectedNotice, expectedUnit }) => {
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC1483'",
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

describe("Mise à la retraite", () => {
  test.each`
    seniority | expectedNotice | expectedUnit
    ${5}      | ${15}          | ${"jours"}
    ${10}     | ${1}           | ${"mois"}
    ${25}     | ${3}           | ${"mois"}
  `(
    "Pour un employé possédant $seniority mois d'ancienneté, son préavis est $expectedNotice $expectedUnit",
    ({ seniority, expectedNotice, expectedUnit }) => {
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC1483'",
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
describe("Notifications", () => {
  test.each`
    seniority
    ${10}
    ${25}
  `(
    "Pour un employé possédant $seniority mois d'ancienneté en départ à la retraite, on ne doit pas afficher de notification",
    ({ seniority }) => {
      engine.setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC1483'",
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      });
      const notifications = engine.getNotifications();

      expect(notifications).toHaveLength(0);
    }
  );
  test("Pour un employé possédant 2 mois d'ancienneté en départ à la retraite, on ne doit pas afficher de notification", () => {
    engine.setSituation({
      "contrat salarié . ancienneté": "2",
      "contrat salarié . convention collective": "'IDCC1483'",
      "contrat salarié . mise à la retraite": "non",
      "contrat salarié . travailleur handicapé": "non",
    });
    const notifications = engine.getNotifications();

    expect(notifications).toHaveLength(1);
    expect(notifications[0].description).toBe(`Il s'agit d'un délai minimum.`);
  });
  test.each`
    seniority
    ${2}
    ${10}
    ${25}
  `(
    "Pour un employé possédant $seniority mois d'ancienneté en mise à la retraite, on ne doit pas afficher de notification",
    ({ seniority }) => {
      engine.setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC1483'",
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
      });
      const notifications = engine.getNotifications();

      expect(notifications).toHaveLength(1);
      expect(notifications[0].description).toBe(
        `Il s'agit d'un délai minimum.`
      );
    }
  );
});
