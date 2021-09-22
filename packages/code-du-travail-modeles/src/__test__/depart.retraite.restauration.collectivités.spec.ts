import Engine from "publicodes";
import { mergeModels } from "../internal/merger";
import { getNotifications } from "../utils/GetNotifications";

const engine = new Engine(mergeModels());
describe("Mise à la retraite", () => {
  test.each`
    seniority | category       | expectedNotice | expectedUnit
    ${4}      | ${"Employés"}  | ${8}           | ${"jours"}
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
    ${4}      | ${"Employés"}  | ${8}           | ${"jours"}
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
describe("Notifications", () => {
  test.each`
    seniority | category
    ${4}      | ${"Employés"}
    ${12}     | ${"Employés"}
    ${24}     | ${"Employés"}
    ${5}      | ${"Maîtrises"}
    ${12}     | ${"Maîtrises"}
    ${24}     | ${"Maîtrises"}
  `(
    "Pour un $category possédant $seniority mois d'ancienneté lors d'une mise à la retraite, on attend 0 notification",
    ({ seniority, category }) => {
      const notifications = getNotifications(
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1266'",
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "non",
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective . restauration collectivités . catégorie professionnelle": `'${category}'`,
        })
      );

      expect(notifications).toHaveLength(0);
    }
  );
  test.each`
    seniority
    ${5}
    ${12}
    ${24}
  `(
    "Pour un cadres possédant $seniority mois d'ancienneté lors d'une mise à la retraite, on attend une notification",
    ({ seniority }) => {
      const notifications = getNotifications(
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1266'",
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "non",
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective . restauration collectivités . catégorie professionnelle":
            "'Cadres'",
        })
      );

      expect(notifications).toHaveLength(1);
      expect(notifications[0].description).toBe(
        `Cette durée s’applique sauf s’il existe dans le contrat de travail des stipulations particulières.`
      );
    }
  );
});
