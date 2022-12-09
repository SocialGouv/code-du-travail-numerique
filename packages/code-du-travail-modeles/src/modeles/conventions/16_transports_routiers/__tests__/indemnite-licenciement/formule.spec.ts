import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../../../internal/merger";
import { getFormule } from "../../../../common";

describe("Formule indemnité licenciement - CC 16", () => {
  const engine = new Engine(mergeIndemniteLicenciementModels());
  describe("Pour un ouvrier (autres licenciements)", () => {
    test.each`
      seniority | age   | haveRightToRetirement | expectedFormula                                               | expectedExplanations
      ${1.99}   | ${61} | ${false}              | ${""}                                                         | ${[]}
      ${2}      | ${61} | ${true}               | ${"1 / 10 * Sref * A"}                                        | ${["A : Ancienneté totale (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${3}      | ${59} | ${false}              | ${"2 / 10 * Sref * A1"}                                       | ${["A1 : Ancienneté totale (3 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${3}      | ${61} | ${true}               | ${"(2 / 10 * Sref * A1) - (20% * A2 * (2 / 10 * Sref * A1))"} | ${["A1 : Ancienneté totale (3 ans)", "A2 : Années entre 60 et 65 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${3}      | ${61} | ${false}              | ${"2 / 10 * Sref * A1"}                                       | ${["A1 : Ancienneté totale (3 ans)", "Sref : Salaire de référence (1000 €)"]}
    `(
      "Ancienneté: $seniority ans, catégorie: $category, age: $age, droit à la retraite: $haveRightToRetirement => $expectedFormula",
      ({
        seniority,
        age,
        haveRightToRetirement,
        expectedFormula,
        expectedExplanations,
      }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0016'",
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
            "'Ouvriers'",
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . autres licenciement . age": age,
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . autres licenciement . droit à la retraite au titre du régime en vigueur dans l'entreprise": `${
            haveRightToRetirement ? "'Oui'" : "'Non'"
          }`,
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite":
            "'Non'",
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
  describe("Pour un ouvrier (incapacité temporaire de conduire)", () => {
    test.each`
      seniority | expectedFormula | expectedExplanations
      ${3}      | ${""}           | ${[]}
      ${4}      | ${"1 * Sref"}   | ${["Sref : Salaire de référence (1000 €)"]}
    `(
      "Ancienneté $seniority ans, age: $age => $expectedFormula",
      ({ seniority, expectedFormula, expectedExplanations }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0016'",
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
            "'Ouvriers'",
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite":
            "'Oui'",
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite définitive":
            "'Non'",
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
  describe("Pour un ouvrier (incapacité définitive de conduire)", () => {
    test.each`
      seniority | expectedFormula | expectedExplanations
      ${2}      | ${""}           | ${[]}
      ${3}      | ${"2 * Sref"}   | ${["Sref : Salaire de référence (1000 €)"]}
      ${5}      | ${"3 * Sref"}   | ${["Sref : Salaire de référence (1000 €)"]}
      ${10}     | ${"4 * Sref"}   | ${["Sref : Salaire de référence (1000 €)"]}
      ${15}     | ${"5 * Sref"}   | ${["Sref : Salaire de référence (1000 €)"]}
      ${20}     | ${"6 * Sref"}   | ${["Sref : Salaire de référence (1000 €)"]}
    `(
      "Ancienneté: $seniority ans => $expectedFormula",
      ({ seniority, expectedFormula, expectedExplanations }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0016'",
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
            "'Ouvriers'",
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite":
            "'Oui'",
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite définitive":
            "'Oui'",
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
  describe("Pour un Employés", () => {
    test.each`
      seniority | age   | haveRightToRetirement | expectedFormula                                               | expectedExplanations
      ${1}      | ${59} | ${false}              | ${""}                                                         | ${[]}
      ${2}      | ${59} | ${false}              | ${"1 / 10 * Sref * A1"}                                       | ${["A1 : Ancienneté totale (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${2}      | ${61} | ${true}               | ${"(1 / 10 * Sref * A1) - (20% * A2 * (1 / 10 * Sref * A1))"} | ${["A1 : Ancienneté totale (2 ans)", "A2 : Années entre 60 et 65 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${2}      | ${61} | ${false}              | ${"1 / 10 * Sref * A1"}                                       | ${["A1 : Ancienneté totale (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${3}      | ${59} | ${false}              | ${"2 / 10 * Sref * A1"}                                       | ${["A1 : Ancienneté totale (3 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${3}      | ${61} | ${true}               | ${"(2 / 10 * Sref * A1) - (20% * A2 * (2 / 10 * Sref * A1))"} | ${["A1 : Ancienneté totale (3 ans)", "A2 : Années entre 60 et 65 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${3}      | ${61} | ${false}              | ${"2 / 10 * Sref * A1"}                                       | ${["A1 : Ancienneté totale (3 ans)", "Sref : Salaire de référence (1000 €)"]}
    `(
      "Ancienneté: $seniority ans, age: $age, droit à la retraite $haveRightToRetirement => $expectedFormula",
      ({
        seniority,
        age,
        haveRightToRetirement,
        expectedFormula,
        expectedExplanations,
      }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0016'",
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . age": age,
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
            "'Employés'",
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . droit à la retraite au titre du régime en vigueur dans l'entreprise": `${
            haveRightToRetirement ? "'Oui'" : "'Non'"
          }`,
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
  describe("Pour un TAM", () => {
    test.each`
      seniority | age   | haveRightToRetirement | expectedFormula                                               | expectedExplanations
      ${1}      | ${59} | ${false}              | ${""}                                                         | ${[]}
      ${2}      | ${59} | ${false}              | ${"1 / 10 * Sref * A1"}                                       | ${["A1 : Ancienneté totale (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${2}      | ${61} | ${true}               | ${"(1 / 10 * Sref * A1) - (20% * A2 * (1 / 10 * Sref * A1))"} | ${["A1 : Ancienneté totale (2 ans)", "A2 : Années entre 60 et 65 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${2}      | ${61} | ${false}              | ${"1 / 10 * Sref * A1"}                                       | ${["A1 : Ancienneté totale (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${2}      | ${66} | ${false}              | ${""}                                                         | ${[]}
      ${3}      | ${59} | ${false}              | ${"3 / 10 * Sref * A1"}                                       | ${["A1 : Ancienneté totale (3 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${3}      | ${61} | ${true}               | ${"(3 / 10 * Sref * A1) - (20% * A2 * (3 / 10 * Sref * A1))"} | ${["A1 : Ancienneté totale (3 ans)", "A2 : Années entre 60 et 65 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${3}      | ${61} | ${false}              | ${"3 / 10 * Sref * A1"}                                       | ${["A1 : Ancienneté totale (3 ans)", "Sref : Salaire de référence (1000 €)"]}
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
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0016'",
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . age": age,
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
            "'TAM'",
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . droit à la retraite au titre du régime en vigueur dans l'entreprise": `${
            haveRightToRetirement ? "'Oui'" : "'Non'"
          }`,
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
  describe("Pour un Ingénieur et Cadre", () => {
    test.each`
      seniority | seniorityTAM | hasBeenTAM | age   | haveRightToRetirement | expectedFormula                                                                                                              | expectedExplanations
      ${25}     | ${6}         | ${true}    | ${66} | ${false}              | ${""}                                                                                                                        | ${[]}
      ${31}     | ${undefined} | ${true}    | ${66} | ${false}              | ${""}                                                                                                                        | ${[]}
      ${25}     | ${6}         | ${true}    | ${64} | ${true}               | ${"((4 / 10 * Sref * A1) + (3 / 10 * Sref * A2)) - (20% * A3 * ((4 / 10 * Sref * A1) + (3 / 10 * Sref * A2))) + (4 * Sref)"} | ${["A1 : Ancienneté dans la catégorie Ingénieurs et cadres (25 ans)", "A2 : Ancienneté dans les catégories Techniciens et agents de maîtrise et Employés (6 ans)", "A3 : Années entre 60 et 65 ans (4 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${31}     | ${undefined} | ${true}    | ${64} | ${true}               | ${"(4 / 10 * Sref * A1) - (20% * A3 * (4 / 10 * Sref * A1)) + (4 * Sref)"}                                                   | ${["A1 : Ancienneté totale (31 ans)", "A3 : Années entre 60 et 65 ans (4 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${31}     | ${undefined} | ${true}    | ${64} | ${false}              | ${"4 / 10 * Sref * A1"}                                                                                                      | ${["A1 : Ancienneté totale (31 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${15}     | ${6}         | ${true}    | ${66} | ${false}              | ${""}                                                                                                                        | ${[]}
      ${21}     | ${undefined} | ${true}    | ${66} | ${false}              | ${""}                                                                                                                        | ${[]}
      ${15}     | ${6}         | ${true}    | ${62} | ${true}               | ${"((4 / 10 * Sref * A1) + (3 / 10 * Sref * A2)) - (20% * A3 * ((4 / 10 * Sref * A1) + (3 / 10 * Sref * A2))) + (3 * Sref)"} | ${["A1 : Ancienneté dans la catégorie Ingénieurs et cadres (15 ans)", "A2 : Ancienneté dans les catégories Techniciens et agents de maîtrise et Employés (6 ans)", "A3 : Années entre 60 et 65 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${21}     | ${undefined} | ${true}    | ${64} | ${true}               | ${"(4 / 10 * Sref * A1) - (20% * A3 * (4 / 10 * Sref * A1)) + (3 * Sref)"}                                                   | ${["A1 : Ancienneté totale (21 ans)", "A3 : Années entre 60 et 65 ans (4 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${21}     | ${undefined} | ${true}    | ${64} | ${false}              | ${"4 / 10 * Sref * A1"}                                                                                                      | ${["A1 : Ancienneté totale (21 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${5}      | ${6}         | ${true}    | ${66} | ${false}              | ${""}                                                                                                                        | ${[]}
      ${11}     | ${undefined} | ${true}    | ${66} | ${false}              | ${""}                                                                                                                        | ${[]}
      ${5}      | ${6}         | ${true}    | ${64} | ${true}               | ${"((4 / 10 * Sref * A1) + (3 / 10 * Sref * A2)) - (20% * A3 * ((4 / 10 * Sref * A1) + (3 / 10 * Sref * A2))) + (2 * Sref)"} | ${["A1 : Ancienneté dans la catégorie Ingénieurs et cadres (5 ans)", "A2 : Ancienneté dans les catégories Techniciens et agents de maîtrise et Employés (6 ans)", "A3 : Années entre 60 et 65 ans (4 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${11}     | ${undefined} | ${true}    | ${64} | ${true}               | ${"(4 / 10 * Sref * A1) - (20% * A3 * (4 / 10 * Sref * A1)) + (2 * Sref)"}                                                   | ${["A1 : Ancienneté totale (11 ans)", "A3 : Années entre 60 et 65 ans (4 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${11}     | ${undefined} | ${true}    | ${64} | ${false}              | ${"4 / 10 * Sref * A1"}                                                                                                      | ${["A1 : Ancienneté totale (11 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${4}      | ${7}         | ${true}    | ${61} | ${true}               | ${"((4 / 10 * Sref * A1) + (3 / 10 * Sref * A2)) - (20% * A3 * ((4 / 10 * Sref * A1) + (3 / 10 * Sref * A2)))"}              | ${["A1 : Ancienneté dans la catégorie Ingénieurs et cadres (4 ans)", "A2 : Ancienneté dans les catégories Techniciens et agents de maîtrise et Employés (7 ans)", "A3 : Années entre 60 et 65 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${4}      | ${7}         | ${true}    | ${61} | ${false}              | ${"(4 / 10 * Sref * A1) + (3 / 10 * Sref * A2)"}                                                                             | ${["A1 : Ancienneté dans la catégorie Ingénieurs et cadres (4 ans)", "A2 : Ancienneté dans les catégories Techniciens et agents de maîtrise et Employés (7 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${2}      | ${1}         | ${true}    | ${66} | ${false}              | ${""}                                                                                                                        | ${[]}
      ${3}      | ${undefined} | ${true}    | ${66} | ${false}              | ${""}                                                                                                                        | ${[]}
      ${2}      | ${1}         | ${true}    | ${61} | ${true}               | ${"((4 / 10 * Sref * A1) + (3 / 10 * Sref * A2)) - (20% * A3 * ((4 / 10 * Sref * A1) + (3 / 10 * Sref * A2)))"}              | ${["A1 : Ancienneté dans la catégorie Ingénieurs et cadres (2 ans)", "A2 : Ancienneté dans les catégories Techniciens et agents de maîtrise et Employés (1 an)", "A3 : Années entre 60 et 65 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${2}      | ${1}         | ${true}    | ${61} | ${false}              | ${"(4 / 10 * Sref * A1) + (3 / 10 * Sref * A2)"}                                                                             | ${["A1 : Ancienneté dans la catégorie Ingénieurs et cadres (2 ans)", "A2 : Ancienneté dans les catégories Techniciens et agents de maîtrise et Employés (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${3}      | ${undefined} | ${true}    | ${61} | ${true}               | ${"(4 / 10 * Sref * A1) - (20% * A3 * (4 / 10 * Sref * A1))"}                                                                | ${["A1 : Ancienneté totale (3 ans)", "A3 : Années entre 60 et 65 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${3}      | ${undefined} | ${true}    | ${61} | ${false}              | ${"4 / 10 * Sref * A1"}                                                                                                      | ${["A1 : Ancienneté totale (3 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${3}      | ${undefined} | ${true}    | ${60} | ${false}              | ${"4 / 10 * Sref * A1"}                                                                                                      | ${["A1 : Ancienneté totale (3 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${2}      | ${1}         | ${true}    | ${60} | ${false}              | ${"(4 / 10 * Sref * A1) + (3 / 10 * Sref * A2)"}                                                                             | ${["A1 : Ancienneté dans la catégorie Ingénieurs et cadres (2 ans)", "A2 : Ancienneté dans les catégories Techniciens et agents de maîtrise et Employés (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${2}      | ${undefined} | ${true}    | ${60} | ${false}              | ${""}                                                                                                                        | ${[]}
      ${2}      | ${undefined} | ${true}    | ${61} | ${true}               | ${""}                                                                                                                        | ${[]}
      ${2}      | ${undefined} | ${true}    | ${66} | ${false}              | ${""}                                                                                                                        | ${[]}
      ${11}     | ${undefined} | ${true}    | ${60} | ${false}              | ${"4 / 10 * Sref * A1"}                                                                                                      | ${["A1 : Ancienneté totale (11 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${5}      | ${6}         | ${true}    | ${60} | ${false}              | ${"(4 / 10 * Sref * A1) + (3 / 10 * Sref * A2)"}                                                                             | ${["A1 : Ancienneté dans la catégorie Ingénieurs et cadres (5 ans)", "A2 : Ancienneté dans les catégories Techniciens et agents de maîtrise et Employés (6 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${21}     | ${undefined} | ${true}    | ${60} | ${false}              | ${"4 / 10 * Sref * A1"}                                                                                                      | ${["A1 : Ancienneté totale (21 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${15}     | ${6}         | ${true}    | ${60} | ${false}              | ${"(4 / 10 * Sref * A1) + (3 / 10 * Sref * A2)"}                                                                             | ${["A1 : Ancienneté dans la catégorie Ingénieurs et cadres (15 ans)", "A2 : Ancienneté dans les catégories Techniciens et agents de maîtrise et Employés (6 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${31}     | ${undefined} | ${true}    | ${60} | ${false}              | ${"4 / 10 * Sref * A1"}                                                                                                      | ${["A1 : Ancienneté totale (31 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${25}     | ${6}         | ${true}    | ${60} | ${false}              | ${"(4 / 10 * Sref * A1) + (3 / 10 * Sref * A2)"}                                                                             | ${["A1 : Ancienneté dans la catégorie Ingénieurs et cadres (25 ans)", "A2 : Ancienneté dans les catégories Techniciens et agents de maîtrise et Employés (6 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${20}     | ${0}         | ${false}   | ${61} | ${true}               | ${"4 / 10 * Sref * A1"}                                                                                                      | ${["A1 : Ancienneté totale (20 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${35}     | ${0}         | ${false}   | ${61} | ${false}              | ${"4 / 10 * Sref * A1"}                                                                                                      | ${["A1 : Ancienneté totale (35 ans)", "Sref : Salaire de référence (1000 €)"]}
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
        const cadreBeforeTAM =
          seniorityTAM > 0
            ? {
                "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . ancienneté avant cadre": seniorityTAM,
                "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . avant employé ou technicien": `${"'Oui'"}`,
                "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . date du statut cadre":
                  "01/01/2010",
              }
            : {
                "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . avant employé ou technicien": `${"'Non'"}`,
              };
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0016'",
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
            "'Ingénieurs et cadres'",
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . age": age,
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . droit à la retraite au titre du régime en vigueur dans l'entreprise": `${
            haveRightToRetirement ? "'Oui'" : "'Non'"
          }`,
          "contrat salarié . indemnité de licenciement": "oui",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
          ...cadreBeforeTAM,
        });

        const formule = getFormule(situation);

        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedExplanations);
      }
    );
  });
});
