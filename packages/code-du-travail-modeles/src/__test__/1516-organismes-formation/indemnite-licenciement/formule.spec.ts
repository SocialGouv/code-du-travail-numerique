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
    ${7}      | ${"1 / 5 * Sref * A"}                           | ${["A : Ancienneté totale (7 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${12}     | ${"1 / 5 * Sref * A"}                           | ${["A : Ancienneté totale (12 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${15}     | ${"1 / 5 * Sref * A"}                           | ${["A : Ancienneté totale (15 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${30}     | ${"(1 / 5 * Sref * A1) + (1 / 10 * Sref * A2)"} | ${["A1 : Ancienneté totale (30 ans)", "A2 : Années de présence au delà de 15 ans (15 ans)", "Sref : Salaire de référence (1000 €)"]}
  `(
    "Formule $expectedFormula avec $seniority ans et inaptitude $isForInaptitude",
    ({ seniority, expectedFormula, expectedExplanations }) => {
      const formula = new FormuleFactory().create(
        SupportedCcIndemniteLicenciement.IDCC1516
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
