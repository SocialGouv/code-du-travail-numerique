import {
  FormuleFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../plugins";

describe("Indemnité légale de licenciement avec une formule personnalisée et expliquée pour la CC 1516", () => {
  test.each`
    seniority | expectedFormula                                 | expectedExplanations
    ${7 / 12} | ${""}                                           | ${[]}
    ${8 / 12} | ${""}                                           | ${[]}
    ${2}      | ${""}                                           | ${[]}
    ${7}      | ${"1 / 5 * Sref * A"}                           | ${["A : Ancienneté totale"]}
    ${12}     | ${"1 / 5 * Sref * A"}                           | ${["A : Ancienneté totale"]}
    ${15}     | ${"1 / 5 * Sref * A"}                           | ${["A : Ancienneté totale"]}
    ${30}     | ${"(1 / 5 * Sref * A1) + (1 / 10 * Sref * A2)"} | ${["A1 : Ancienneté totale", "A2: Années de présence au delà de 15 ans"]}
  `(
    "Formule $expectedFormula avec $seniority ans et inaptitude $isForInaptitude",
    ({ seniority, expectedFormula, expectedExplanations }) => {
      const formula = new FormuleFactory().create(
        SupportedCcIndemniteLicenciement.IDCC1516
      );

      const result = formula.computeFormula({
        seniority,
      });

      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
