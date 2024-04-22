import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

describe("CC 176", () => {
  test.each`
    seniority | group | afterFirstJuly | expectedNotice
    ${3}      | ${3}  | ${"non"}       | ${2}
    ${3}      | ${4}  | ${"non"}       | ${2}
    ${3}      | ${5}  | ${"non"}       | ${3}
    ${3}      | ${3}  | ${"oui"}       | ${2}
    ${3}      | ${4}  | ${"oui"}       | ${3}
    ${3}      | ${5}  | ${"oui"}       | ${3}
    ${3}      | ${6}  | ${"oui"}       | ${4}
    ${12}     | ${3}  | ${"non"}       | ${2}
    ${12}     | ${4}  | ${"non"}       | ${2}
    ${12}     | ${5}  | ${"non"}       | ${3}
    ${12}     | ${3}  | ${"oui"}       | ${2}
    ${12}     | ${4}  | ${"oui"}       | ${3}
    ${12}     | ${5}  | ${"oui"}       | ${3}
    ${12}     | ${6}  | ${"oui"}       | ${4}
  `(
    "Pour un employé dans l'industrie pharmaceutique dans le groupe $group (contrat après le 1er juillet 2019: $afterFirstJuly) possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice mois",
    ({ seniority, group, afterFirstJuly, expectedNotice }) => {
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC0176'",
          "contrat salarié . convention collective . industrie pharmaceutique . conclu après 1 juillet 2019":
            afterFirstJuly,
          "contrat salarié . convention collective . industrie pharmaceutique . groupe":
            group,
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

  test.each`
    seniority | group | afterFirstJuly | expectedNotice
    ${3}      | ${4}  | ${"non"}       | ${2}
    ${3}      | ${5}  | ${"non"}       | ${3}
    ${3}      | ${2}  | ${"oui"}       | ${2}
    ${3}      | ${4}  | ${"oui"}       | ${3}
    ${3}      | ${5}  | ${"oui"}       | ${3}
    ${3}      | ${6}  | ${"oui"}       | ${4}
    ${12}     | ${4}  | ${"non"}       | ${1}
    ${12}     | ${5}  | ${"non"}       | ${1}
    ${12}     | ${2}  | ${"oui"}       | ${1}
    ${12}     | ${4}  | ${"oui"}       | ${1}
    ${12}     | ${5}  | ${"oui"}       | ${1}
    ${24}     | ${4}  | ${"non"}       | ${2}
    ${24}     | ${5}  | ${"non"}       | ${2}
    ${24}     | ${2}  | ${"oui"}       | ${2}
    ${24}     | ${4}  | ${"oui"}       | ${2}
    ${24}     | ${5}  | ${"oui"}       | ${2}
  `(
    "Pour un employé dans l'industrie pharmaceutique dans le groupe $group (contrat après le 1er juillet 2019: $afterFirstJuly) possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice mois",
    ({ seniority, group, afterFirstJuly, expectedNotice }) => {
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC0176'",
          "contrat salarié . convention collective . industrie pharmaceutique . conclu après 1 juillet 2019":
            afterFirstJuly,
          "contrat salarié . convention collective . industrie pharmaceutique . groupe":
            group,
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
