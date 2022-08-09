import {
  FormuleFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../plugins";

describe("Indemnité légale de licenciement avec une formule personnalisée et expliquée pour la CC 2264", () => {
  test.each`
    category        | seniorityNonCadre | seniority  | expectedFormula                                              | expectedExplanations
    ${"Non-cadres"} | ${undefined}      | ${11 / 12} | ${""}                                                        | ${[]}
    ${"Non-cadres"} | ${undefined}      | ${1.5}     | ${"1/5 * Sref * A"}                                          | ${["A : Ancienneté totale (1.5 an)", "Sref : Salaire de référence (1000 €)"]}
    ${"Non-cadres"} | ${undefined}      | ${12}      | ${"(1/5 * Sref * A1) + (2/5 * Sref * A2)"}                   | ${["A1 : Années d'ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au delà de 10 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${"Cadres"}     | ${undefined}      | ${11 / 12} | ${""}                                                        | ${[]}
    ${"Cadres"}     | ${undefined}      | ${1.5}     | ${"1/5 * Sref * A"}                                          | ${["A : Années d'ancienneté dans la fonction de cadre (1.5 an)", "Sref : Salaire de référence (1000 €)"]}
    ${"Cadres"}     | ${undefined}      | ${5}       | ${"(1/2 * Sref * A1)+ (1 * Sref * A2)"}                      | ${["A1 : Années d'ancienneté dans la fonction de cadre jusqu'à 5 ans (5 ans)", "A2 : Années d'ancienneté dans la fonction de cadre supérieures à 5 ans (0 an)", "Sref : Salaire de référence (1000 €)"]}
    ${"Cadres"}     | ${undefined}      | ${12}      | ${"(1/2 * Sref * A1)+ (1 * Sref * A2)"}                      | ${["A1 : Années d'ancienneté dans la fonction de cadre jusqu'à 5 ans (5 ans)", "A2 : Années d'ancienneté dans la fonction de cadre supérieures à 5 ans (7 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${"Non-cadres"} | ${10}             | ${12}      | ${"(1/5 * Sref * A1) + (2/5 * Sref * A2)"}                   | ${["A1 : Années d'ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au delà de 10 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${"Cadres"}     | ${0}              | ${12}      | ${"(1/2 * Sref * A1)+ (1 * Sref * A2)"}                      | ${["A1 : Années d'ancienneté dans la fonction de cadre jusqu'à 5 ans (5 ans)", "A2 : Années d'ancienneté dans la fonction de cadre supérieures à 5 ans (7 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${"Cadres"}     | ${1}              | ${12}      | ${"(1/5 * Sref * A1) + (1/2 * Sref * A3) + (1 * Sref * A4)"} | ${["A1 : Ancienneté totale en tant que non-cadres (1 an)", "A3 : Années d'ancienneté dans la fonction de cadre jusqu'à 5 ans (5 ans)", "A4 : Années d'ancienneté dans la fonction de cadre supérieures à 5 ans (6 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${"Cadres"}     | ${5}              | ${12}      | ${"(1/5 * Sref * A1) + (1/2 * Sref * A3) + (1 * Sref * A4)"} | ${["A1 : Ancienneté totale en tant que non-cadres (5 ans)", "A3 : Années d'ancienneté dans la fonction de cadre jusqu'à 5 ans (5 ans)", "A4 : Années d'ancienneté dans la fonction de cadre supérieures à 5 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${"Cadres"}     | ${10}             | ${12}      | ${"(1/5 * Sref * A1) + (1/5 * Sref * A3)"}                   | ${["A1 : Ancienneté totale en tant que non-cadres (10 ans)", "A3 : Années d'ancienneté dans la fonction de cadre (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${"Cadres"}     | ${10}             | ${16}      | ${"(1/5 * Sref * A1) + (1/2 * Sref * A3) + (1 * Sref * A4)"} | ${["A1 : Ancienneté totale en tant que non-cadres (10 ans)", "A3 : Années d'ancienneté dans la fonction de cadre jusqu'à 5 ans (5 ans)", "A4 : Années d'ancienneté dans la fonction de cadre supérieures à 5 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
    ${"Cadres"}     | ${1}              | ${16}      | ${"(1/5 * Sref * A1) + (1/2 * Sref * A3) + (1 * Sref * A4)"} | ${["A1 : Ancienneté totale en tant que non-cadres (1 an)", "A3 : Années d'ancienneté dans la fonction de cadre jusqu'à 5 ans (5 ans)", "A4 : Années d'ancienneté dans la fonction de cadre supérieures à 5 ans (10 ans)", "Sref : Salaire de référence (1000 €)"]}
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
        SupportedCcIndemniteLicenciement.IDCC2264
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
