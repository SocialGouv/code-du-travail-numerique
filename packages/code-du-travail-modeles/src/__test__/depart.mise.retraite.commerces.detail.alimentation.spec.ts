import Engine from "publicodes";
import { mergeModels } from "../internal/merger";

const engine = new Engine(mergeModels());

describe("Préavis de retraite pour la CC 1505", () => {
  describe("Départ à la retraite", () => {
    test.each`
      seniority | category        | expectedNotice
      ${1}      | ${"Non-cadres"} | ${0}
      ${6}      | ${"Non-cadres"} | ${1}
      ${24}     | ${"Non-cadres"} | ${2}
      ${1}      | ${"Cadres"}     | ${6}
      ${6}      | ${"Cadres"}     | ${1}
      ${24}     | ${"Cadres"}     | ${2}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice $expectedNoticeUnit",
      ({ seniority, category, expectedNotice }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC2216'",
            "contrat salarié . ancienneté": seniority,
            "contrat salarié . mise à la retraite": "non",
            "contrat salarié . travailleur handicapé": "non",
            "contrat salarié . convention collective . commerce gros et detail alimentation . départ à la retraite . catégorie professionnelle": `'${category}'`,
          })
          .evaluate("contrat salarié . préavis de retraite");

        expect(result.nodeValue).toEqual(expectedNotice);
        expect(result.unit?.numerators).toEqual(["mois"]);
        expect(result.missingVariables).toEqual({});
      }
    );
  });

  describe("Mise à la retraite", () => {
    test.each`
      seniority | category                               | expectedNotice
      ${1}      | ${"Employés et ouvriers"}              | ${1}
      ${6}      | ${"Employés et ouvriers"}              | ${1}
      ${24}     | ${"Employés et ouvriers"}              | ${2}
      ${1}      | ${"Techniciens et agents de maîtrise"} | ${2}
      ${6}      | ${"Techniciens et agents de maîtrise"} | ${2}
      ${24}     | ${"Techniciens et agents de maîtrise"} | ${2}
      ${1}      | ${"Cadres"}                            | ${6}
      ${6}      | ${"Cadres"}                            | ${6}
      ${24}     | ${"Cadres"}                            | ${6}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice $expectedNoticeUnit",
      ({ seniority, category, expectedNotice }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC2216'",
            "contrat salarié . ancienneté": seniority,
            "contrat salarié . mise à la retraite": "oui",
            "contrat salarié . travailleur handicapé": "non",
            "contrat salarié . convention collective . commerce gros et detail alimentation . mise à la retraite . catégorie professionnelle": `'${category}'`,
          })
          .evaluate("contrat salarié . préavis de retraite");

        expect(result.nodeValue).toEqual(expectedNotice);
        expect(result.unit?.numerators).toEqual(["mois"]);
        expect(result.missingVariables).toEqual({});
      }
    );
  });
});
