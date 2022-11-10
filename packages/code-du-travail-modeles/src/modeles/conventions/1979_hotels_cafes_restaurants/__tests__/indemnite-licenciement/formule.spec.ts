import {
  FormuleFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../../common";

describe("Indemnité légale de licenciement avec une formule personnalisée et expliquée pour la CC 1979", () => {
  test.each`
    seniority | expectedFormula                              | expectedExplanations
    ${0}      | ${""}                                        | ${[]}
    ${1}      | ${""}                                        | ${[]}
    ${1.99}   | ${""}                                        | ${[]}
    ${2}      | ${"1 / 10 * Sref * A"}                       | ${["A : Ancienneté totale (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${5}      | ${"1 / 10 * Sref * A"}                       | ${["A : Ancienneté totale (5 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${15}     | ${"1 / 10 * Sref * A1 + 1 / 15 * Sref * A2"} | ${["A1 : Ancienneté totale (15 ans)", "A2 : Ancienneté au delà de 10 ans (5 ans)", "Sref : Salaire de référence (1000 €)"]}
  `(
    "Formule $expectedFormula avec $seniority ans",
    ({ seniority, expectedFormula, expectedExplanations }) => {
      const formula = new FormuleFactory().create(
        SupportedCcIndemniteLicenciement.IDCC1979
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
