import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

describe("Préavis de retraite pour la CC 2216", () => {
  describe("Départ à la retraite", () => {
    test.each`
      seniority | category                               | expectedNotice
      ${1}      | ${"Employés et ouvriers"}              | ${1}
      ${6}      | ${"Employés et ouvriers"}              | ${1}
      ${24}     | ${"Employés et ouvriers"}              | ${1}
      ${1}      | ${"Techniciens et agents de maîtrise"} | ${2}
      ${6}      | ${"Techniciens et agents de maîtrise"} | ${1}
      ${24}     | ${"Techniciens et agents de maîtrise"} | ${2}
      ${1}      | ${"Cadres"}                            | ${6}
      ${6}      | ${"Cadres"}                            | ${1}
      ${24}     | ${"Cadres"}                            | ${2}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice $expectedNoticeUnit",
      ({ seniority, category, expectedNotice }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . ancienneté": seniority,
            "contrat salarié . convention collective": "'IDCC2216'",
            "contrat salarié . convention collective . commerce gros et detail alimentation . catégorie professionnelle": `'${category}'`,
            "contrat salarié . mise à la retraite": "non",
            "contrat salarié . travailleur handicapé": "non",
          },
          "contrat salarié . préavis de retraite en jours"
        );

        expect(result.value).toEqual(expectedNotice);
        expect(result.unit).toEqual("mois");
        expect(missingArgs).toEqual([]);
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
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . ancienneté": seniority,
            "contrat salarié . convention collective": "'IDCC2216'",
            "contrat salarié . convention collective . commerce gros et detail alimentation . catégorie professionnelle": `'${category}'`,
            "contrat salarié . mise à la retraite": "oui",
            "contrat salarié . travailleur handicapé": "non",
          },
          "contrat salarié . préavis de retraite en jours"
        );

        expect(result.value).toEqual(expectedNotice);
        expect(result.unit).toEqual("mois");
        expect(missingArgs).toEqual([]);
      }
    );
  });
});
