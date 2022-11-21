import {
  FormuleFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../plugins";

describe("Indemnité légale de licenciement avec une formule personnalisée et expliquée pour la CC 1597", () => {
  test.each`
    hasMoreThan55Years | seniority | expectedFormula                                                                          | expectedExplanations
    ${false}           | ${0}      | ${""}                                                                                    | ${[]}
    ${true}            | ${0}      | ${""}                                                                                    | ${[]}
    ${false}           | ${2}      | ${"1/10 * Sref * A"}                                                                     | ${["A : Ancienneté totale (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${true}            | ${2}      | ${"(1/10 * Sref * A) + (1/100 * Sref * A)"}                                              | ${["A : Ancienneté totale (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${false}           | ${5}      | ${"1/10 * Sref * A"}                                                                     | ${["A : Ancienneté totale (5 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${true}            | ${5}      | ${"(1/10 * Sref * A) + (1/100 * Sref * A)"}                                              | ${["A : Ancienneté totale (5 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${false}           | ${6}      | ${"3/20 * Sref * A"}                                                                     | ${["A : Ancienneté totale (6 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${true}            | ${6}      | ${"(3/20 * Sref * A) + (3/200 * Sref * A)"}                                              | ${["A : Ancienneté totale (6 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${false}           | ${16}     | ${"(3/20 * Sref * A1) + (1/20 * Sref * A2)"}                                             | ${["A1 : Ancienneté totale (16 ans)", "A2 : Ancienneté au delà de 15 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
    ${true}            | ${16}     | ${"(3/20 * Sref * A1) + (1/20 * Sref * A2) + (3/200 * Sref * A1) + (1/200 * Sref * A2)"} | ${["A1 : Ancienneté totale (16 ans)", "A2 : Ancienneté au delà de 15 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
  `(
    "Formule $expectedFormula avec $seniority ans et age : $age",
    ({
      hasMoreThan55Years,
      seniority,
      expectedFormula,
      expectedExplanations,
    }) => {
      const formula = new FormuleFactory().create(
        SupportedCcIndemniteLicenciement.IDCC1597
      );
      if (!formula) throw new Error("Formula should be defined");

      const result = formula.computeFormula({
        hasMoreThan55Years,
        refSalary: 1000,
        seniority,
      });

      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
