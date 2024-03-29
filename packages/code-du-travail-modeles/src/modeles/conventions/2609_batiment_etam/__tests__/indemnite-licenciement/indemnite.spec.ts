import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2609"
);

describe("CC 2609", () => {
  describe("Calcul de l'indemnité de licenciement", () => {
    test.each`
      seniorityRight | seniority  | age   | salaireRef | expectedCompensation
      ${2}           | ${3}       | ${50} | ${2450}    | ${0}
      ${25 / 12}     | ${25 / 12} | ${50} | ${2450}    | ${1276.04}
      ${25 / 12}     | ${4}       | ${50} | ${2450}    | ${2450}
      ${25 / 12}     | ${15}      | ${50} | ${2450}    | ${9187.5}
      ${25 / 12}     | ${25}      | ${50} | ${2450}    | ${17762.5}
      ${25 / 12}     | ${35}      | ${54} | ${2450}    | ${24500}
      ${2}           | ${3}       | ${54} | ${2450}    | ${0}
      ${25 / 12}     | ${25 / 12} | ${54} | ${2450}    | ${1276.04}
      ${25 / 12}     | ${4}       | ${54} | ${2450}    | ${2450}
      ${25 / 12}     | ${15}      | ${54} | ${2450}    | ${9187.5}
      ${25 / 12}     | ${25}      | ${54} | ${2450}    | ${17762.5}
      ${2}           | ${3}       | ${55} | ${2450}    | ${0}
      ${25 / 12}     | ${25 / 12} | ${55} | ${2450}    | ${1403.64}
      ${25 / 12}     | ${4}       | ${55} | ${2450}    | ${2695}
      ${25 / 12}     | ${15}      | ${55} | ${2450}    | ${10106.25}
      ${25 / 12}     | ${25}      | ${55} | ${2450}    | ${19538.75}
      ${2}           | ${3}       | ${58} | ${2450}    | ${0}
      ${25 / 12}     | ${25 / 12} | ${58} | ${2450}    | ${1403.64}
      ${25 / 12}     | ${4}       | ${58} | ${2450}    | ${2695}
      ${25 / 12}     | ${15}      | ${58} | ${2450}    | ${10106.25}
      ${25 / 12}     | ${25}      | ${58} | ${2450}    | ${19538.75}
      ${2}           | ${3}       | ${66} | ${2450}    | ${0}
      ${25 / 12}     | ${25 / 12} | ${66} | ${2450}    | ${765.63}
      ${25 / 12}     | ${4}       | ${66} | ${2450}    | ${1470}
      ${25 / 12}     | ${15}      | ${66} | ${2450}    | ${6737.5}
      ${25 / 12}     | ${25}      | ${66} | ${2450}    | ${12862.5}
      ${25 / 12}     | ${50}      | ${66} | ${2450}    | ${19600}
    `(
      "Avec une ancienneté $seniority ans (plus $seniorityEmployeTAM en tant que non cadre), droit de retraite: $haveRightToRetirement, un salaire de référence $salaireRef € et un age de $age => une compensation de base de $expectedCompensation €",
      ({
        salaireRef,
        expectedCompensation,
        age,
        seniority,
        seniorityRight,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC2609'",
            "contrat salarié . convention collective . batiment etam . indemnité de licenciement . age à la fin de son préavis":
              age,

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
});
