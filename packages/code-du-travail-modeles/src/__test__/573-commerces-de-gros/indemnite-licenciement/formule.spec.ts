import {
  FormuleFactory,
  LicenciementEconomique,
  SupportedCcIndemniteLicenciement,
} from "../../../plugins";
import { CatPro573 } from "../../../plugins/formule/573_commerces_de_gros";

describe("Indemnité légale de licenciement avec une formule personnalisée et expliquée pour la CC 573", () => {
  test.each`
    age   | category            | typeLicenciement              | seniority | expectedFormula                                                                                                                          | expectedExplanations
    ${32} | ${CatPro573.autres} | ${LicenciementEconomique.non} | ${0.91}   | ${""}                                                                                                                                    | ${[]}
    ${32} | ${CatPro573.autres} | ${LicenciementEconomique.non} | ${1}      | ${"1 / 5 * Sref * A"}                                                                                                                    | ${[]}
    ${32} | ${CatPro573.autres} | ${LicenciementEconomique.non} | ${15}     | ${"1 / 5 * Sref * A1 + 2 / 15 * Sref * A2"}                                                                                              | ${[]}
    ${32} | ${CatPro573.agents} | ${LicenciementEconomique.non} | ${0.5}    | ${""}                                                                                                                                    | ${[]}
    ${32} | ${CatPro573.agents} | ${LicenciementEconomique.non} | ${1}      | ${"2 / 10 * Sref * A"}                                                                                                                   | ${[]}
    ${32} | ${CatPro573.agents} | ${LicenciementEconomique.non} | ${15}     | ${"2 / 10 * Sref * A1 + 2 / 15 * Sref * A2"}                                                                                             | ${[]}
    ${40} | ${CatPro573.agents} | ${LicenciementEconomique.oui} | ${1}      | ${"2 / 10 * Sref * A"}                                                                                                                   | ${[]}
    ${40} | ${CatPro573.agents} | ${LicenciementEconomique.oui} | ${14}     | ${"2 / 10 * Sref * A1 + 2 / 15 * Sref * A2"}                                                                                             | ${[]}
    ${57} | ${CatPro573.agents} | ${LicenciementEconomique.oui} | ${14}     | ${"2 / 10 * Sref * A1 + 2 / 15 * Sref * A2"}                                                                                             | ${[]}
    ${55} | ${CatPro573.agents} | ${LicenciementEconomique.oui} | ${15}     | ${"2 / 10 * Sref * A1 + 3 / 10 * Sref * A2 + 20% (2 / 10 * Sref * A1 + 3 / 10 * Sref)"}                                                  | ${[]}
    ${56} | ${CatPro573.agents} | ${LicenciementEconomique.oui} | ${25}     | ${"2 / 10 * Sref * A1 + 3 / 10 * Sref * A2 + 20% (2 / 10 * Sref * A1 + 3 / 10 * Sref)"}                                                  | ${[]}
    ${32} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${4}      | ${"2 / 10 * Sref * A"}                                                                                                                   | ${[]}
    ${32} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${5}      | ${"2 / 10 * Sref * A"}                                                                                                                   | ${[]}
    ${40} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${6}      | ${"3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref * A3"}                                                                        | ${[]}
    ${40} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${10}     | ${"3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref * A3"}                                                                        | ${[]}
    ${40} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${23}     | ${"3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref * A3"}                                                                        | ${[]}
    ${52} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${6}      | ${"3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref * A3"}                                                                        | ${[]}
    ${52} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${10}     | ${"3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref * A3"}                                                                        | ${[]}
    ${52} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${23}     | ${"3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref * A3 + 15% ( 3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref )"}      | ${[]}
    ${57} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${6}      | ${"3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref * A3"}                                                                        | ${["A1: Années de présence dans la tranche de 0 à 9 ans inclus", "A2: Années de présence dans la tranche de 10 à 19 ans inclus", "A3: Années de présence dans la tranche à partir de 20 ans", "Sref : Salaire de référence (1000 €)"]}
    ${57} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${10}     | ${"3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref * A3"}                                                                        | ${["A1: Années de présence dans la tranche de 0 à 9 ans inclus", "A2: Années de présence dans la tranche de 10 à 19 ans inclus", "A3: Années de présence dans la tranche à partir de 20 ans", "Sref : Salaire de référence (1000 €)"]}
    ${57} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${23}     | ${"3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref * A3 + 20% ( 3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref * A3 )"} | ${["A1: Années de présence dans la tranche de 0 à 9 ans inclus", "A2: Années de présence dans la tranche de 10 à 19 ans inclus", "A3: Années de présence dans la tranche à partir de 20 ans", "Sref : Salaire de référence (1000 €)"]}
  `(
    "Formule $expectedFormula avec $seniority ans, catégorie $category, type de licenciement $typeLicenciement et ancienneté non cadre : $seniorityNonCadre",
    ({
      category,
      seniority,
      typeLicenciement,
      expectedFormula,
      expectedExplanations,
      age,
    }) => {
      const formula = new FormuleFactory().create(
        SupportedCcIndemniteLicenciement.IDCC0573
      );

      const result = formula.computeFormula({
        age,
        category,
        refSalary: 1000,
        seniority,
        typeLicenciement,
      });

      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
