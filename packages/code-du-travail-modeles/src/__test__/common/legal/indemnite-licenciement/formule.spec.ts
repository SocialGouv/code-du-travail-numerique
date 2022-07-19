import {
  FormuleFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../../plugins";

describe("Indemnité légale de licenciement avec une formule personnalisée et expliquée", () => {
  test.each`
    seniority | isForInaptitude | expectedFormula                                 | expectedExplanations
    ${7 / 12} | ${"non"}        | ${""}                                           | ${[]}
    ${7 / 12} | ${"oui"}        | ${""}                                           | ${[]}
    ${8 / 12} | ${"non"}        | ${"1 / 4 * Sref * A"}                           | ${["A : Ancienneté totale"]}
    ${8 / 12} | ${"oui"}        | ${"1 / 4 * Sref * A * 2"}                       | ${["A : Ancienneté totale"]}
    ${7}      | ${"oui"}        | ${"1 / 4 * Sref * A * 2"}                       | ${["A : Ancienneté totale"]}
    ${7}      | ${"non"}        | ${"1 / 4 * Sref * A"}                           | ${["A : Ancienneté totale"]}
    ${10}     | ${"oui"}        | ${"1 / 4 * Sref * A * 2"}                       | ${["A : Ancienneté totale"]}
    ${10}     | ${"non"}        | ${"1 / 4 * Sref * A"}                           | ${["A : Ancienneté totale"]}
    ${12}     | ${"oui"}        | ${"(1 / 4 * Sref * 10 + 1 / 3 * Sref * A) * 2"} | ${["A : Ancienneté au delà de 10 ans"]}
    ${12}     | ${"non"}        | ${"(1 / 4 * Sref * 10 + 1 / 3 * Sref * A)"}     | ${["A : Ancienneté au delà de 10 ans"]}
  `(
    "Formule $expectedFormula avec $seniority ans et inaptitude $isForInaptitude",
    ({ seniority, isForInaptitude, expectedFormula, expectedExplanations }) => {
      const formula = new FormuleFactory().create(
        SupportedCcIndemniteLicenciement.default
      );

      const result = formula.computeFormula({
        isForInaptitude: isForInaptitude === "oui",
        seniority,
      });

      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
