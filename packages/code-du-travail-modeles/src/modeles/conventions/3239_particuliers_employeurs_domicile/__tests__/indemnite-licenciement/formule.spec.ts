import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";
import { CatPro3239 } from "../../salary";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "3239"
);

describe("Formule indemnité licenciement - CC 3239", () => {
  test.each`
    category                                  | seniority | expectedFormula                            | expectedExplanations
    ${CatPro3239.salarieParticulierEmployeur} | ${0}      | ${""}                                      | ${[]}
    ${CatPro3239.salarieParticulierEmployeur} | ${8 / 12} | ${"1/4 * Sref * A"}                        | ${["A : Ancienneté totale (≈ 0.67 an : valeur arrondie)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro3239.salarieParticulierEmployeur} | ${2}      | ${"1/4 * Sref * A"}                        | ${["A : Ancienneté totale (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro3239.salarieParticulierEmployeur} | ${10}     | ${"1/4 * Sref * A"}                        | ${["A : Ancienneté totale (10 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro3239.salarieParticulierEmployeur} | ${12}     | ${"(1/4 * Sref * A1) + (1/3 * Sref * A2)"} | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au-delà de 10 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro3239.assistantMaternel}           | ${0}      | ${""}                                      | ${[]}
    ${CatPro3239.assistantMaternel}           | ${8 / 12} | ${""}                                      | ${[]}
    ${CatPro3239.assistantMaternel}           | ${9 / 12} | ${"1/80 * S"}                              | ${["S : total des salaires perçus depuis l'engagement (10000 €)"]}
    ${CatPro3239.assistantMaternel}           | ${2}      | ${"1/80 * S"}                              | ${["S : total des salaires perçus depuis l'engagement (10000 €)"]}
    ${CatPro3239.assistantMaternel}           | ${10}     | ${"1/80 * S"}                              | ${["S : total des salaires perçus depuis l'engagement (10000 €)"]}
    ${CatPro3239.assistantMaternel}           | ${12}     | ${"1/80 * S"}                              | ${["S : total des salaires perçus depuis l'engagement (10000 €)"]}
  `(
    "Formule $expectedFormula avec $seniority ans, catégorie $category",
    ({ category, seniority, expectedFormula, expectedExplanations }) => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC3239'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle":
          category,
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement": `'Non'`,
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement . autres . total salaires":
          "10000",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          seniority,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "1000",
      });
      const result = engine.getFormule();

      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
