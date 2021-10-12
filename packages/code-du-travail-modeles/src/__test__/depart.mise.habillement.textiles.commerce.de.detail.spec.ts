import Engine from "publicodes";
import { mergeModels } from "../internal/merger";
import { getNotifications } from "../index";

const engine = new Engine(mergeModels());
describe("Départ à la retraite", () => {
  test.each`
    seniority | expectedNotice | expectedUnit
    ${5}      | ${15}          | ${"jour"}
    ${10}     | ${1}           | ${"mois"}
    ${25}     | ${2}           | ${"mois"}
  `(
    "Pour un employé avec $seniority mois d'ancienneté, son préavis est $expectedNotice $expectedUnit",
    ({ seniority, expectedNotice, expectedUnit }) => {
      const result = engine
        .setSituation({
          "contrat salarié . convention collective": "'IDCC1483'",
          "contrat salarié . ancienneté": seniority,
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

describe("Mise à la retraite", () => {
  test.each`
    seniority | expectedNotice | expectedUnit
    ${5}      | ${15}          | ${"jour"}
    ${10}     | ${1}           | ${"mois"}
    ${25}     | ${3}           | ${"mois"}
  `(
    "Pour un employé possédant $seniority mois d'ancienneté, son préavis est $expectedNotice $expectedUnit",
    ({ seniority, expectedNotice, expectedUnit }) => {
      const result = engine
        .setSituation({
          "contrat salarié . convention collective": "'IDCC1483'",
          "contrat salarié . ancienneté": seniority,
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
describe("Notifications", () => {
  test.each`
    seniority
    ${10}
    ${25}
  `(
    "Pour un employé possédant $seniority mois d'ancienneté en départ à la retraite, on ne doit pas afficher de notification",
    ({ seniority }) => {
      const notifications = getNotifications(
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1483'",
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . mise à la retraite": "non",
          "contrat salarié . travailleur handicapé": "non",
        })
      );

      expect(notifications).toHaveLength(0);
    }
  );
  test("Pour un employé possédant 2 mois d'ancienneté en départ à la retraite, on ne doit pas afficher de notification", () => {
    const notifications = getNotifications(
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1483'",
        "contrat salarié . ancienneté": 2,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      })
    );

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
      const notifications = getNotifications(
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1483'",
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "non",
        })
      );

      expect(notifications).toHaveLength(1);
      expect(notifications[0].description).toBe(
        `Il s'agit d'un délai minimum.`
      );
    }
  );
});
