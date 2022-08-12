import {
  FormuleFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../plugins";

describe("Indemnité légale de licenciement avec une formule personnalisée et expliquée pour la CC 413", () => {
  test.each`
    category                                                                                                                         | seniorityNonCadre | seniority  | expectedFormula                  | expectedExplanations
    ${"Non-cadres"}                                                                                                                  | ${undefined}      | ${23 / 12} | ${""}                            | ${[]}
    ${"Non-cadres"}                                                                                                                  | ${undefined}      | ${2}       | ${"1/2 * Sref * A"}              | ${["A : Ancienneté totale (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${"Non-cadres"}                                                                                                                  | ${undefined}      | ${10}      | ${"1/2 * Sref * A"}              | ${["A : Ancienneté totale (10 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${"Cadres"}                                                                                                                      | ${undefined}      | ${23 / 12} | ${""}                            | ${[]}
    ${"Cadres"}                                                                                                                      | ${undefined}      | ${2}       | ${""}                            | ${[]}
    ${"Cadres"}                                                                                                                      | ${undefined}      | ${25 / 12} | ${"Sref * A"}                    | ${["A : Ancienneté totale (2.08 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${"Cadres"}                                                                                                                      | ${undefined}      | ${15}      | ${"Sref * A"}                    | ${["A : Ancienneté totale (15 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${"Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service"} | ${undefined}      | ${23 / 12} | ${""}                            | ${[]}
    ${"Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service"} | ${undefined}      | ${2}       | ${""}                            | ${[]}
    ${"Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service"} | ${undefined}      | ${25 / 12} | ${"Sref * A"}                    | ${["A : Ancienneté totale (2.08 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${"Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service"} | ${undefined}      | ${15}      | ${"Sref * A"}                    | ${["A : Ancienneté totale (15 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${"Cadres"}                                                                                                                      | ${23 / 12}        | ${15}      | ${"1/2 * Sref * A1 + Sref * A2"} | ${["A1: Année de service en qualité de non-cadre (1.92 an)", "A2: Année de service en qualité de cadre (13.08 an)", "Sref : Salaire de référence (1000 €)"]}
    ${"Cadres"}                                                                                                                      | ${25 / 12}        | ${15}      | ${"1/2 * Sref * A1 + Sref * A2"} | ${["A1: Année de service en qualité de non-cadre (2.08 ans)", "A2: Année de service en qualité de cadre (12.92 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${"Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service"} | ${23 / 12}        | ${15}      | ${"1/2 * Sref * A1 + Sref * A2"} | ${["A1: Année de service en qualité de non-cadre (1.92 an)", "A2: Année de service en qualité de cadre (13.08 an)", "Sref : Salaire de référence (1000 €)"]}
    ${"Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service"} | ${25 / 12}        | ${15}      | ${"1/2 * Sref * A1 + Sref * A2"} | ${["A1: Année de service en qualité de non-cadre (2.08 ans)", "A2: Année de service en qualité de cadre (12.92 ans)", "Sref : Salaire de référence (1000 €)"]}
  `(
    "Formule $expectedFormula avec $seniority ans et comme catégorie $category, et ancienneté non cadre : $seniorityNonCadre",
    ({
      category,
      seniority,
      seniorityNonCadre,
      expectedFormula,
      expectedExplanations,
    }) => {
      const formula = new FormuleFactory().create(
        SupportedCcIndemniteLicenciement.IDCC413
      );

      const result = formula.computeFormula({
        category,
        refSalary: 1000,
        seniority,
        seniorityNonCadre,
      });

      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
