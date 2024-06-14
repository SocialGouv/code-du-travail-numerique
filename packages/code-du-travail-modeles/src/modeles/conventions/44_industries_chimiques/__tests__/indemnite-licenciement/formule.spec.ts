import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";
import { CategoryPro44 } from "../../salary";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "44"
);

describe("Formule indemnité licenciement -  CC 44", () => {
  describe("Défaut", () => {
    test.each`
      category                     | age   | seniority | expectedFormula | expectedExplanations
      ${CategoryPro44.ouvrier}     | ${45} | ${0}      | ${""}           | ${[]}
      ${CategoryPro44.techniciens} | ${45} | ${0}      | ${""}           | ${[]}
      ${CategoryPro44.inge}        | ${45} | ${0}      | ${""}           | ${[]}
    `(
      "$#) Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring",
      ({ category, age, seniority, expectedFormula, expectedExplanations }) => {
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0044'",
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle":
            category,
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . age":
            age,

          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "1000",
        });

        const formule = engine.getFormule();

        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedExplanations);
      }
    );
  });

  describe("Ouvrier", () => {
    test.each`
      category                 | age   | seniority | expectedFormula                   | expectedExplanations
      ${CategoryPro44.ouvrier} | ${50} | ${1.25}   | ${""}                             | ${[]}
      ${CategoryPro44.ouvrier} | ${50} | ${1.99}   | ${""}                             | ${[]}
      ${CategoryPro44.ouvrier} | ${50} | ${2}      | ${"3 / 10 * Sref * A"}            | ${["A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.ouvrier} | ${50} | ${5}      | ${"Sref + 3 / 10 * Sref * A"}     | ${["A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (5 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.ouvrier} | ${55} | ${1.25}   | ${""}                             | ${[]}
      ${CategoryPro44.ouvrier} | ${55} | ${1.99}   | ${""}                             | ${[]}
      ${CategoryPro44.ouvrier} | ${55} | ${2}      | ${"3 / 10 * Sref * A"}            | ${["A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.ouvrier} | ${55} | ${5}      | ${"2 * Sref + 3 / 10 * Sref * A"} | ${["A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (5 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.ouvrier} | ${57} | ${1.25}   | ${""}                             | ${[]}
      ${CategoryPro44.ouvrier} | ${57} | ${1.99}   | ${""}                             | ${[]}
      ${CategoryPro44.ouvrier} | ${57} | ${2}      | ${"3 / 10 * Sref * A"}            | ${["A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.ouvrier} | ${57} | ${5}      | ${"2 * Sref + 3 / 10 * Sref * A"} | ${["A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (5 ans)", "Sref : Salaire de référence (1000 €)"]}
    `(
      "$#) Avec $seniority ans, catégorie $category, age $ageg",
      ({ category, age, seniority, expectedFormula, expectedExplanations }) => {
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0044'",
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle":
            category,

          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . age":
            age,

          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "1000",
        });

        const formule = engine.getFormule();

        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedExplanations);
      }
    );
  });

  describe("Technicien", () => {
    test.each`
      category                     | age   | seniority | expectedFormula                                                              | expectedExplanations
      ${CategoryPro44.techniciens} | ${50} | ${1.33}   | ${""}                                                                        | ${[]}
      ${CategoryPro44.techniciens} | ${50} | ${1.99}   | ${""}                                                                        | ${[]}
      ${CategoryPro44.techniciens} | ${50} | ${2}      | ${"3 / 10 * Sref * A1"}                                                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.techniciens} | ${50} | ${3}      | ${"3 / 10 * Sref * A1"}                                                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (3 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.techniciens} | ${50} | ${5}      | ${"Sref + 3 / 10 * Sref * A1"}                                               | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (5 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.techniciens} | ${50} | ${10}     | ${"Sref + 3 / 10 * Sref * A1 + 1 / 10 * Sref * A2"}                          | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (10 ans)", "A2 : A partir de 10 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (10 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.techniciens} | ${50} | ${20}     | ${"Sref + 3 / 10 * Sref * A1 + 1 / 10 * Sref * A2 + 1 / 10 * Sref * A3"}     | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (20 ans)", "A2 : A partir de 10 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (20 ans)", "A3 : A partir de 20 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (20 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.techniciens} | ${55} | ${1.33}   | ${""}                                                                        | ${[]}
      ${CategoryPro44.techniciens} | ${55} | ${1.99}   | ${""}                                                                        | ${[]}
      ${CategoryPro44.techniciens} | ${55} | ${2}      | ${"3 / 10 * Sref * A1"}                                                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.techniciens} | ${55} | ${3}      | ${"3 / 10 * Sref * A1"}                                                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (3 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.techniciens} | ${55} | ${5}      | ${"2 * Sref + 3 / 10 * Sref * A1"}                                           | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (5 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.techniciens} | ${55} | ${10}     | ${"2 * Sref + 3 / 10 * Sref * A1 + 1 / 10 * Sref * A2"}                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (10 ans)", "A2 : A partir de 10 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (10 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.techniciens} | ${55} | ${20}     | ${"2 * Sref + 3 / 10 * Sref * A1 + 1 / 10 * Sref * A2 + 1 / 10 * Sref * A3"} | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (20 ans)", "A2 : A partir de 10 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (20 ans)", "A3 : A partir de 20 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (20 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.techniciens} | ${56} | ${1.33}   | ${""}                                                                        | ${[]}
      ${CategoryPro44.techniciens} | ${56} | ${1.99}   | ${""}                                                                        | ${[]}
      ${CategoryPro44.techniciens} | ${56} | ${2}      | ${"3 / 10 * Sref * A1"}                                                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.techniciens} | ${56} | ${3}      | ${"3 / 10 * Sref * A1"}                                                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (3 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.techniciens} | ${56} | ${5}      | ${"2 * Sref + 3 / 10 * Sref * A1"}                                           | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (5 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.techniciens} | ${56} | ${10}     | ${"2 * Sref + 3 / 10 * Sref * A1 + 1 / 10 * Sref * A2"}                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (10 ans)", "A2 : A partir de 10 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (10 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.techniciens} | ${56} | ${20}     | ${"2 * Sref + 3 / 10 * Sref * A1 + 1 / 10 * Sref * A2 + 1 / 10 * Sref * A3"} | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (20 ans)", "A2 : A partir de 10 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (20 ans)", "A3 : A partir de 20 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (20 ans)", "Sref : Salaire de référence (1000 €)"]}
    `(
      "$#) Avec $seniority ans, catégorie $category, age $age",
      ({ category, age, seniority, expectedFormula, expectedExplanations }) => {
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0044'",
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle":
            category,
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . age":
            age,

          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "1000",
        });

        const formule = engine.getFormule();

        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedExplanations);
      }
    );
  });

  describe("Ingénieur", () => {
    test.each`
      category              | age   | seniority | expectedFormula                                                              | expectedExplanations
      ${CategoryPro44.inge} | ${40} | ${0.67}   | ${""}                                                                        | ${[]}
      ${CategoryPro44.inge} | ${40} | ${1.99}   | ${""}                                                                        | ${[]}
      ${CategoryPro44.inge} | ${40} | ${2}      | ${"4 / 10 * Sref * A1"}                                                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.inge} | ${40} | ${2.5}    | ${"4 / 10 * Sref * A1"}                                                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (2.5 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.inge} | ${40} | ${5}      | ${"4 / 10 * Sref * A1"}                                                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (5 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.inge} | ${40} | ${10}     | ${"4 / 10 * Sref * A1"}                                                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (10 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.inge} | ${40} | ${13}     | ${"4 / 10 * Sref * A1 + 6 / 10 * Sref * A2"}                                 | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (10 ans)", "A2 : Années au-delà de 10 ans pour la tranche de 10 à 15 ans (3 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.inge} | ${40} | ${17}     | ${"4 / 10 * Sref * A1 + 6 / 10 * Sref * A2 + 8 / 10 * Sref * A3"}            | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (10 ans)", "A2 : Années au-delà de 10 ans pour la tranche de 10 à 15 ans (5 ans)", "A3 : Années au-delà de 15 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.inge} | ${48} | ${0.67}   | ${""}                                                                        | ${[]}
      ${CategoryPro44.inge} | ${48} | ${1.99}   | ${""}                                                                        | ${[]}
      ${CategoryPro44.inge} | ${48} | ${2}      | ${"4 / 10 * Sref * A1"}                                                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.inge} | ${48} | ${2.5}    | ${"4 / 10 * Sref * A1"}                                                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (2.5 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.inge} | ${48} | ${5.01}   | ${"Sref + 4 / 10 * Sref * A1"}                                               | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (5.01 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.inge} | ${48} | ${10}     | ${"Sref + 4 / 10 * Sref * A1"}                                               | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (10 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.inge} | ${48} | ${13}     | ${"Sref + 4 / 10 * Sref * A1 + 6 / 10 * Sref * A2"}                          | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (10 ans)", "A2 : Années au-delà de 10 ans pour la tranche de 10 à 15 ans (3 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.inge} | ${48} | ${17}     | ${"Sref + 4 / 10 * Sref * A1 + 6 / 10 * Sref * A2 + 8 / 10 * Sref * A3"}     | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (10 ans)", "A2 : Années au-delà de 10 ans pour la tranche de 10 à 15 ans (5 ans)", "A3 : Années au-delà de 15 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.inge} | ${58} | ${0.67}   | ${""}                                                                        | ${[]}
      ${CategoryPro44.inge} | ${58} | ${1.99}   | ${""}                                                                        | ${[]}
      ${CategoryPro44.inge} | ${58} | ${2}      | ${"4 / 10 * Sref * A1"}                                                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.inge} | ${58} | ${2.5}    | ${"4 / 10 * Sref * A1"}                                                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (2.5 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.inge} | ${58} | ${5.01}   | ${"2 * Sref + 4 / 10 * Sref * A1"}                                           | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (5.01 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.inge} | ${58} | ${10}     | ${"2 * Sref + 4 / 10 * Sref * A1"}                                           | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (10 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.inge} | ${58} | ${13}     | ${"2 * Sref + 4 / 10 * Sref * A1 + 6 / 10 * Sref * A2"}                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (10 ans)", "A2 : Années au-delà de 10 ans pour la tranche de 10 à 15 ans (3 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CategoryPro44.inge} | ${58} | ${17}     | ${"2 * Sref + 4 / 10 * Sref * A1 + 6 / 10 * Sref * A2 + 8 / 10 * Sref * A3"} | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (10 ans)", "A2 : Années au-delà de 10 ans pour la tranche de 10 à 15 ans (5 ans)", "A3 : Années au-delà de 15 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    `(
      "$#) Avec $seniority ans, catégorie $category, age $age",
      ({ category, age, seniority, expectedFormula, expectedExplanations }) => {
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0044'",
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle":
            category,
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . age":
            age,

          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "1000",
        });

        const formule = engine.getFormule();

        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedExplanations);
      }
    );
  });
});
