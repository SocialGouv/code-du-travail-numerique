import Engine from "publicodes";

import { mergePreavisRetraiteModels } from "../../../../../internal/merger";

const engine = new Engine(mergePreavisRetraiteModels());

describe("Travailleur handicapé - Depart et mise à la retraite", () => {
  test.each`
    seniority | expectedNotice
    ${3}      | ${0}
    ${6}      | ${2}
    ${24}     | ${3}
  `(
    "Mise à la retraite: en ayant $seniority mois d'ancienneté, son préavis devrait être $expectedNotice mois",
    ({ seniority, expectedNotice }) => {
      const result = engine
        .setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "''",
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "oui",
        })
        .evaluate("contrat salarié . préavis de retraite");

      expect(result.nodeValue).toEqual(expectedNotice);
      expect(result.missingVariables).toEqual({});
      expect(result.unit?.numerators).toEqual(["mois"]);
    }
  );

  test.each`
    seniority | expectedNotice
    ${3}      | ${0}
    ${6}      | ${2}
    ${24}     | ${3}
  `(
    "Depart à la retraite: en ayant $seniority mois d'ancienneté, son préavis devrait être $expectedNotice mois",
    ({ seniority, expectedNotice }) => {
      const result = engine
        .setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "''",
          "contrat salarié . mise à la retraite": "non",
          "contrat salarié . travailleur handicapé": "oui",
        })
        .evaluate("contrat salarié . préavis de retraite");

      expect(result.nodeValue).toEqual(expectedNotice);
      expect(result.unit?.numerators).toEqual(["mois"]);
      expect(result.missingVariables).toEqual({});
    }
  );

  test.each`
    seniority | expectedNotice
    ${6}      | ${4}
    ${24}     | ${6}
  `(
    "En ayant $seniority mois d'ancienneté (CC: Hopital), son préavis devrait être $expectedNotice mois",
    ({ seniority, expectedNotice }) => {
      const result = engine
        .setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": `'IDCC0029'`,
          "contrat salarié . convention collective . hospitalisation privée à but non lucratif . catégorie professionnelle": `'Médecins'`,
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "oui",
        })
        .evaluate("contrat salarié . préavis de retraite");

      expect(result.nodeValue).toEqual(expectedNotice);
      expect(result.unit?.numerators).toEqual(["mois"]);
      expect(result.missingVariables).toEqual({});
    }
  );

  test.each`
    seniority | category           | expectedNotice
    ${3}      | ${"Non-cadres"}    | ${2}
    ${24}     | ${"Non-cadres"}    | ${2}
    ${3}      | ${"Autres cadres"} | ${3}
    ${24}     | ${"Autres cadres"} | ${3}
  `(
    "En ayant $seniority mois d'ancienneté (CC: Hopital), son préavis devrait être $expectedNotice mois",
    ({ seniority, category, expectedNotice }) => {
      const result = engine
        .setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": `'IDCC0029'`,
          "contrat salarié . convention collective . hospitalisation privée à but non lucratif . catégorie professionnelle": `'${category}'`,
          "contrat salarié . mise à la retraite": "non",
          "contrat salarié . travailleur handicapé": "oui",
        })
        .evaluate("contrat salarié . préavis de retraite");

      expect(result.nodeValue).toEqual(expectedNotice);
      expect(result.unit?.numerators).toEqual(["mois"]);
      expect(result.missingVariables).toEqual({});
    }
  );
});
