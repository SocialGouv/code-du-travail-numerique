import {
  FormuleFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../plugins";
import { CatPro2216 } from "../../../plugins/formule/2216_commerces_detail_alimentation";

describe("Indemnité légale de licenciement avec une formule personnalisée et expliquée pour la CC 2216", () => {
  test.each`
    category               | isEconomicFiring | age   | seniority | expectedFormula                                                                                        | expectedExplanations
    ${CatPro2216.employes} | ${false}         | ${50} | ${0}      | ${""}                                                                                                  | ${[]}
    ${CatPro2216.employes} | ${true}          | ${50} | ${0}      | ${""}                                                                                                  | ${[]}
    ${CatPro2216.employes} | ${true}          | ${51} | ${0}      | ${""}                                                                                                  | ${[]}
    ${CatPro2216.employes} | ${false}         | ${50} | ${8 / 12} | ${"1 / 4 * Sref * A"}                                                                                  | ${["A : Ancienneté totale (0.67 an)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro2216.employes} | ${true}          | ${50} | ${8 / 12} | ${"1 / 4 * Sref * A"}                                                                                  | ${["A : Ancienneté totale (0.67 an)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro2216.employes} | ${true}          | ${51} | ${8 / 12} | ${"1 / 4 * Sref * A + ( 20% * (1 / 4 * Sref * A) )"}                                                   | ${["A : Ancienneté totale (0.67 an)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro2216.employes} | ${false}         | ${50} | ${11}     | ${"(1 / 4 * Sref * A1 + 1 / 3 * Sref * A2)"}                                                           | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au delà de 10 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro2216.employes} | ${true}          | ${50} | ${11}     | ${"(1 / 4 * Sref * A1 + 1 / 3 * Sref * A2)"}                                                           | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au delà de 10 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro2216.employes} | ${true}          | ${51} | ${11}     | ${"(1 / 4 * Sref * A1 + 1 / 3 * Sref * A2) + ( 20% * (1 / 4 * Sref * A) + 20% * (1 / 3 * Sref * A) )"} | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au delà de 10 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
  `(
    "Formule $expectedFormula avec $seniority ans, catégorie $category, type de licenciement $typeLicenciement => explications $expectedExplanations",
    ({
      category,
      seniority,
      expectedFormula,
      expectedExplanations,
      age,
      isEconomicFiring,
    }) => {
      const formula = new FormuleFactory().create(
        SupportedCcIndemniteLicenciement.IDCC2216
      );

      const result = formula.computeFormula({
        age,
        category,
        isEconomicFiring,
        refSalary: 1000,
        seniority,
      });

      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
