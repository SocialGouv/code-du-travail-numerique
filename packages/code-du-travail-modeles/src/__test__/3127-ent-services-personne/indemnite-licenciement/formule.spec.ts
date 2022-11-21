import {
  FormuleFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../plugins";

describe("Indemnité légale de licenciement avec une formule personnalisée et expliquée pour la CC 3127", () => {
  test.each`
    seniority  | expectedFormula                               | expectedExplanations
    ${11 / 12} | ${""}                                         | ${[]}
    ${1}       | ${"1 / 5 * Sref * A"}                         | ${["A : Ancienneté totale (1 an)", "Sref : Salaire de référence (1000 €)"]}
    ${7}       | ${"1 / 5 * Sref * A"}                         | ${["A : Ancienneté totale (7 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${10}      | ${"1 / 5 * Sref * A"}                         | ${["A : Ancienneté totale (10 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${11}      | ${"(1 / 5 * Sref * A1 + 2 / 15 * Sref * A2)"} | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au delà de 10 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
    ${12}      | ${"(1 / 5 * Sref * A1 + 2 / 15 * Sref * A2)"} | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au delà de 10 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
  `(
    "Formule $expectedFormula avec $seniority ans",
    ({ seniority, expectedFormula, expectedExplanations }) => {
      const formula = new FormuleFactory().create(
        SupportedCcIndemniteLicenciement.IDCC3127
      );
      if (!formula) throw new Error("Formula should be defined");
      const result = formula.computeFormula({
        refSalary: 1000,
        seniority,
      });

      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
