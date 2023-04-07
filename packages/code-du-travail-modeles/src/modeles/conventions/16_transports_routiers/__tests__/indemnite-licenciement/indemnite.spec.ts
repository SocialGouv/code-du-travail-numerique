import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "16"
);

describe("CC 16", () => {
  describe("Calcul de l'indemnité de licenciement pour un Ingénieur et cadre", () => {
    test.each`
      seniorityRight | seniority | seniorityEmployeTAM | age   | haveRightToRetirement | salaireRef | expectedCompensation
      ${2.08}        | ${2.08}   | ${0}                | ${45} | ${false}              | ${3374}    | ${0}
      ${2.99}        | ${2.99}   | ${0}                | ${45} | ${false}              | ${3374}    | ${0}
      ${2}           | ${3}      | ${0}                | ${45} | ${false}              | ${3374}    | ${0}
      ${3}           | ${3}      | ${0}                | ${45} | ${false}              | ${3374}    | ${4048.8}
      ${3}           | ${3.67}   | ${0}                | ${45} | ${false}              | ${3374}    | ${4953.03}
      ${3}           | ${10}     | ${0}                | ${45} | ${false}              | ${3374}    | ${13496.0}
      ${3}           | ${5}      | ${6}                | ${45} | ${false}              | ${3374}    | ${12821.2}
      ${3}           | ${20}     | ${0}                | ${45} | ${false}              | ${3374}    | ${26992.0}
      ${3}           | ${23}     | ${0}                | ${45} | ${false}              | ${3374}    | ${31040.8}
      ${3}           | ${20}     | ${10}               | ${45} | ${false}              | ${3374}    | ${37114.0}
      ${3}           | ${35}     | ${0}                | ${45} | ${false}              | ${3374}    | ${47236.0}
      ${2.08}        | ${2.08}   | ${0}                | ${61} | ${true}               | ${3374}    | ${0}
      ${2.08}        | ${4}      | ${0}                | ${61} | ${true}               | ${3374}    | ${0}
      ${3}           | ${3.67}   | ${0}                | ${61} | ${true}               | ${3374}    | ${3962.43}
      ${3}           | ${10}     | ${0}                | ${61} | ${true}               | ${3374}    | ${10796.8}
      ${3}           | ${5}      | ${6}                | ${61} | ${true}               | ${3374}    | ${12821.2}
      ${3}           | ${20}     | ${0}                | ${61} | ${true}               | ${3374}    | ${26992}
      ${3}           | ${23}     | ${0}                | ${61} | ${true}               | ${3374}    | ${31040.8}
      ${3}           | ${20}     | ${10}               | ${61} | ${true}               | ${3374}    | ${37114}
      ${3}           | ${35}     | ${0}                | ${61} | ${true}               | ${3374}    | ${47236}
      ${5}           | ${5}      | ${0}                | ${66} | ${true}               | ${3374}    | ${0}
      ${2}           | ${3.67}   | ${0}                | ${61} | ${false}              | ${3374}    | ${0}
      ${3}           | ${3.67}   | ${0}                | ${61} | ${false}              | ${3374}    | ${4953.03}
      ${3}           | ${10}     | ${0}                | ${61} | ${false}              | ${3374}    | ${13496}
      ${3}           | ${20}     | ${0}                | ${61} | ${false}              | ${3374}    | ${26992}
      ${3}           | ${23}     | ${0}                | ${61} | ${false}              | ${3374}    | ${31040.8}
      ${3}           | ${35}     | ${0}                | ${61} | ${false}              | ${3374}    | ${47236}
      ${3}           | ${12}     | ${10}               | ${64} | ${true}               | ${3000}    | ${13680}
      ${66}          | ${1}      | ${0}                | ${66} | ${true}               | ${3000}    | ${0}
    `(
      "Avec une ancienneté $seniority ans (plus $seniorityEmployeTAM en tant que non cadre), droit de retraite: $haveRightToRetirement, un salaire de référence $salaireRef € et un age de $age => une compensation de base de $expectedCompensation €",
      ({
        seniorityRight,
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
        const { missingArgs, result } = engine.setSituation(
          {
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
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salaireRef,
            ...dateCadre,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );

        expect(missingArgs).toEqual([]);
        expect(result.value).toEqual(expectedCompensation);
        expect(result.unit?.numerators).toEqual(["€"]);
      }
    );
  });
  describe("Calcul de l'indemnité de licenciement pour un TAM", () => {
    test.each`
      seniorityRight | seniority | age   | haveRightToRetirement | salaireRef | expectedCompensation
      ${1.67}        | ${1.67}   | ${38} | ${false}              | ${2738}    | ${0}
      ${1.99}        | ${1.99}   | ${38} | ${false}              | ${2738}    | ${0}
      ${1.99}        | ${2}      | ${38} | ${false}              | ${2738}    | ${0}
      ${2}           | ${2}      | ${38} | ${false}              | ${2738}    | ${547.6}
      ${2}           | ${2.75}   | ${38} | ${false}              | ${2738}    | ${752.95}
      ${2}           | ${6}      | ${38} | ${false}              | ${2738}    | ${4928.4}
      ${1.67}        | ${1.67}   | ${63} | ${true}               | ${2738}    | ${0}
      ${1.67}        | ${2}      | ${63} | ${true}               | ${2738}    | ${0}
      ${2.75}        | ${2.75}   | ${63} | ${true}               | ${2738}    | ${338.83}
      ${2}           | ${6}      | ${63} | ${true}               | ${2738}    | ${1971.36}
      ${1.67}        | ${1.67}   | ${63} | ${false}              | ${2738}    | ${0}
      ${1.67}        | ${2}      | ${63} | ${false}              | ${2738}    | ${0}
      ${2.75}        | ${2.75}   | ${63} | ${false}              | ${2738}    | ${752.95}
      ${2}           | ${6}      | ${63} | ${false}              | ${2738}    | ${4928.4}
      ${2}           | ${6}      | ${66} | ${false}              | ${2738}    | ${0}
      ${2}           | ${6}      | ${66} | ${true}               | ${2738}    | ${0}
    `(
      "ancienneté: $seniority ans, sref: $salaireRef €, age: $age, droit à la retraite: $haveRightToRetirement => une compensation de base de $expectedCompensation €",
      ({
        salaireRef,
        expectedCompensation,
        age,
        haveRightToRetirement,
        seniority,
        seniorityRight,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
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
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salaireRef,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(missingArgs).toEqual([]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );
  });
  describe("Calcul de l'indemnité de licenciement pour un Employés", () => {
    test.each`
      seniorityRight | seniority | age   | haveRightToRetirement | salaireRef | expectedCompensation
      ${1.91}        | ${1.91}   | ${38} | ${false}              | ${2471}    | ${0}
      ${1.99}        | ${1.99}   | ${38} | ${false}              | ${2471}    | ${0}
      ${1.99}        | ${2}      | ${38} | ${false}              | ${2471}    | ${0}
      ${2}           | ${2}      | ${38} | ${false}              | ${2471}    | ${494.2}
      ${2}           | ${5}      | ${38} | ${false}              | ${2471}    | ${2471}
      ${1.91}        | ${1.91}   | ${62} | ${true}               | ${2471}    | ${0}
      ${1.91}        | ${2}      | ${62} | ${true}               | ${2471}    | ${0}
      ${2}           | ${2}      | ${62} | ${true}               | ${2471}    | ${296.52}
      ${2}           | ${5}      | ${62} | ${true}               | ${2471}    | ${1482.6}
      ${1.91}        | ${1.91}   | ${62} | ${false}              | ${2471}    | ${0}
      ${1.91}        | ${2}      | ${62} | ${false}              | ${2471}    | ${0}
      ${2}           | ${2}      | ${62} | ${false}              | ${2471}    | ${494.2}
      ${2}           | ${5}      | ${62} | ${false}              | ${2471}    | ${2471}
    `(
      "Ancienneté: $seniority ans, sref: $salaireRef €, age: $age, droit à la retraite: $haveRightToRetirement => une compensation de base de $expectedCompensation €",
      ({
        salaireRef,
        expectedCompensation,
        age,
        haveRightToRetirement,
        seniority,
        seniorityRight,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
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
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salaireRef,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(missingArgs).toEqual([]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );
  });
  describe("Calcul de l'indemnité de licenciement pour un Ouvrier en Incapacité définitive à la conduite", () => {
    test.each`
      seniorityRight | seniority | salaireRef | expectedCompensation
      ${2.75}        | ${2.75}   | ${2523}    | ${0}
      ${2.99}        | ${2.99}   | ${2523}    | ${0}
      ${2.99}        | ${3}      | ${2523}    | ${0}
      ${3}           | ${3}      | ${2523}    | ${5046}
      ${3}           | ${4.91}   | ${2523}    | ${5046}
      ${3}           | ${5}      | ${2523}    | ${7569}
      ${3}           | ${10}     | ${2523}    | ${10092}
      ${3}           | ${13}     | ${2523}    | ${10092}
      ${3}           | ${15}     | ${2523}    | ${12615}
      ${3}           | ${20}     | ${2523}    | ${15138}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € et un age de $age => une compensation de base de $expectedCompensation €",
      ({ salaireRef, expectedCompensation, seniority, seniorityRight }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0016'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
              "'Ouvriers'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite":
              "'Oui'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite définitive":
              "'Oui'",

            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salaireRef,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(missingArgs).toEqual([]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );
  });
  describe("Calcul de l'indemnité de licenciement pour un Ouvrier en Incapacité temporaire à la conduite", () => {
    test.each`
      seniorityRight | seniority | salaireRef | expectedCompensation
      ${2.75}        | ${2.75}   | ${2600}    | ${0}
      ${3}           | ${4}      | ${2600}    | ${0}
      ${3.01}        | ${3.01}   | ${2600}    | ${2600}
      ${3.01}        | ${4}      | ${2600}    | ${2600}
      ${3.01}        | ${12}     | ${2600}    | ${2600}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € et un age de $age => une compensation de base de $expectedCompensation €",
      ({ salaireRef, expectedCompensation, seniority, seniorityRight }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0016'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
              "'Ouvriers'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite":
              "'Oui'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite définitive":
              "'Non'",

            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salaireRef,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(missingArgs).toEqual([]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );
  });
  describe("Calcul de l'indemnité de licenciement pour un Ouvrier en Autres licenciements", () => {
    test.each`
      seniorityRight | seniority | salaireRef | haveRightToRetirement | age   | expectedCompensation
      ${1}           | ${1}      | ${2516}    | ${false}              | ${56} | ${0}
      ${1.99}        | ${1.99}   | ${2516}    | ${false}              | ${56} | ${0}
      ${1.99}        | ${2}      | ${2516}    | ${false}              | ${56} | ${0}
      ${2}           | ${2}      | ${2516}    | ${false}              | ${56} | ${503.2}
      ${2}           | ${2.5}    | ${2516}    | ${false}              | ${56} | ${629}
      ${2}           | ${3}      | ${2516}    | ${false}              | ${56} | ${1509.6}
      ${1}           | ${1}      | ${2516}    | ${true}               | ${60} | ${0}
      ${1}           | ${2}      | ${2516}    | ${true}               | ${60} | ${0}
      ${2}           | ${2}      | ${2516}    | ${true}               | ${62} | ${503.2}
      ${2}           | ${2.5}    | ${2516}    | ${true}               | ${62} | ${629}
      ${2}           | ${3}      | ${2516}    | ${true}               | ${62} | ${905.76}
      ${2}           | ${3}      | ${2516}    | ${false}              | ${62} | ${1509.6}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef €, droit à la retraite: $haveRightToRetirement et un age de $age => une compensation de base de $expectedCompensation €",
      ({
        salaireRef,
        expectedCompensation,
        age,
        haveRightToRetirement,
        seniority,
        seniorityRight,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
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

            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salaireRef,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(missingArgs).toEqual([]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );
  });
});
