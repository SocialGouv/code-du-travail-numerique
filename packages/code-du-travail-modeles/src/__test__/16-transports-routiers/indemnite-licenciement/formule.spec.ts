import {
  FormuleFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../plugins";

describe("Indemnité légale de licenciement avec une formule personnalisée et expliquée pour la CC 16", () => {
  describe("Pour un ouvrier (autres licenciements)", () => {
    test.each`
      seniority | age   | haveRightToRetirement | expectedFormula                                               | expectedExplanations
      ${1.99}   | ${61} | ${false}              | ${""}                                                         | ${[]}
      ${2}      | ${61} | ${true}               | ${"(1 / 10 * Sref * A)"}                                      | ${["A : Ancienneté totale (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${3}      | ${59} | ${false}              | ${"(2 / 10 * Sref * A)"}                                      | ${["A : Ancienneté totale (3 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${3}      | ${61} | ${true}               | ${"(2 / 10 * Sref * A1) - (20% * A2 * (2 / 10 * Sref * A1))"} | ${["A1 : Ancienneté totale (3 ans)", "A2 : Années entre 60 et 65 ans (1 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${3}      | ${61} | ${false}              | ${"(2 / 10 * Sref * A)"}                                      | ${["A : Ancienneté totale (3 ans)", "Sref : Salaire de référence (1000 €)"]}
    `(
      "Ancienneté: $seniority ans, catégorie: $category, age: $age, droit à la retraite: $haveRightToRetirement => $expectedFormula",
      ({
        seniority,
        age,
        haveRightToRetirement,
        expectedFormula,
        expectedExplanations,
      }) => {
        const formula = new FormuleFactory().create(
          SupportedCcIndemniteLicenciement.IDCC0016
        );

        const result = formula.computeFormula({
          age,
          category: "'Ouvriers'",
          haveRightToRetirement,
          refSalary: 1000,
          seniority,
        });

        expect(result.formula).toEqual(expectedFormula);
        expect(result.explanations).toEqual(expectedExplanations);
      }
    );
  });
  describe("Pour un ouvrier (incapacité temporaire de conduire)", () => {
    test.each`
      seniority | expectedFormula | expectedExplanations
      ${3}      | ${""}           | ${[]}
      ${4}      | ${"(1 * Sref)"} | ${["Sref : Salaire de référence (1000 €)"]}
    `(
      "Ancienneté $seniority ans, age: $age => $expectedFormula",
      ({ seniority, age, expectedFormula, expectedExplanations }) => {
        const formula = new FormuleFactory().create(
          SupportedCcIndemniteLicenciement.IDCC0016
        );

        const result = formula.computeFormula({
          age,
          category: "'Ouvriers'",
          driveInability: "temporary",
          refSalary: 1000,
          seniority,
        });

        expect(result.formula).toEqual(expectedFormula);
        expect(result.explanations).toEqual(expectedExplanations);
      }
    );
  });
  describe("Pour un ouvrier (incapacité définitive de conduire)", () => {
    test.each`
      seniority | expectedFormula | expectedExplanations
      ${2}      | ${""}           | ${[]}
      ${3}      | ${"(2 * Sref)"} | ${["Sref : Salaire de référence (1000 €)"]}
      ${5}      | ${"(3 * Sref)"} | ${["Sref : Salaire de référence (1000 €)"]}
      ${10}     | ${"(4 * Sref)"} | ${["Sref : Salaire de référence (1000 €)"]}
      ${15}     | ${"(5 * Sref)"} | ${["Sref : Salaire de référence (1000 €)"]}
      ${20}     | ${"(6 * Sref)"} | ${["Sref : Salaire de référence (1000 €)"]}
    `(
      "Ancienneté: $seniority ans => $expectedFormula",
      ({ seniority, expectedFormula, expectedExplanations }) => {
        const formula = new FormuleFactory().create(
          SupportedCcIndemniteLicenciement.IDCC0016
        );

        const result = formula.computeFormula({
          age: 60,
          category: "'Ouvriers'",
          driveInability: "definitive",
          refSalary: 1000,
          seniority,
        });

        expect(result.formula).toEqual(expectedFormula);
        expect(result.explanations).toEqual(expectedExplanations);
      }
    );
  });
  describe("Pour un Employés", () => {
    test.each`
      seniority | age   | haveRightToRetirement | expectedFormula                                               | expectedExplanations
      ${1}      | ${59} | ${false}              | ${""}                                                         | ${[]}
      ${2}      | ${59} | ${false}              | ${"(1 / 10 * Sref * A)"}                                      | ${["A : Ancienneté totale (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${2}      | ${61} | ${true}               | ${"(1 / 10 * Sref * A1) - (20% * A2 * (1 / 10 * Sref * A1))"} | ${["A1 : Ancienneté totale (2 ans)", "A2 : Années entre 60 et 65 ans (1 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${2}      | ${61} | ${false}              | ${"(1 / 10 * Sref * A)"}                                      | ${["A : Ancienneté totale (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${3}      | ${59} | ${false}              | ${"(2 / 10 * Sref * A)"}                                      | ${["A : Ancienneté totale (3 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${3}      | ${61} | ${true}               | ${"(2 / 10 * Sref * A1) - (20% * A2 * (2 / 10 * Sref * A1))"} | ${["A1 : Ancienneté totale (3 ans)", "A2 : Années entre 60 et 65 ans (1 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${3}      | ${61} | ${false}              | ${"(2 / 10 * Sref * A)"}                                      | ${["A : Ancienneté totale (3 ans)", "Sref : Salaire de référence (1000 €)"]}
    `(
      "Ancienneté: $seniority ans, age: $age, droit à la retraite $haveRightToRetirement => $expectedFormula",
      ({
        seniority,
        age,
        haveRightToRetirement,
        expectedFormula,
        expectedExplanations,
      }) => {
        const formula = new FormuleFactory().create(
          SupportedCcIndemniteLicenciement.IDCC0016
        );

        const result = formula.computeFormula({
          age,
          category: "'Employés'",
          haveRightToRetirement,
          refSalary: 1000,
          seniority,
        });

        expect(result.formula).toEqual(expectedFormula);
        expect(result.explanations).toEqual(expectedExplanations);
      }
    );
  });
  describe("Pour un TAM", () => {
    test.each`
      seniority | age   | haveRightToRetirement | expectedFormula                                               | expectedExplanations
      ${1}      | ${59} | ${false}              | ${""}                                                         | ${[]}
      ${2}      | ${59} | ${false}              | ${"(1 / 10 * Sref * A)"}                                      | ${["A : Ancienneté totale (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${2}      | ${61} | ${true}               | ${"(1 / 10 * Sref * A1) - (20% * A2 * (1 / 10 * Sref * A1))"} | ${["A1 : Ancienneté totale (2 ans)", "A2 : Années entre 60 et 65 ans (1 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${2}      | ${61} | ${false}              | ${"(1 / 10 * Sref * A)"}                                      | ${["A : Ancienneté totale (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${2}      | ${66} | ${false}              | ${""}                                                         | ${[]}
      ${3}      | ${59} | ${false}              | ${"(3 / 10 * Sref * A)"}                                      | ${["A : Ancienneté totale (3 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${3}      | ${61} | ${true}               | ${"(3 / 10 * Sref * A1) - (20% * A2 * (3 / 10 * Sref * A1))"} | ${["A1 : Ancienneté totale (3 ans)", "A2 : Années entre 60 et 65 ans (1 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${3}      | ${61} | ${false}              | ${"(3 / 10 * Sref * A)"}                                      | ${["A : Ancienneté totale (3 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${3}      | ${66} | ${false}              | ${""}                                                         | ${[]}
    `(
      "Ancienneté: $seniority ans, age: $age, droit à la retraite: $haveRightToRetirement => $expectedFormula",
      ({
        seniority,
        age,
        haveRightToRetirement,
        expectedFormula,
        expectedExplanations,
      }) => {
        const formula = new FormuleFactory().create(
          SupportedCcIndemniteLicenciement.IDCC0016
        );

        const result = formula.computeFormula({
          age,
          category: "'TAM'",
          haveRightToRetirement,
          refSalary: 1000,
          seniority,
        });

        expect(result.formula).toEqual(expectedFormula);
        expect(result.explanations).toEqual(expectedExplanations);
      }
    );
  });
  describe("Pour un Ingénieur et Cadre", () => {
    test.each`
      seniority | seniorityTAM | hasBeenTAM | age   | haveRightToRetirement | expectedFormula                                                                                                       | expectedExplanations
      ${25}     | ${6}         | ${true}    | ${66} | ${false}              | ${""}                                                                                                                 | ${[]}
      ${31}     | ${undefined} | ${true}    | ${66} | ${false}              | ${""}                                                                                                                 | ${[]}
      ${25}     | ${6}         | ${true}    | ${61} | ${true}               | ${"(4 / 10 * Sref * A1) + (3 / 10 * Sref * A2) - (20% * ((4 / 10 * Sref * A1) + (3 / 10 * Sref * A2))) + (4 * Sref)"} | ${["A1 : Ancienneté dans la catégorie Ingénieurs et cadres (25 ans)", "A2 : Ancienneté dans les catégories Techniciens et agents de maîtrise et Employés (6 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${31}     | ${undefined} | ${true}    | ${61} | ${true}               | ${"(4 / 10 * Sref * A) - (20% * (4 / 10 * Sref * A)) + (4 * Sref)"}                                                   | ${["A : Ancienneté totale (31 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${31}     | ${undefined} | ${true}    | ${61} | ${false}              | ${"(4 / 10 * Sref * A) + (4 * Sref)"}                                                                                 | ${["A : Ancienneté totale (31 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${15}     | ${6}         | ${true}    | ${66} | ${false}              | ${""}                                                                                                                 | ${[]}
      ${21}     | ${undefined} | ${true}    | ${66} | ${false}              | ${""}                                                                                                                 | ${[]}
      ${15}     | ${6}         | ${true}    | ${61} | ${true}               | ${"(4 / 10 * Sref * A1) + (3 / 10 * Sref * A2) - (20% * ((4 / 10 * Sref * A1) + (3 / 10 * Sref * A2))) + (3 * Sref)"} | ${["A1 : Ancienneté dans la catégorie Ingénieurs et cadres (15 ans)", "A2 : Ancienneté dans les catégories Techniciens et agents de maîtrise et Employés (6 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${21}     | ${undefined} | ${true}    | ${61} | ${true}               | ${"(4 / 10 * Sref * A) - (20% * (4 / 10 * Sref * A)) + (3 * Sref)"}                                                   | ${["A : Ancienneté totale (21 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${21}     | ${undefined} | ${true}    | ${61} | ${false}              | ${"(4 / 10 * Sref * A) + (3 * Sref)"}                                                                                 | ${["A : Ancienneté totale (21 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${5}      | ${6}         | ${true}    | ${66} | ${false}              | ${""}                                                                                                                 | ${[]}
      ${11}     | ${undefined} | ${true}    | ${66} | ${false}              | ${""}                                                                                                                 | ${[]}
      ${5}      | ${6}         | ${true}    | ${61} | ${true}               | ${"(4 / 10 * Sref * A1) + (3 / 10 * Sref * A2) - (20% * ((4 / 10 * Sref * A1) + (3 / 10 * Sref * A2))) + (2 * Sref)"} | ${["A1 : Ancienneté dans la catégorie Ingénieurs et cadres (5 ans)", "A2 : Ancienneté dans les catégories Techniciens et agents de maîtrise et Employés (6 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${11}     | ${undefined} | ${true}    | ${61} | ${true}               | ${"(4 / 10 * Sref * A) - (20% * (4 / 10 * Sref * A)) + (2 * Sref)"}                                                   | ${["A : Ancienneté totale (11 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${11}     | ${undefined} | ${true}    | ${61} | ${false}              | ${"(4 / 10 * Sref * A) + (2 * Sref)"}                                                                                 | ${["A : Ancienneté totale (11 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${4}      | ${7}         | ${true}    | ${61} | ${true}               | ${"(4 / 10 * Sref * A1) + (3 / 10 * Sref * A2) - (20% * ((4 / 10 * Sref * A1) + (3 / 10 * Sref * A2)))"}              | ${["A1 : Ancienneté dans la catégorie Ingénieurs et cadres (4 ans)", "A2 : Ancienneté dans les catégories Techniciens et agents de maîtrise et Employés (7 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${4}      | ${7}         | ${true}    | ${61} | ${false}              | ${"(4 / 10 * Sref * A1) + (3 / 10 * Sref * A2)"}                                                                      | ${["A1 : Ancienneté dans la catégorie Ingénieurs et cadres (4 ans)", "A2 : Ancienneté dans les catégories Techniciens et agents de maîtrise et Employés (7 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${2}      | ${1}         | ${true}    | ${66} | ${false}              | ${""}                                                                                                                 | ${[]}
      ${3}      | ${undefined} | ${true}    | ${66} | ${false}              | ${""}                                                                                                                 | ${[]}
      ${2}      | ${1}         | ${true}    | ${61} | ${true}               | ${"(4 / 10 * Sref * A1) + (3 / 10 * Sref * A2) - (20% * ((4 / 10 * Sref * A1) + (3 / 10 * Sref * A2)))"}              | ${["A1 : Ancienneté dans la catégorie Ingénieurs et cadres (2 ans)", "A2 : Ancienneté dans les catégories Techniciens et agents de maîtrise et Employés (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${2}      | ${1}         | ${true}    | ${61} | ${false}              | ${"(4 / 10 * Sref * A1) + (3 / 10 * Sref * A2)"}                                                                      | ${["A1 : Ancienneté dans la catégorie Ingénieurs et cadres (2 ans)", "A2 : Ancienneté dans les catégories Techniciens et agents de maîtrise et Employés (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${3}      | ${undefined} | ${true}    | ${61} | ${true}               | ${"(4 / 10 * Sref * A) - (20% * (4 / 10 * Sref * A))"}                                                                | ${["A : Ancienneté totale (3 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${3}      | ${undefined} | ${true}    | ${61} | ${false}              | ${"(4 / 10 * Sref * A)"}                                                                                              | ${["A : Ancienneté totale (3 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${3}      | ${undefined} | ${true}    | ${60} | ${false}              | ${"(4 / 10 * Sref * A)"}                                                                                              | ${["A : Ancienneté totale (3 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${2}      | ${1}         | ${true}    | ${60} | ${false}              | ${"(4 / 10 * Sref * A1) + (3 / 10 * Sref * A2)"}                                                                      | ${["A1 : Ancienneté dans la catégorie Ingénieurs et cadres (2 ans)", "A2 : Ancienneté dans les catégories Techniciens et agents de maîtrise et Employés (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${2}      | ${undefined} | ${true}    | ${60} | ${false}              | ${""}                                                                                                                 | ${[]}
      ${2}      | ${undefined} | ${true}    | ${61} | ${true}               | ${""}                                                                                                                 | ${[]}
      ${2}      | ${undefined} | ${true}    | ${66} | ${false}              | ${""}                                                                                                                 | ${[]}
      ${11}     | ${undefined} | ${true}    | ${60} | ${false}              | ${"(4 / 10 * Sref * A)"}                                                                                              | ${["A : Ancienneté totale (11 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${5}      | ${6}         | ${true}    | ${60} | ${false}              | ${"(4 / 10 * Sref * A1) + (3 / 10 * Sref * A2)"}                                                                      | ${["A1 : Ancienneté dans la catégorie Ingénieurs et cadres (5 ans)", "A2 : Ancienneté dans les catégories Techniciens et agents de maîtrise et Employés (6 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${21}     | ${undefined} | ${true}    | ${60} | ${false}              | ${"(4 / 10 * Sref * A)"}                                                                                              | ${["A : Ancienneté totale (21 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${15}     | ${6}         | ${true}    | ${60} | ${false}              | ${"(4 / 10 * Sref * A1) + (3 / 10 * Sref * A2)"}                                                                      | ${["A1 : Ancienneté dans la catégorie Ingénieurs et cadres (15 ans)", "A2 : Ancienneté dans les catégories Techniciens et agents de maîtrise et Employés (6 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${31}     | ${undefined} | ${true}    | ${60} | ${false}              | ${"(4 / 10 * Sref * A)"}                                                                                              | ${["A : Ancienneté totale (31 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${25}     | ${6}         | ${true}    | ${60} | ${false}              | ${"(4 / 10 * Sref * A1) + (3 / 10 * Sref * A2)"}                                                                      | ${["A1 : Ancienneté dans la catégorie Ingénieurs et cadres (25 ans)", "A2 : Ancienneté dans les catégories Techniciens et agents de maîtrise et Employés (6 ans)", "Sref : Salaire de référence (1000 €)"]}
    `(
      "Ancienneté: $seniority ans (dont $seniorityTAM en tant que TAM ou Employés), âge: $age, droit à la retraite: $haveRightToRetirement => $expectedFormula",
      ({
        seniority,
        seniorityTAM,
        age,
        haveRightToRetirement,
        expectedFormula,
        expectedExplanations,
      }) => {
        const formula = new FormuleFactory().create(
          SupportedCcIndemniteLicenciement.IDCC0016
        );

        const result = formula.computeFormula({
          age,
          category: "'Ingénieurs et cadres'",
          haveRightToRetirement,
          refSalary: 1000,
          seniority,
          seniorityTAM,
        });

        expect(result.formula).toEqual(expectedFormula);
        expect(result.explanations).toEqual(expectedExplanations);
      }
    );
  });
});
