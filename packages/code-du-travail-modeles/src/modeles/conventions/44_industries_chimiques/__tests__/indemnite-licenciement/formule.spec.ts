import { getFormule } from "../../../../common";
import { CategoryPro44 } from "../../salary";

describe("Formule indemnité licenciement -  CC 44", () => {
  describe("Défaut", () => {
    test.each`
      category                     | isEconomicFiring | age   | seniority | expectedFormula | expectedExplanations
      ${CategoryPro44.ouvrier}     | ${false}         | ${45} | ${0}      | ${""}           | ${[]}
      ${CategoryPro44.techniciens} | ${false}         | ${45} | ${0}      | ${""}           | ${[]}
      ${CategoryPro44.inge}        | ${false}         | ${45} | ${0}      | ${""}           | ${[]}
    `(
      "$#) Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring",
      ({
        category,
        isEconomicFiring,
        age,
        seniority,
        expectedFormula,
        expectedExplanations,
      }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0044'",
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique": isEconomicFiring
            ? `'Oui'`
            : `'Non'`,
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique . age": age,
          "contrat salarié . indemnité de licenciement": "oui",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
        });

        const formule = getFormule(situation);

        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedExplanations);
      }
    );
  });

  describe("Licenciement normal", () => {
    describe("Ouvrier", () => {
      test.each`
        category                 | isEconomicFiring | age   | seniority | expectedFormula                   | expectedExplanations
        ${CategoryPro44.ouvrier} | ${false}         | ${50} | ${1.25}   | ${""}                             | ${[]}
        ${CategoryPro44.ouvrier} | ${false}         | ${50} | ${1.99}   | ${""}                             | ${[]}
        ${CategoryPro44.ouvrier} | ${false}         | ${50} | ${2}      | ${"3 / 10 * Sref * A"}            | ${["A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (2 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.ouvrier} | ${false}         | ${50} | ${5}      | ${"Sref + 3 / 10 * Sref * A"}     | ${["A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (5 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.ouvrier} | ${false}         | ${55} | ${1.25}   | ${""}                             | ${[]}
        ${CategoryPro44.ouvrier} | ${false}         | ${55} | ${1.99}   | ${""}                             | ${[]}
        ${CategoryPro44.ouvrier} | ${false}         | ${55} | ${2}      | ${"3 / 10 * Sref * A"}            | ${["A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (2 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.ouvrier} | ${false}         | ${55} | ${5}      | ${"2 * Sref + 3 / 10 * Sref * A"} | ${["A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (5 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.ouvrier} | ${false}         | ${57} | ${1.25}   | ${""}                             | ${[]}
        ${CategoryPro44.ouvrier} | ${false}         | ${57} | ${1.99}   | ${""}                             | ${[]}
        ${CategoryPro44.ouvrier} | ${false}         | ${57} | ${2}      | ${"3 / 10 * Sref * A"}            | ${["A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (2 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.ouvrier} | ${false}         | ${57} | ${5}      | ${"2 * Sref + 3 / 10 * Sref * A"} | ${["A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (5 ans)", "Sref : Salaire de référence (1000 €)"]}
      `(
        "$#) Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring",
        ({
          category,
          isEconomicFiring,
          age,
          seniority,
          expectedFormula,
          expectedExplanations,
        }) => {
          const situation = engine.setSituation({
            "contrat salarié . convention collective": "'IDCC0044'",
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique": isEconomicFiring
              ? `'Oui'`
              : `'Non'`,
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique . age": age,
            "contrat salarié . indemnité de licenciement": "oui",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
          });

          const formule = getFormule(situation);

          expect(formule.formula).toEqual(expectedFormula);
          expect(formule.explanations).toEqual(expectedExplanations);
        }
      );
    });

    describe("Technicien", () => {
      test.each`
        category                     | isEconomicFiring | age   | seniority | expectedFormula                                                              | expectedExplanations
        ${CategoryPro44.techniciens} | ${false}         | ${50} | ${1.33}   | ${""}                                                                        | ${[]}
        ${CategoryPro44.techniciens} | ${false}         | ${50} | ${1.99}   | ${""}                                                                        | ${[]}
        ${CategoryPro44.techniciens} | ${false}         | ${50} | ${2}      | ${"3 / 10 * Sref * A1"}                                                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (2 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.techniciens} | ${false}         | ${50} | ${3}      | ${"3 / 10 * Sref * A1"}                                                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (3 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.techniciens} | ${false}         | ${50} | ${5}      | ${"Sref + 3 / 10 * Sref * A1"}                                               | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (5 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.techniciens} | ${false}         | ${50} | ${10}     | ${"Sref + 3 / 10 * Sref * A1 + 1 / 10 * Sref * A2"}                          | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (10 ans)", "A2 : A partir de 10 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (10 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.techniciens} | ${false}         | ${50} | ${20}     | ${"Sref + 3 / 10 * Sref * A1 + 1 / 10 * Sref * A2 + 1 / 10 * Sref * A3"}     | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (20 ans)", "A2 : A partir de 10 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (20 ans)", "A3 : A partir de 20 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (20 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.techniciens} | ${false}         | ${55} | ${1.33}   | ${""}                                                                        | ${[]}
        ${CategoryPro44.techniciens} | ${false}         | ${55} | ${1.99}   | ${""}                                                                        | ${[]}
        ${CategoryPro44.techniciens} | ${false}         | ${55} | ${2}      | ${"3 / 10 * Sref * A1"}                                                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (2 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.techniciens} | ${false}         | ${55} | ${3}      | ${"3 / 10 * Sref * A1"}                                                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (3 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.techniciens} | ${false}         | ${55} | ${5}      | ${"2 * Sref + 3 / 10 * Sref * A1"}                                           | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (5 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.techniciens} | ${false}         | ${55} | ${10}     | ${"2 * Sref + 3 / 10 * Sref * A1 + 1 / 10 * Sref * A2"}                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (10 ans)", "A2 : A partir de 10 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (10 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.techniciens} | ${false}         | ${55} | ${20}     | ${"2 * Sref + 3 / 10 * Sref * A1 + 1 / 10 * Sref * A2 + 1 / 10 * Sref * A3"} | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (20 ans)", "A2 : A partir de 10 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (20 ans)", "A3 : A partir de 20 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (20 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.techniciens} | ${false}         | ${56} | ${1.33}   | ${""}                                                                        | ${[]}
        ${CategoryPro44.techniciens} | ${false}         | ${56} | ${1.99}   | ${""}                                                                        | ${[]}
        ${CategoryPro44.techniciens} | ${false}         | ${56} | ${2}      | ${"3 / 10 * Sref * A1"}                                                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (2 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.techniciens} | ${false}         | ${56} | ${3}      | ${"3 / 10 * Sref * A1"}                                                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (3 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.techniciens} | ${false}         | ${56} | ${5}      | ${"2 * Sref + 3 / 10 * Sref * A1"}                                           | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (5 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.techniciens} | ${false}         | ${56} | ${10}     | ${"2 * Sref + 3 / 10 * Sref * A1 + 1 / 10 * Sref * A2"}                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (10 ans)", "A2 : A partir de 10 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (10 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.techniciens} | ${false}         | ${56} | ${20}     | ${"2 * Sref + 3 / 10 * Sref * A1 + 1 / 10 * Sref * A2 + 1 / 10 * Sref * A3"} | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (20 ans)", "A2 : A partir de 10 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (20 ans)", "A3 : A partir de 20 ans d'ancienneté : Années passées dans l'entreprise à compter de la date d'entrée (20 ans)", "Sref : Salaire de référence (1000 €)"]}
      `(
        "$#) Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring",
        ({
          category,
          isEconomicFiring,
          age,
          seniority,
          expectedFormula,
          expectedExplanations,
        }) => {
          const situation = engine.setSituation({
            "contrat salarié . convention collective": "'IDCC0044'",
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique": isEconomicFiring
              ? `'Oui'`
              : `'Non'`,
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique . age": age,
            "contrat salarié . indemnité de licenciement": "oui",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
          });

          const formule = getFormule(situation);

          expect(formule.formula).toEqual(expectedFormula);
          expect(formule.explanations).toEqual(expectedExplanations);
        }
      );
    });

    describe("Ingénieur", () => {
      test.each`
        category              | isEconomicFiring | age   | seniority | expectedFormula                                                              | expectedExplanations
        ${CategoryPro44.inge} | ${false}         | ${40} | ${0.67}   | ${""}                                                                        | ${[]}
        ${CategoryPro44.inge} | ${false}         | ${40} | ${1.99}   | ${""}                                                                        | ${[]}
        ${CategoryPro44.inge} | ${false}         | ${40} | ${2}      | ${"4 / 10 * Sref * A1"}                                                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.inge} | ${false}         | ${40} | ${2.5}    | ${"4 / 10 * Sref * A1"}                                                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (2.5 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.inge} | ${false}         | ${40} | ${5}      | ${"4 / 10 * Sref * A1"}                                                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (5 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.inge} | ${false}         | ${40} | ${10}     | ${"4 / 10 * Sref * A1"}                                                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (10 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.inge} | ${false}         | ${40} | ${13}     | ${"4 / 10 * Sref * A1 + 6 / 10 * Sref * A2"}                                 | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (10 ans)", "A2 : Années au-delà de 10 ans pour la tranche de 10 à 15 ans (3 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.inge} | ${false}         | ${40} | ${17}     | ${"4 / 10 * Sref * A1 + 6 / 10 * Sref * A2 + 8 / 10 * Sref * A3"}            | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (10 ans)", "A2 : Années au-delà de 10 ans pour la tranche de 10 à 15 ans (5 ans)", "A3 : Années au-delà de 15 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.inge} | ${false}         | ${48} | ${0.67}   | ${""}                                                                        | ${[]}
        ${CategoryPro44.inge} | ${false}         | ${48} | ${1.99}   | ${""}                                                                        | ${[]}
        ${CategoryPro44.inge} | ${false}         | ${48} | ${2}      | ${"4 / 10 * Sref * A1"}                                                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.inge} | ${false}         | ${48} | ${2.5}    | ${"4 / 10 * Sref * A1"}                                                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (2.5 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.inge} | ${false}         | ${48} | ${5.01}   | ${"Sref + 4 / 10 * Sref * A1"}                                               | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (5.01 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.inge} | ${false}         | ${48} | ${10}     | ${"Sref + 4 / 10 * Sref * A1"}                                               | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (10 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.inge} | ${false}         | ${48} | ${13}     | ${"Sref + 4 / 10 * Sref * A1 + 6 / 10 * Sref * A2"}                          | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (10 ans)", "A2 : Années au-delà de 10 ans pour la tranche de 10 à 15 ans (3 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.inge} | ${false}         | ${48} | ${17}     | ${"Sref + 4 / 10 * Sref * A1 + 6 / 10 * Sref * A2 + 8 / 10 * Sref * A3"}     | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (10 ans)", "A2 : Années au-delà de 10 ans pour la tranche de 10 à 15 ans (5 ans)", "A3 : Années au-delà de 15 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.inge} | ${false}         | ${58} | ${0.67}   | ${""}                                                                        | ${[]}
        ${CategoryPro44.inge} | ${false}         | ${58} | ${1.99}   | ${""}                                                                        | ${[]}
        ${CategoryPro44.inge} | ${false}         | ${58} | ${2}      | ${"4 / 10 * Sref * A1"}                                                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.inge} | ${false}         | ${58} | ${2.5}    | ${"4 / 10 * Sref * A1"}                                                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (2.5 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.inge} | ${false}         | ${58} | ${5.01}   | ${"2 * Sref + 4 / 10 * Sref * A1"}                                           | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (5.01 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.inge} | ${false}         | ${58} | ${10}     | ${"2 * Sref + 4 / 10 * Sref * A1"}                                           | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (10 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.inge} | ${false}         | ${58} | ${13}     | ${"2 * Sref + 4 / 10 * Sref * A1 + 6 / 10 * Sref * A2"}                      | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (10 ans)", "A2 : Années au-delà de 10 ans pour la tranche de 10 à 15 ans (3 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.inge} | ${false}         | ${58} | ${17}     | ${"2 * Sref + 4 / 10 * Sref * A1 + 6 / 10 * Sref * A2 + 8 / 10 * Sref * A3"} | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (10 ans)", "A2 : Années au-delà de 10 ans pour la tranche de 10 à 15 ans (5 ans)", "A3 : Années au-delà de 15 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      `(
        "$#) Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring",
        ({
          category,
          isEconomicFiring,
          age,
          seniority,
          expectedFormula,
          expectedExplanations,
        }) => {
          const situation = engine.setSituation({
            "contrat salarié . convention collective": "'IDCC0044'",
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique": isEconomicFiring
              ? `'Oui'`
              : `'Non'`,
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique . age": age,
            "contrat salarié . indemnité de licenciement": "oui",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
          });

          const formule = getFormule(situation);

          expect(formule.formula).toEqual(expectedFormula);
          expect(formule.explanations).toEqual(expectedExplanations);
        }
      );
    });
  });

  describe("Licenciement économique", () => {
    describe("Ouvrier", () => {
      test.each`
        category                 | isEconomicFiring | age   | seniority | expectedFormula                   | expectedExplanations
        ${CategoryPro44.ouvrier} | ${true}          | ${30} | ${0.75}   | ${""}                             | ${[]}
        ${CategoryPro44.ouvrier} | ${true}          | ${30} | ${0.99}   | ${""}                             | ${[]}
        ${CategoryPro44.ouvrier} | ${true}          | ${30} | ${1}      | ${"Sref"}                         | ${["Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.ouvrier} | ${true}          | ${30} | ${1.5}    | ${"Sref"}                         | ${["Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.ouvrier} | ${true}          | ${30} | ${2}      | ${"3 / 10 * Sref * A"}            | ${["A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (2 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.ouvrier} | ${true}          | ${30} | ${5}      | ${"3 / 10 * Sref * A"}            | ${["A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (5 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.ouvrier} | ${true}          | ${52} | ${0.75}   | ${""}                             | ${[]}
        ${CategoryPro44.ouvrier} | ${true}          | ${52} | ${0.99}   | ${""}                             | ${[]}
        ${CategoryPro44.ouvrier} | ${true}          | ${52} | ${1}      | ${"Sref"}                         | ${["Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.ouvrier} | ${true}          | ${52} | ${1.5}    | ${"Sref"}                         | ${["Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.ouvrier} | ${true}          | ${52} | ${2}      | ${"3 / 10 * Sref * A"}            | ${["A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (2 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.ouvrier} | ${true}          | ${52} | ${5}      | ${"2 * Sref + 3 / 10 * Sref * A"} | ${["A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (5 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.ouvrier} | ${true}          | ${56} | ${0.75}   | ${""}                             | ${[]}
        ${CategoryPro44.ouvrier} | ${true}          | ${56} | ${0.99}   | ${""}                             | ${[]}
        ${CategoryPro44.ouvrier} | ${true}          | ${56} | ${1}      | ${"Sref"}                         | ${["Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.ouvrier} | ${true}          | ${56} | ${1.5}    | ${"Sref"}                         | ${["Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.ouvrier} | ${true}          | ${56} | ${2}      | ${"3 / 10 * Sref * A"}            | ${["A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (2 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.ouvrier} | ${true}          | ${56} | ${5}      | ${"2 * Sref + 3 / 10 * Sref * A"} | ${["A : Année d'ancienneté à compter de la date d'entrée dans l'entreprise (5 ans)", "Sref : Salaire de référence (1000 €)"]}
      `(
        "$#) Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring",
        ({
          category,
          isEconomicFiring,
          age,
          seniority,
          expectedFormula,
          expectedExplanations,
        }) => {
          const situation = engine.setSituation({
            "contrat salarié . convention collective": "'IDCC0044'",
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique": isEconomicFiring
              ? `'Oui'`
              : `'Non'`,
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique . age": age,
            "contrat salarié . indemnité de licenciement": "oui",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
          });

          const formule = getFormule(situation);

          expect(formule.formula).toEqual(expectedFormula);
          expect(formule.explanations).toEqual(expectedExplanations);
        }
      );
    });

    describe("Technicien", () => {
      test.each`
        category                     | isEconomicFiring | age   | seniority | expectedFormula                    | expectedExplanations
        ${CategoryPro44.techniciens} | ${true}          | ${30} | ${0.75}   | ${""}                              | ${[]}
        ${CategoryPro44.techniciens} | ${true}          | ${30} | ${0.99}   | ${""}                              | ${[]}
        ${CategoryPro44.techniciens} | ${true}          | ${30} | ${1}      | ${"Sref"}                          | ${["Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.techniciens} | ${true}          | ${30} | ${1.5}    | ${"Sref"}                          | ${["Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.techniciens} | ${true}          | ${30} | ${2}      | ${"3 / 10 * Sref * A1"}            | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (2 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.techniciens} | ${true}          | ${30} | ${5}      | ${"3 / 10 * Sref * A1"}            | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (5 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.techniciens} | ${true}          | ${52} | ${0.75}   | ${""}                              | ${[]}
        ${CategoryPro44.techniciens} | ${true}          | ${52} | ${0.99}   | ${""}                              | ${[]}
        ${CategoryPro44.techniciens} | ${true}          | ${52} | ${1}      | ${"Sref"}                          | ${["Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.techniciens} | ${true}          | ${52} | ${1.5}    | ${"Sref"}                          | ${["Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.techniciens} | ${true}          | ${52} | ${2}      | ${"3 / 10 * Sref * A1"}            | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (2 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.techniciens} | ${true}          | ${52} | ${5}      | ${"2 * Sref + 3 / 10 * Sref * A1"} | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (5 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.techniciens} | ${true}          | ${56} | ${0.75}   | ${""}                              | ${[]}
        ${CategoryPro44.techniciens} | ${true}          | ${56} | ${0.99}   | ${""}                              | ${[]}
        ${CategoryPro44.techniciens} | ${true}          | ${56} | ${1}      | ${"Sref"}                          | ${["Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.techniciens} | ${true}          | ${56} | ${1.5}    | ${"Sref"}                          | ${["Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.techniciens} | ${true}          | ${56} | ${2}      | ${"3 / 10 * Sref * A1"}            | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (2 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.techniciens} | ${true}          | ${56} | ${5}      | ${"2 * Sref + 3 / 10 * Sref * A1"} | ${["A1 : Années à compter de la date d'entrée dans l'entreprise (5 ans)", "Sref : Salaire de référence (1000 €)"]}
      `(
        "$#) Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring",
        ({
          category,
          isEconomicFiring,
          age,
          seniority,
          expectedFormula,
          expectedExplanations,
        }) => {
          const situation = engine.setSituation({
            "contrat salarié . convention collective": "'IDCC0044'",
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique": isEconomicFiring
              ? `'Oui'`
              : `'Non'`,
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique . age": age,
            "contrat salarié . indemnité de licenciement": "oui",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
          });

          const formule = getFormule(situation);

          expect(formule.formula).toEqual(expectedFormula);
          expect(formule.explanations).toEqual(expectedExplanations);
        }
      );
    });

    describe("Ingénieur", () => {
      test.each`
        category              | isEconomicFiring | age   | seniority | expectedFormula                    | expectedExplanations
        ${CategoryPro44.inge} | ${true}          | ${30} | ${0.75}   | ${""}                              | ${[]}
        ${CategoryPro44.inge} | ${true}          | ${30} | ${0.99}   | ${""}                              | ${[]}
        ${CategoryPro44.inge} | ${true}          | ${30} | ${1}      | ${"Sref"}                          | ${["Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.inge} | ${true}          | ${30} | ${1.5}    | ${"Sref"}                          | ${["Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.inge} | ${true}          | ${30} | ${2}      | ${"4 / 10 * Sref * A1"}            | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.inge} | ${true}          | ${30} | ${5}      | ${"4 / 10 * Sref * A1"}            | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (5 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.inge} | ${true}          | ${52} | ${0.75}   | ${""}                              | ${[]}
        ${CategoryPro44.inge} | ${true}          | ${52} | ${0.99}   | ${""}                              | ${[]}
        ${CategoryPro44.inge} | ${true}          | ${52} | ${1}      | ${"Sref"}                          | ${["Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.inge} | ${true}          | ${52} | ${1.5}    | ${"Sref"}                          | ${["Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.inge} | ${true}          | ${52} | ${2}      | ${"4 / 10 * Sref * A1"}            | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.inge} | ${true}          | ${52} | ${5}      | ${"2 * Sref + 4 / 10 * Sref * A1"} | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (5 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.inge} | ${true}          | ${56} | ${0.75}   | ${""}                              | ${[]}
        ${CategoryPro44.inge} | ${true}          | ${56} | ${0.99}   | ${""}                              | ${[]}
        ${CategoryPro44.inge} | ${true}          | ${56} | ${1}      | ${"Sref"}                          | ${["Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.inge} | ${true}          | ${56} | ${1.5}    | ${"Sref"}                          | ${["Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.inge} | ${true}          | ${56} | ${2}      | ${"4 / 10 * Sref * A1"}            | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
        ${CategoryPro44.inge} | ${true}          | ${56} | ${5}      | ${"2 * Sref + 4 / 10 * Sref * A1"} | ${["A1 : Années à compter de la date d'entrée dans l'entreprise pour la tranche 0 à 10 ans (5 ans)", "Sref : Salaire de référence (1000 €)"]}
      `(
        "$#) Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring",
        ({
          category,
          isEconomicFiring,
          age,
          seniority,
          expectedFormula,
          expectedExplanations,
        }) => {
          const situation = engine.setSituation({
            "contrat salarié . convention collective": "'IDCC0044'",
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique": isEconomicFiring
              ? `'Oui'`
              : `'Non'`,
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique . age": age,
            "contrat salarié . indemnité de licenciement": "oui",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
          });

          const formule = getFormule(situation);

          expect(formule.formula).toEqual(expectedFormula);
          expect(formule.explanations).toEqual(expectedExplanations);
        }
      );
    });
  });
});
