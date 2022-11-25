import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../../../internal/merger";

const engine = new Engine(mergeIndemniteLicenciementModels());

describe("CC 2609", () => {
  describe("Calcul de l'indemnité de licenciement", () => {
    test.each`
      seniority | age   | salaireRef | expectedCompensation
      ${1.75}   | ${50} | ${2450}    | ${0}
      ${4}      | ${50} | ${2450}    | ${2450}
      ${15}     | ${50} | ${2450}    | ${9187.5}
      ${25}     | ${50} | ${2450}    | ${17762.5}
      ${35}     | ${54} | ${2450}    | ${24500}
      ${1.75}   | ${58} | ${2450}    | ${0}
      ${4}      | ${58} | ${2450}    | ${2695}
      ${15}     | ${58} | ${2450}    | ${10106.25}
      ${25}     | ${58} | ${2450}    | ${19538.75}
      ${1.75}   | ${66} | ${2450}    | ${0}
      ${4}      | ${66} | ${2450}    | ${1470}
      ${15}     | ${66} | ${2450}    | ${6737.5}
      ${25}     | ${66} | ${2450}    | ${12862.5}
      ${50}     | ${66} | ${2450}    | ${19600}
    `(
      "Avec une ancienneté $seniority ans (plus $seniorityEmployeTAM en tant que non cadre), droit de retraite: $haveRightToRetirement, un salaire de référence $salaireRef € et un age de $age => une compensation de base de $expectedCompensation €",
      ({ salaireRef, expectedCompensation, age, seniority }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC2609'",
            "contrat salarié . convention collective . batiment etam . indemnité de licenciement . age":
              age,
            "contrat salarié . indemnité de licenciement": "oui",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salaireRef,
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );

        expect(result.missingVariables).toEqual({});
        expect(result.nodeValue).toEqual(expectedCompensation);
        expect(result.unit?.numerators).toEqual(["€"]);
      }
    );
  });

  describe("Calcul de l'indemnité de licenciement pour une personne ayant 55 ans", () => {
    test.each`
      seniority | moreThan55 | salaireRef | expectedCompensation
      ${1.75}   | ${"Non"}   | ${2450}    | ${0}
      ${4}      | ${"Non"}   | ${2450}    | ${2450}
      ${15}     | ${"Non"}   | ${2450}    | ${9187.5}
      ${25}     | ${"Non"}   | ${2450}    | ${17762.5}
      ${1.75}   | ${"Oui"}   | ${2450}    | ${0}
      ${4}      | ${"Oui"}   | ${2450}    | ${2695}
      ${15}     | ${"Oui"}   | ${2450}    | ${10106.25}
      ${25}     | ${"Oui"}   | ${2450}    | ${19538.75}
    `(
      "Avec une ancienneté $seniority ans (plus $seniorityEmployeTAM en tant que non cadre), droit de retraite: $haveRightToRetirement, un salaire de référence $salaireRef € et un age de $age => une compensation de base de $expectedCompensation €",
      ({ salaireRef, expectedCompensation, moreThan55, seniority }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC2609'",
            "contrat salarié . convention collective . batiment etam . indemnité de licenciement . age": 55,
            "contrat salarié . convention collective . batiment etam . indemnité de licenciement . plus de 55 ans avant la fin de son préavis": `'${moreThan55}'`,
            "contrat salarié . indemnité de licenciement": "oui",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salaireRef,
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );

        expect(result.missingVariables).toEqual({});
        expect(result.nodeValue).toEqual(expectedCompensation);
        expect(result.unit?.numerators).toEqual(["€"]);
      }
    );
  });
});
