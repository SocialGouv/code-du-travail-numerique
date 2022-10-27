import {
  FormuleFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../plugins";

describe("Indemnité légale de licenciement avec une formule personnalisée et expliquée pour la CC 3043", () => {
  test.each`
    seniority | expectedFormula                                                       | expectedExplanations
    ${0}      | ${""}                                                                 | ${[]}
    ${1}      | ${""}                                                                 | ${[]}
    ${1.99}   | ${""}                                                                 | ${[]}
    ${2}      | ${""}                                                                 | ${[]}
    ${2.1}    | ${"1 / 10 * Sref * A"}                                                | ${["A : Ancienneté totale (2.1 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${5}      | ${"1 / 10 * Sref * A"}                                                | ${["A : Ancienneté totale (5 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${5.91}   | ${"1 / 10 * Sref * A"}                                                | ${["A : Ancienneté totale (5.91 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${6}      | ${"(1 / 10 * Sref * A1) + (1 / 6 * Sref * A2)"}                       | ${["A1 : Années d'ancienneté pour la fraction des 5 premières années (5 ans)", "A2 : Années d'ancienneté pour la fraction de 6 ans à 10 ans révolus (1 an)", "Sref : Salaire de référence (1000 €)"]}
    ${8}      | ${"(1 / 10 * Sref * A1) + (1 / 6 * Sref * A2)"}                       | ${["A1 : Années d'ancienneté pour la fraction des 5 premières années (5 ans)", "A2 : Années d'ancienneté pour la fraction de 6 ans à 10 ans révolus (3 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${15}     | ${"(1 / 10 * Sref * A1) + (1 / 6 * Sref * A2) + (1 / 5 * Sref * A3)"} | ${["A1 : Années d'ancienneté pour la fraction des 5 premières années (5 ans)", "A2 : Années d'ancienneté pour la fraction de 6 ans à 10 ans révolus (5 ans)", "A3 : Années d'ancienneté au-delà de 10 ans révolus (5 ans)", "Sref : Salaire de référence (1000 €)"]}
  `(
    "Formule $expectedFormula avec $seniority ans",
    ({ seniority, expectedFormula, expectedExplanations }) => {
      const formula = new FormuleFactory().create(
        SupportedCcIndemniteLicenciement.IDCC3043
      );

      const result = formula.computeFormula({
        refSalary: 1000,
        seniority,
      });

      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
