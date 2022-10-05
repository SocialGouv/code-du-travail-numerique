import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../internal/merger";

const engine = new Engine(mergeIndemniteLicenciementModels());

describe("CC 16", () => {
  describe("Calcul de l'indemnité de licenciement pour un Ingénieur et cadre", () => {
    test.each`
      seniority | seniorityEmployeTAM | age   | haveRightToRetirement | salaireRef | expectedCompensation
      ${2.08}   | ${0}                | ${45} | ${false}              | ${3374}    | ${0}
      ${3.67}   | ${0}                | ${45} | ${false}              | ${3374}    | ${4953.032}
      ${10}     | ${0}                | ${45} | ${false}              | ${3374}    | ${13496.0}
      ${5}      | ${6}                | ${45} | ${false}              | ${3374}    | ${12821.2}
      ${20}     | ${0}                | ${45} | ${false}              | ${3374}    | ${26992.0}
      ${23}     | ${0}                | ${45} | ${false}              | ${3374}    | ${31040.800000000003}
      ${20}     | ${10}               | ${45} | ${false}              | ${3374}    | ${37114.0}
      ${35}     | ${0}                | ${45} | ${false}              | ${3374}    | ${47236.0}
      ${2.08}   | ${0}                | ${61} | ${true}               | ${3374}    | ${0}
      ${3.67}   | ${0}                | ${61} | ${true}               | ${3374}    | ${3962.4256}
      ${10}     | ${0}                | ${61} | ${true}               | ${3374}    | ${10796.8}
      ${5}      | ${6}                | ${61} | ${true}               | ${3374}    | ${17004.96}
      ${20}     | ${0}                | ${61} | ${true}               | ${3374}    | ${28341.6}
      ${23}     | ${0}                | ${61} | ${true}               | ${3374}    | ${34954.64}
      ${20}     | ${10}               | ${61} | ${true}               | ${3374}    | ${39813.2}
      ${35}     | ${0}                | ${61} | ${true}               | ${3374}    | ${51284.8}
      ${5}      | ${0}                | ${66} | ${true}               | ${3374}    | ${0}
      ${3.67}   | ${0}                | ${61} | ${false}              | ${3374}    | ${4953.032}
      ${10}     | ${0}                | ${61} | ${false}              | ${3374}    | ${13496}
      ${20}     | ${0}                | ${61} | ${false}              | ${3374}    | ${33740}
      ${23}     | ${0}                | ${61} | ${false}              | ${3374}    | ${41162.8}
      ${35}     | ${0}                | ${61} | ${false}              | ${3374}    | ${60732}
    `(
      "Avec une ancienneté $seniority ans (plus $seniorityEmployeTAM en tant que non cadre), un salaire de référence $salaireRef € et un age de $age => une compensation de base de $expectedCompensation €",
      ({
        salaireRef,
        expectedCompensation,
        age,
        haveRightToRetirement,
        seniority,
        seniorityEmployeTAM,
      }) => {
        const dateCadre =
          seniorityEmployeTAM > 0
            ? {
                "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . date du statut cadre":
                  "01/01/2010",
              }
            : {};
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC0016'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
              "'Ingénieurs et cadres'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . age":
              age,
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . ancienneté avant cadre":
              seniorityEmployeTAM,
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . avant employé ou technicien": `${
              seniorityEmployeTAM > 0 ? "'Oui'" : "'Non'"
            }`,
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . droit à la retraite au titre du régime en vigueur dans l'entreprise": `${
              haveRightToRetirement ? "'Oui'" : "'Non'"
            }`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salaireRef,
            "indemnité de licenciement": "oui",
            ...dateCadre,
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.missingVariables).toEqual({});
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });
  describe("Calcul de l'indemnité de licenciement pour un TAM", () => {
    test.each`
      seniority | age   | haveRightToRetirement | salaireRef | expectedCompensation
      ${1.67}   | ${38} | ${false}              | ${2738}    | ${0}
      ${2.75}   | ${38} | ${false}              | ${2738}    | ${752.95}
      ${6}      | ${38} | ${false}              | ${2738}    | ${4928.4}
      ${1.67}   | ${63} | ${true}               | ${2738}    | ${0}
      ${2.75}   | ${63} | ${true}               | ${2738}    | ${338.8275}
      ${6}      | ${63} | ${true}               | ${2738}    | ${1971.3599999999992}
      ${1.67}   | ${63} | ${false}              | ${2738}    | ${0}
      ${2.75}   | ${63} | ${false}              | ${2738}    | ${752.95}
      ${6}      | ${63} | ${false}              | ${2738}    | ${4928.4}
    `(
      "ancienneté: $seniority ans, sref: $salaireRef €, age: $age, droit à la retraite: $haveRightToRetirement => une compensation de base de $expectedCompensation €",
      ({
        salaireRef,
        expectedCompensation,
        age,
        haveRightToRetirement,
        seniority,
      }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC0016'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . age":
              age,
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
              "'TAM'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . droit à la retraite au titre du régime en vigueur dans l'entreprise": `${
              haveRightToRetirement ? "'Oui'" : "'Non'"
            }`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salaireRef,
            "indemnité de licenciement": "oui",
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.missingVariables).toEqual({});
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });
  describe("Calcul de l'indemnité de licenciement pour un Employés", () => {
    test.each`
      seniority | age   | haveRightToRetirement | salaireRef | expectedCompensation
      ${1.91}   | ${38} | ${false}              | ${2471}    | ${0}
      ${2}      | ${38} | ${false}              | ${2471}    | ${494.20000000000005}
      ${5}      | ${38} | ${false}              | ${2471}    | ${2471}
      ${1.91}   | ${62} | ${true}               | ${2471}    | ${0}
      ${2}      | ${62} | ${true}               | ${2471}    | ${296.52}
      ${5}      | ${62} | ${true}               | ${2471}    | ${1482.6}
      ${1.91}   | ${62} | ${false}              | ${2471}    | ${0}
      ${2}      | ${62} | ${false}              | ${2471}    | ${494.20000000000005}
      ${5}      | ${62} | ${false}              | ${2471}    | ${2471}
    `(
      "Ancienneté: $seniority ans, sref: $salaireRef €, age: $age, droit à la retraite: $haveRightToRetirement => une compensation de base de $expectedCompensation €",
      ({
        salaireRef,
        expectedCompensation,
        age,
        haveRightToRetirement,
        seniority,
      }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC0016'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . age":
              age,
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
              "'Employés'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . droit à la retraite au titre du régime en vigueur dans l'entreprise": `${
              haveRightToRetirement ? "'Oui'" : "'Non'"
            }`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salaireRef,
            "indemnité de licenciement": "oui",
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.missingVariables).toEqual({});
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });
  describe("Calcul de l'indemnité de licenciement pour un Ouvrier en Incapacité définitive à la conduite", () => {
    test.each`
      seniority | salaireRef | expectedCompensation
      ${2.75}   | ${2523}    | ${0}
      ${3}      | ${2523}    | ${5046}
      ${4.91}   | ${2523}    | ${5046}
      ${5}      | ${2523}    | ${7569}
      ${10}     | ${2523}    | ${10092}
      ${13}     | ${2523}    | ${10092}
      ${15}     | ${2523}    | ${12615}
      ${20}     | ${2523}    | ${15138}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € et un age de $age => une compensation de base de $expectedCompensation €",
      ({ salaireRef, expectedCompensation, seniority }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC0016'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
              "'Ouvriers'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite":
              "'Oui'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite définitive":
              "'Oui'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salaireRef,
            "indemnité de licenciement": "oui",
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.missingVariables).toEqual({});
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });
  describe("Calcul de l'indemnité de licenciement pour un Ouvrier en Incapacité temporaire à la conduite", () => {
    test.each`
      seniority | salaireRef | expectedCompensation
      ${2.75}   | ${2600}    | ${0}
      ${3}      | ${2600}    | ${2600}
      ${12}     | ${2600}    | ${2600}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € et un age de $age => une compensation de base de $expectedCompensation €",
      ({ salaireRef, expectedCompensation, seniority }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC0016'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
              "'Ouvriers'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite":
              "'Oui'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite définitive":
              "'Non'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salaireRef,
            "indemnité de licenciement": "oui",
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.missingVariables).toEqual({});
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });
  describe("Calcul de l'indemnité de licenciement pour un Ouvrier en Autres licenciements", () => {
    test.each`
      seniority | salaireRef | haveRightToRetirement | age   | expectedCompensation
      ${1}      | ${2516}    | ${false}              | ${56} | ${0}
      ${2}      | ${2516}    | ${false}              | ${56} | ${503.20000000000005}
      ${2.5}    | ${2516}    | ${false}              | ${56} | ${629}
      ${3}      | ${2516}    | ${false}              | ${56} | ${1509.6000000000001}
      ${1}      | ${2516}    | ${true}               | ${60} | ${0}
      ${2}      | ${2516}    | ${true}               | ${62} | ${503.20000000000005}
      ${2.5}    | ${2516}    | ${true}               | ${62} | ${629}
      ${3}      | ${2516}    | ${true}               | ${62} | ${905.7600000000001}
      ${3}      | ${2516}    | ${false}              | ${62} | ${1509.6000000000001}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € et un age de $age => une compensation de base de $expectedCompensation €",
      ({
        salaireRef,
        expectedCompensation,
        age,
        haveRightToRetirement,
        seniority,
      }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC0016'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
              "'Ouvriers'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . autres licenciement . age":
              age,
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . autres licenciement . droit à la retraite au titre du régime en vigueur dans l'entreprise": `${
              haveRightToRetirement ? "'Oui'" : "'Non'"
            }`,
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite":
              "'Non'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . ouvrier . type":
              "'Autres licenciements'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salaireRef,
            "indemnité de licenciement": "oui",
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.missingVariables).toEqual({});
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });
});
