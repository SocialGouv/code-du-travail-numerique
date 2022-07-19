import {
  FormuleFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../plugins";

describe("Indemnité légale de licenciement avec une formule personnalisée et expliquée pour la CC 2511", () => {
  test.each`
    seniority | expectedFormula                             | expectedExplanations
    ${7 / 12} | ${""}                                       | ${[]}
    ${8 / 12} | ${"1 / 4 * Sref * A"}                       | ${["A : Ancienneté totale"]}
    ${7}      | ${"1 / 4 * Sref * A"}                       | ${["A : Ancienneté totale"]}
    ${10}     | ${"1 / 4 * Sref * A"}                       | ${["A : Ancienneté totale"]}
    ${12}     | ${"(1 / 4 * Sref * 10 + 1 / 3 * Sref * A)"} | ${["A : Ancienneté au delà de 10 ans"]}
  `(
    "Formule $expectedFormula avec $seniority ans et inaptitude $isForInaptitude",
    ({ seniority, expectedFormula, expectedExplanations }) => {
      const formula = new FormuleFactory().create(
        SupportedCcIndemniteLicenciement.IDCC2511
      );

      const result = formula.computeFormula({
        seniority,
      });

      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
