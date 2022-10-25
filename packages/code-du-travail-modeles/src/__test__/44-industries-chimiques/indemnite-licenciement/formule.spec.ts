import {
  FormuleFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../plugins";
import { CategoryPro44 } from "../../../plugins/salaire-reference/44_industries_chimiques";

describe("Indemnité légale de licenciement avec une formule personnalisée et expliquée pour la CC 44", () => {
  test.each`
    category                     | isEconomicFiring | age   | seniority | expectedFormula                                                              | expectedExplanations
    ${CategoryPro44.ouvrier}     | ${false}         | ${45} | ${0}      | ${""}                                                                        | ${[]}
    ${CategoryPro44.techniciens} | ${false}         | ${45} | ${0}      | ${""}                                                                        | ${[]}
    ${CategoryPro44.inge}        | ${false}         | ${45} | ${0}      | ${""}                                                                        | ${[]}
    ${CategoryPro44.ouvrier}     | ${false}         | ${50} | ${1.25}   | ${""}                                                                        | ${[]}
    ${CategoryPro44.ouvrier}     | ${false}         | ${50} | ${2}      | ${"3 / 10 * Sref * A"}                                                       | ${["Sref : Salaire de référence (1000 €)", "A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (2 ans)"]}
    ${CategoryPro44.ouvrier}     | ${false}         | ${50} | ${5}      | ${"3 / 10 * Sref * A"}                                                       | ${["Sref : Salaire de référence (1000 €)", "A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (5 ans)"]}
    ${CategoryPro44.ouvrier}     | ${false}         | ${55} | ${1.25}   | ${""}                                                                        | ${[]}
    ${CategoryPro44.ouvrier}     | ${false}         | ${55} | ${2}      | ${"3 / 10 * Sref * A"}                                                       | ${["Sref : Salaire de référence (1000 €)", "A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (2 ans)"]}
    ${CategoryPro44.ouvrier}     | ${false}         | ${55} | ${5}      | ${"3 / 10 * Sref * A + Sref"}                                                | ${["Sref : Salaire de référence (1000 €)", "A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (5 ans)"]}
    ${CategoryPro44.ouvrier}     | ${false}         | ${57} | ${1.25}   | ${""}                                                                        | ${[]}
    ${CategoryPro44.ouvrier}     | ${false}         | ${57} | ${2}      | ${"3 / 10 * Sref * A"}                                                       | ${["Sref : Salaire de référence (1000 €)", "A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (2 ans)"]}
    ${CategoryPro44.ouvrier}     | ${false}         | ${57} | ${5}      | ${"3 / 10 * Sref * A + Sref * 2"}                                            | ${["Sref : Salaire de référence (1000 €)", "A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (5 ans)"]}
    ${CategoryPro44.techniciens} | ${false}         | ${50} | ${1.33}   | ${""}                                                                        | ${[]}
    ${CategoryPro44.techniciens} | ${false}         | ${50} | ${3}      | ${"3 / 10 * Sref * A1"}                                                      | ${["Sref : Salaire de référence (1000 €)", "A1 : Années à compter de la date d'entrée dans l'entreprise (3 ans)"]}
    ${CategoryPro44.techniciens} | ${false}         | ${50} | ${5}      | ${"3 / 10 * Sref * A1"}                                                      | ${["Sref : Salaire de référence (1000 €)", "A1 : Années à compter de la date d'entrée dans l'entreprise (5 ans)"]}
    ${CategoryPro44.techniciens} | ${false}         | ${50} | ${10}     | ${"3 / 10 * Sref * A1 + 1 / 10 * Sref * A2"}                                 | ${["Sref : Salaire de référence (1000 €)", "A1 : Années à compter de la date d'entrée dans l'entreprise (10 ans)", "A2: A partir de 10 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (10 ans)"]}
    ${CategoryPro44.techniciens} | ${false}         | ${50} | ${20}     | ${"3 / 10 * Sref * A1 + 1 / 10 * Sref * A2 + 1 / 10 * Sref * A3"}            | ${["Sref : Salaire de référence (1000 €)", "A1 : Années à compter de la date d'entrée dans l'entreprise (20 ans)", "A2: A partir de 10 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (20 ans)", "A3: A partir de 20 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (20 ans)"]}
    ${CategoryPro44.techniciens} | ${false}         | ${55} | ${1.33}   | ${""}                                                                        | ${[]}
    ${CategoryPro44.techniciens} | ${false}         | ${55} | ${3}      | ${"3 / 10 * Sref * A1"}                                                      | ${["Sref : Salaire de référence (1000 €)", "A1 : Années à compter de la date d'entrée dans l'entreprise (3 ans)"]}
    ${CategoryPro44.techniciens} | ${false}         | ${55} | ${5}      | ${"Sref + 3 / 10 * Sref * A1"}                                               | ${["Sref : Salaire de référence (1000 €)", "A1 : Années à compter de la date d'entrée dans l'entreprise (5 ans)"]}
    ${CategoryPro44.techniciens} | ${false}         | ${55} | ${10}     | ${"Sref + 3 / 10 * Sref * A1 + 1 / 10 * Sref * A2"}                          | ${["Sref : Salaire de référence (1000 €)", "A1 : Années à compter de la date d'entrée dans l'entreprise (10 ans)", "A2: A partir de 10 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (10 ans)"]}
    ${CategoryPro44.techniciens} | ${false}         | ${55} | ${20}     | ${"Sref + 3 / 10 * Sref * A1 + 1 / 10 * Sref * A2 + 1 / 10 * Sref * A3"}     | ${["Sref : Salaire de référence (1000 €)", "A1 : Années à compter de la date d'entrée dans l'entreprise (20 ans)", "A2: A partir de 10 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (20 ans)", "A3: A partir de 20 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (20 ans)"]}
    ${CategoryPro44.techniciens} | ${false}         | ${56} | ${1.33}   | ${""}                                                                        | ${[]}
    ${CategoryPro44.techniciens} | ${false}         | ${56} | ${3}      | ${"3 / 10 * Sref * A1"}                                                      | ${["Sref : Salaire de référence (1000 €)", "A1 : Années à compter de la date d'entrée dans l'entreprise (3 ans)"]}
    ${CategoryPro44.techniciens} | ${false}         | ${56} | ${5}      | ${"2 * Sref + 3 / 10 * Sref * A1"}                                           | ${["Sref : Salaire de référence (1000 €)", "A1 : Années à compter de la date d'entrée dans l'entreprise (5 ans)"]}
    ${CategoryPro44.techniciens} | ${false}         | ${56} | ${10}     | ${"2 * Sref + 3 / 10 * Sref * A1 + 1 / 10 * Sref * A2"}                      | ${["Sref : Salaire de référence (1000 €)", "A1 : Années à compter de la date d'entrée dans l'entreprise (10 ans)", "A2: A partir de 10 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (10 ans)"]}
    ${CategoryPro44.techniciens} | ${false}         | ${56} | ${20}     | ${"2 * Sref + 3 / 10 * Sref * A1 + 1 / 10 * Sref * A2 + 1 / 10 * Sref * A3"} | ${["Sref : Salaire de référence (1000 €)", "A1 : Années à compter de la date d'entrée dans l'entreprise (20 ans)", "A2: A partir de 10 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (20 ans)", "A3: A partir de 20 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (20 ans)"]}
    ${CategoryPro44.inge}        | ${false}         | ${40} | ${0.67}   | ${""}                                                                        | ${[]}
    ${CategoryPro44.inge}        | ${false}         | ${40} | ${2.5}    | ${"4 / 10 * Sref * A1"}                                                      | ${["Sref : Salaire de référence (1000 €)", "A1: Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (2.5 ans)"]}
    ${CategoryPro44.inge}        | ${false}         | ${40} | ${5}      | ${"4 / 10 * Sref * A1"}                                                      | ${["Sref : Salaire de référence (1000 €)", "A1: Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (5 ans)"]}
    ${CategoryPro44.inge}        | ${false}         | ${40} | ${10}     | ${"4 / 10 * Sref * A1"}                                                      | ${["Sref : Salaire de référence (1000 €)", "A1: Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (10 ans)"]}
    ${CategoryPro44.inge}        | ${false}         | ${40} | ${13}     | ${"4 / 10 * Sref * A1 + 6 / 10 * Sref * A2"}                                 | ${["Sref : Salaire de référence (1000 €)", "A1: Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (10 ans)", "A2: Années au-delà de 10 ans pour la tranche de 10 à 15 ans (3 ans)"]}
    ${CategoryPro44.inge}        | ${false}         | ${40} | ${17}     | ${"4 / 10 * Sref * A1 + 6 / 10 * Sref * A2 + 8 / 10 * Sref * A3"}            | ${["Sref : Salaire de référence (1000 €)", "A1: Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (10 ans)", "A2: Années au-delà de 10 ans pour la tranche de 10 à 15 ans (5 ans)", "A3: Années au-delà de 15 ans (2 ans)"]}
    ${CategoryPro44.inge}        | ${false}         | ${48} | ${0.67}   | ${""}                                                                        | ${[]}
    ${CategoryPro44.inge}        | ${false}         | ${48} | ${2.5}    | ${"4 / 10 * Sref * A1"}                                                      | ${["Sref : Salaire de référence (1000 €)", "A1: Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (2.5 ans)"]}
    ${CategoryPro44.inge}        | ${false}         | ${48} | ${5}      | ${"Sref + 4 / 10 * Sref * A1"}                                               | ${["Sref : Salaire de référence (1000 €)", "A1: Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (5 ans)"]}
    ${CategoryPro44.inge}        | ${false}         | ${48} | ${10}     | ${"Sref + 4 / 10 * Sref * A1"}                                               | ${["Sref : Salaire de référence (1000 €)", "A1: Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (10 ans)"]}
    ${CategoryPro44.inge}        | ${false}         | ${48} | ${13}     | ${"Sref + 4 / 10 * Sref * A1 + 6 / 10 * Sref * A2"}                          | ${["Sref : Salaire de référence (1000 €)", "A1: Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (10 ans)", "A2: Années au-delà de 10 ans pour la tranche de 10 à 15 ans (3 ans)"]}
    ${CategoryPro44.inge}        | ${false}         | ${48} | ${17}     | ${"Sref + 4 / 10 * Sref * A1 + 6 / 10 * Sref * A2 + 8 / 10 * Sref * A3"}     | ${["Sref : Salaire de référence (1000 €)", "A1: Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (10 ans)", "A2: Années au-delà de 10 ans pour la tranche de 10 à 15 ans (5 ans)", "A3: Années au-delà de 15 ans (2 ans)"]}
    ${CategoryPro44.inge}        | ${false}         | ${58} | ${0.67}   | ${""}                                                                        | ${[]}
    ${CategoryPro44.inge}        | ${false}         | ${58} | ${2.5}    | ${"4 / 10 * Sref * A1"}                                                      | ${["Sref : Salaire de référence (1000 €)", "A1: Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (2.5 ans)"]}
    ${CategoryPro44.inge}        | ${false}         | ${58} | ${5}      | ${"2 * Sref + 4 / 10 * Sref * A1"}                                           | ${["Sref : Salaire de référence (1000 €)", "A1: Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (5 ans)"]}
    ${CategoryPro44.inge}        | ${false}         | ${58} | ${10}     | ${"2 * Sref + 4 / 10 * Sref * A1"}                                           | ${["Sref : Salaire de référence (1000 €)", "A1: Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (10 ans)"]}
    ${CategoryPro44.inge}        | ${false}         | ${58} | ${13}     | ${"2 * Sref + 4 / 10 * Sref * A1 + 6 / 10 * Sref * A2"}                      | ${["Sref : Salaire de référence (1000 €)", "A1: Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (10 ans)", "A2: Années au-delà de 10 ans pour la tranche de 10 à 15 ans (3 ans)"]}
    ${CategoryPro44.inge}        | ${false}         | ${58} | ${17}     | ${"2 * Sref + 4 / 10 * Sref * A1 + 6 / 10 * Sref * A2 + 8 / 10 * Sref * A3"} | ${["Sref : Salaire de référence (1000 €)", "A1: Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (10 ans)", "A2: Années au-delà de 10 ans pour la tranche de 10 à 15 ans (5 ans)", "A3: Années au-delà de 15 ans (2 ans)"]}
    ${CategoryPro44.ouvrier}     | ${true}          | ${30} | ${0.75}   | ${""}                                                                        | ${[]}
    ${CategoryPro44.ouvrier}     | ${true}          | ${30} | ${1.5}    | ${"Sref"}                                                                    | ${["Sref : Salaire de référence (1000 €)"]}
    ${CategoryPro44.ouvrier}     | ${true}          | ${30} | ${2}      | ${"3 / 10 * Sref * A"}                                                       | ${["Sref : Salaire de référence (1000 €)", "A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (2 ans)"]}
    ${CategoryPro44.ouvrier}     | ${true}          | ${30} | ${5}      | ${"3 / 10 * Sref * A"}                                                       | ${["Sref : Salaire de référence (1000 €)", "A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (5 ans)"]}
    ${CategoryPro44.ouvrier}     | ${true}          | ${52} | ${0.75}   | ${""}                                                                        | ${[]}
    ${CategoryPro44.ouvrier}     | ${true}          | ${52} | ${1.5}    | ${"Sref"}                                                                    | ${["Sref : Salaire de référence (1000 €)"]}
    ${CategoryPro44.ouvrier}     | ${true}          | ${52} | ${2}      | ${"3 / 10 * Sref * A"}                                                       | ${["Sref : Salaire de référence (1000 €)", "A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (2 ans)"]}
    ${CategoryPro44.ouvrier}     | ${true}          | ${52} | ${5}      | ${"3 / 10 * Sref * A + Sref * 2"}                                            | ${["Sref : Salaire de référence (1000 €)", "A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (5 ans)"]}
    ${CategoryPro44.ouvrier}     | ${true}          | ${56} | ${0.75}   | ${""}                                                                        | ${[]}
    ${CategoryPro44.ouvrier}     | ${true}          | ${56} | ${1.5}    | ${"Sref"}                                                                    | ${["Sref : Salaire de référence (1000 €)"]}
    ${CategoryPro44.ouvrier}     | ${true}          | ${56} | ${2}      | ${"3 / 10 * Sref * A"}                                                       | ${["Sref : Salaire de référence (1000 €)", "A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (2 ans)"]}
    ${CategoryPro44.ouvrier}     | ${true}          | ${56} | ${5}      | ${"3 / 10 * Sref * A"}                                                       | ${["Sref : Salaire de référence (1000 €)", "A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (5 ans)"]}
    ${CategoryPro44.techniciens} | ${true}          | ${30} | ${0.75}   | ${""}                                                                        | ${[]}
    ${CategoryPro44.techniciens} | ${true}          | ${30} | ${1.5}    | ${"Sref"}                                                                    | ${["Sref : Salaire de référence (1000 €)"]}
    ${CategoryPro44.techniciens} | ${true}          | ${30} | ${2}      | ${"3 / 10 * Sref * A1"}                                                      | ${["Sref : Salaire de référence (1000 €)", "A1 : Années à compter de la date d'entrée dans l'entreprise (2 ans)"]}
    ${CategoryPro44.techniciens} | ${true}          | ${30} | ${5}      | ${"3 / 10 * Sref * A1"}                                                      | ${["Sref : Salaire de référence (1000 €)", "A1 : Années à compter de la date d'entrée dans l'entreprise (5 ans)"]}
    ${CategoryPro44.techniciens} | ${true}          | ${52} | ${0.75}   | ${""}                                                                        | ${[]}
    ${CategoryPro44.techniciens} | ${true}          | ${52} | ${1.5}    | ${"Sref"}                                                                    | ${["Sref : Salaire de référence (1000 €)"]}
    ${CategoryPro44.techniciens} | ${true}          | ${52} | ${2}      | ${"3 / 10 * Sref * A1"}                                                      | ${["Sref : Salaire de référence (1000 €)", "A1 : Années à compter de la date d'entrée dans l'entreprise (2 ans)"]}
    ${CategoryPro44.techniciens} | ${true}          | ${52} | ${5}      | ${"2 * Sref + 3 / 10 * Sref * A1"}                                           | ${["Sref : Salaire de référence (1000 €)", "A1 : Années à compter de la date d'entrée dans l'entreprise (5 ans)"]}
    ${CategoryPro44.techniciens} | ${true}          | ${56} | ${0.75}   | ${""}                                                                        | ${[]}
    ${CategoryPro44.techniciens} | ${true}          | ${56} | ${1.5}    | ${"Sref"}                                                                    | ${["Sref : Salaire de référence (1000 €)"]}
    ${CategoryPro44.techniciens} | ${true}          | ${56} | ${2}      | ${"3 / 10 * Sref * A1"}                                                      | ${["Sref : Salaire de référence (1000 €)", "A1 : Années à compter de la date d'entrée dans l'entreprise (2 ans)"]}
    ${CategoryPro44.techniciens} | ${true}          | ${56} | ${5}      | ${"3 / 10 * Sref * A1"}                                                      | ${["Sref : Salaire de référence (1000 €)", "A1 : Années à compter de la date d'entrée dans l'entreprise (5 ans)"]}
    ${CategoryPro44.inge}        | ${true}          | ${30} | ${0.75}   | ${""}                                                                        | ${[]}
    ${CategoryPro44.inge}        | ${true}          | ${30} | ${1.5}    | ${"Sref"}                                                                    | ${["Sref : Salaire de référence (1000 €)"]}
    ${CategoryPro44.inge}        | ${true}          | ${30} | ${2}      | ${"4 / 10 * Sref * A1"}                                                      | ${["Sref : Salaire de référence (1000 €)", "A1: Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (2 ans)"]}
    ${CategoryPro44.inge}        | ${true}          | ${30} | ${5}      | ${"4 / 10 * Sref * A1"}                                                      | ${["Sref : Salaire de référence (1000 €)", "A1: Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (5 ans)"]}
    ${CategoryPro44.inge}        | ${true}          | ${52} | ${0.75}   | ${""}                                                                        | ${[]}
    ${CategoryPro44.inge}        | ${true}          | ${52} | ${1.5}    | ${"Sref"}                                                                    | ${["Sref : Salaire de référence (1000 €)"]}
    ${CategoryPro44.inge}        | ${true}          | ${52} | ${2}      | ${"4 / 10 * Sref * A1"}                                                      | ${["Sref : Salaire de référence (1000 €)", "A1: Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (2 ans)"]}
    ${CategoryPro44.inge}        | ${true}          | ${52} | ${5}      | ${"2 * Sref + 4 / 10 * Sref * A1"}                                           | ${["Sref : Salaire de référence (1000 €)", "A1: Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (5 ans)"]}
    ${CategoryPro44.inge}        | ${true}          | ${56} | ${0.75}   | ${""}                                                                        | ${[]}
    ${CategoryPro44.inge}        | ${true}          | ${56} | ${1.5}    | ${"Sref"}                                                                    | ${["Sref : Salaire de référence (1000 €)"]}
    ${CategoryPro44.inge}        | ${true}          | ${56} | ${2}      | ${"4 / 10 * Sref * A1"}                                                      | ${["Sref : Salaire de référence (1000 €)", "A1: Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (2 ans)"]}
    ${CategoryPro44.inge}        | ${true}          | ${56} | ${5}      | ${"4 / 10 * Sref * A1"}                                                      | ${["Sref : Salaire de référence (1000 €)", "A1: Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (5 ans)"]}
  `(
    "Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring => explications $expectedExplanations ; formule $expectedFormula",
    ({
      category,
      seniority,
      expectedFormula,
      expectedExplanations,
      age,
      isEconomicFiring,
    }) => {
      const formula = new FormuleFactory().create(
        SupportedCcIndemniteLicenciement.IDCC0044
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
