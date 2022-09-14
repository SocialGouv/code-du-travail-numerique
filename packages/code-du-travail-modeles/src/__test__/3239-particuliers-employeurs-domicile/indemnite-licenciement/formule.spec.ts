import {
  FormuleFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../plugins";
import { CatPro3239 } from "../../../plugins/salaire-reference/3239_particuliers_employeurs_domicile";

describe("Indemnité légale de licenciement avec une formule personnalisée et expliquée pour la CC 3239", () => {
  test.each`
    category                                  | seniority | expectedFormula                              | expectedExplanations
    ${CatPro3239.salarieParticulierEmployeur} | ${0}      | ${""}                                        | ${[]}
    ${CatPro3239.salarieParticulierEmployeur} | ${8 / 12} | ${"1 / 4 * Sref * A"}                        | ${["A : Ancienneté totale (0.67 an)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro3239.salarieParticulierEmployeur} | ${2}      | ${"1 / 4 * Sref * A"}                        | ${["A : Ancienneté totale (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro3239.salarieParticulierEmployeur} | ${10}     | ${"1 / 4 * Sref * A"}                        | ${["A : Ancienneté totale (10 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro3239.salarieParticulierEmployeur} | ${12}     | ${"(1 / 4 * Sref * A1 + 1 / 3 * Sref * A2)"} | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au delà de 10 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro3239.assistantMaternel}           | ${0}      | ${""}                                        | ${[]}
    ${CatPro3239.assistantMaternel}           | ${8 / 12} | ${""}                                        | ${[]}
    ${CatPro3239.assistantMaternel}           | ${9 / 12} | ${"1 / 80 * S"}                              | ${["S : total des salaires perçus depuis l'engagement (10000 €)"]}
    ${CatPro3239.assistantMaternel}           | ${2}      | ${"1 / 80 * S"}                              | ${["S : total des salaires perçus depuis l'engagement (10000 €)"]}
    ${CatPro3239.assistantMaternel}           | ${10}     | ${"1 / 80 * S"}                              | ${["S : total des salaires perçus depuis l'engagement (10000 €)"]}
    ${CatPro3239.assistantMaternel}           | ${12}     | ${"1 / 80 * S"}                              | ${["S : total des salaires perçus depuis l'engagement (10000 €)"]}
  `(
    "Formule $expectedFormula avec $seniority ans, catégorie $category, type de licenciement $typeLicenciement et ancienneté non cadre : $seniorityNonCadre",
    ({ category, seniority, expectedFormula, expectedExplanations }) => {
      const formula = new FormuleFactory().create(
        SupportedCcIndemniteLicenciement.IDCC3239
      );

      const result = formula.computeFormula({
        category,
        refSalary: 1000,
        seniority,
        totalSalary: 10000,
      });

      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
