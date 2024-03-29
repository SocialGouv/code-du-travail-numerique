import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

describe("Préavis retraite pour la CC 1486", () => {
  describe("Départ à la retraite", () => {
    test.each`
      category                             | seniority | expectedResult | expectedUnit
      ${"Chargés d'enquête intermittents"} | ${2}      | ${0}           | ${"semaines"}
      ${"Chargés d'enquête intermittents"} | ${7}      | ${1}           | ${"mois"}
      ${"Chargés d'enquête intermittents"} | ${24}     | ${2}           | ${"mois"}
      ${"Chargés d'enquête intermittents"} | ${32}     | ${2}           | ${"mois"}
      ${"Autres salariés"}                 | ${2}      | ${1}           | ${"mois"}
      ${"Autres salariés"}                 | ${7}      | ${1}           | ${"mois"}
      ${"Autres salariés"}                 | ${24}     | ${2}           | ${"mois"}
      ${"Autres salariés"}                 | ${32}     | ${2}           | ${"mois"}
    `(
      "Pour un $category disposant d'une ancienneté $seniority, son préavis de départ à la retraite devrait être $expectedResult mois",
      ({ expectedResult, category, seniority, expectedUnit }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . ancienneté": seniority,
            "contrat salarié . convention collective": "'IDCC1486'",
            "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle": `'${category}'`,
            "contrat salarié . mise à la retraite": "non",
            "contrat salarié . travailleur handicapé": "non",
          },
          "contrat salarié . préavis de retraite en jours"
        );

        expect(missingArgs).toEqual([]);
        expect(result.value).toEqual(expectedResult);
        expect(result.unit).toEqual(expectedUnit);
      }
    );

    describe("Mise à la retraite", () => {
      test.each`
        category                             | seniority | expectedResult
        ${"Chargés d'enquête intermittents"} | ${2}      | ${6}
        ${"Chargés d'enquête intermittents"} | ${7}      | ${6}
        ${"Chargés d'enquête intermittents"} | ${24}     | ${6}
        ${"Chargés d'enquête intermittents"} | ${28}     | ${6}
        ${"Autres salariés"}                 | ${1}      | ${4}
        ${"Autres salariés"}                 | ${2}      | ${4}
        ${"Autres salariés"}                 | ${7}      | ${4}
        ${"Autres salariés"}                 | ${24}     | ${4}
        ${"Autres salariés"}                 | ${28}     | ${4}
      `(
        "Pour un $category possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedResult mois",
        ({ seniority, category, expectedResult }) => {
          const { result, missingArgs } = engine.setSituation(
            {
              "contrat salarié . ancienneté": seniority,
              "contrat salarié . convention collective": "'IDCC1486'",
              "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle": `'${category}'`,
              "contrat salarié . mise à la retraite": "oui",
              "contrat salarié . travailleur handicapé": "non",
            },
            "contrat salarié . préavis de retraite en jours"
          );

          expect(missingArgs).toEqual([]);
          expect(result.value).toEqual(expectedResult);
          expect(result.unit).toEqual("mois");
        }
      );
    });
  });
});
