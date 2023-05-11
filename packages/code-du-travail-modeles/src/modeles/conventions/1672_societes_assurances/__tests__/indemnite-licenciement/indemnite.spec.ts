import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1672"
);

describe("CC 1672", () => {
  describe("Calcul de l'indemnité de licenciement pour un non cadre", () => {
    test.each`
      seniorityRight | seniority | age   | salaireRef | expectedCompensation
      ${3}           | ${3}      | ${49} | ${32376}   | ${0}
      ${8}           | ${8}      | ${49} | ${32376}   | ${6475.2}
      ${10}          | ${10}     | ${49} | ${32376}   | ${9712.8}
      ${20}          | ${20}     | ${49} | ${32376}   | ${22663.2}
      ${30}          | ${30}     | ${49} | ${32376}   | ${38851.2}
      ${3}           | ${3}      | ${52} | ${32376}   | ${0}
      ${8}           | ${8}      | ${52} | ${32376}   | ${7770.24}
      ${10}          | ${10}     | ${52} | ${32376}   | ${11331.6}
      ${20}          | ${20}     | ${52} | ${32376}   | ${25900.8}
      ${30}          | ${30}     | ${52} | ${32376}   | ${43707.6}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € et un age de $age => une compensation de base de $expectedCompensation €",
      ({
        seniorityRight,
        salaireRef,
        expectedCompensation,
        age,
        seniority,
      }) => {
        const { missingArgs, result } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1672'",
            "contrat salarié . convention collective . sociétés d'assurances . age":
              age,
            "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
              "'Non-cadres (Classes 1 à 4)'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salaireRef,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );

        expect(missingArgs).toEqual([]);
        expect(result.value).toEqual(expectedCompensation);
        expect(result.unit?.numerators).toEqual(["€"]);
      }
    );
  });

  describe("Calcul de l'indemnité de licenciement pour un cadre", () => {
    test.each`
      seniorityRight | seniority | seniorityNonCadre | age   | salaireRef | expectedCompensation
      ${3}           | ${3}      | ${0}              | ${49} | ${32376}   | ${0}
      ${8}           | ${8}      | ${0}              | ${49} | ${32376}   | ${10360.32}
      ${10}          | ${10}     | ${0}              | ${49} | ${32376}   | ${14569.2}
      ${20}          | ${20}     | ${0}              | ${49} | ${32376}   | ${32376}
      ${30}          | ${30}     | ${0}              | ${49} | ${32376}   | ${53420.4}
      ${3}           | ${3}      | ${0}              | ${52} | ${32376}   | ${0}
      ${8}           | ${8}      | ${0}              | ${52} | ${32376}   | ${12302.88}
      ${10}          | ${10}     | ${0}              | ${52} | ${32376}   | ${16997.4}
      ${20}          | ${20}     | ${0}              | ${52} | ${32376}   | ${37232.4}
      ${30}          | ${30}     | ${0}              | ${52} | ${32376}   | ${60705}
      ${8}           | ${7}      | ${1}              | ${49} | ${32376}   | ${9874.68}
      ${10}          | ${7}      | ${3}              | ${49} | ${32376}   | ${11493.48}
      ${20}          | ${10}     | ${10}             | ${49} | ${32376}   | ${24282}
      ${29}          | ${9}      | ${20}             | ${49} | ${32376}   | ${34318.56}
      ${30}          | ${25}     | ${5}              | ${49} | ${32376}   | ${44517}
      ${8}           | ${7}      | ${1}              | ${52} | ${32376}   | ${11736.3}
      ${10}          | ${7}      | ${3}              | ${52} | ${32376}   | ${13678.86}
      ${20}          | ${10}     | ${10}             | ${52} | ${32376}   | ${28329}
      ${29}          | ${9}      | ${20}             | ${52} | ${32376}   | ${39741.54}
      ${30}          | ${25}     | ${5}              | ${52} | ${32376}   | ${51396.9}
    `(
      "Avec une ancienneté $seniority ans (cadres), $seniorityNonCadre ans (non cadres), un salaire de référence $salaireRef € et un age de $age => une compensation de base de $expectedCompensation €",
      ({
        seniorityRight,
        seniorityNonCadre,
        salaireRef,
        expectedCompensation,
        age,
        seniority,
      }) => {
        const dateCadre =
          seniorityNonCadre > 0
            ? {
                "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . date du statut cadre":
                  "01/01/2010",
              }
            : {};
        const situation = {
          "contrat salarié . convention collective": "'IDCC1672'",
          "contrat salarié . convention collective . sociétés d'assurances . age":
            age,
          "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
            "'Cadres (Classes 5 à 7)'",
          "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . ancienneté non cadre":
            seniorityNonCadre,
          "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . avant non cadres": `${
            seniorityNonCadre > 0 ? "'Oui'" : "'Non'"
          }`,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniorityRight,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salaireRef,
          ...dateCadre,
        };
        const { missingArgs, result } = engine.setSituation(
          situation,
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );

        expect(missingArgs).toEqual([]);
        expect(result.value).toEqual(expectedCompensation);
        expect(result.unit?.numerators).toEqual(["€"]);
      }
    );
  });
});
