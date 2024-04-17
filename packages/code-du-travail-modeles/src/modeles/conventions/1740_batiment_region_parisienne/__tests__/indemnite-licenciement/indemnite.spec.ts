import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1740"
);

describe("CC 1740", () => {
  describe("Calcul de l'indemnité de licenciement", () => {
    test.each`
      seniorityRight | seniority | age   | salaireRef | expectedCompensation
      ${1}           | ${1}      | ${54} | ${2500}    | ${0}
      ${1.99}        | ${2}      | ${54} | ${2500}    | ${0}
      ${2}           | ${2}      | ${54} | ${2500}    | ${500}
      ${2}           | ${5}      | ${54} | ${2500}    | ${1250}
      ${2}           | ${8}      | ${54} | ${2500}    | ${3000}
      ${2}           | ${15}     | ${54} | ${2500}    | ${5625}
      ${2}           | ${26}     | ${54} | ${2500}    | ${11125}
      ${1}           | ${1}      | ${59} | ${2500}    | ${0}
      ${1.99}        | ${2}      | ${59} | ${2500}    | ${0}
      ${2}           | ${2}      | ${59} | ${2500}    | ${550}
      ${2}           | ${5}      | ${59} | ${2500}    | ${1375}
      ${2}           | ${8}      | ${59} | ${2500}    | ${3300}
      ${2}           | ${15}     | ${59} | ${2500}    | ${6187.5}
      ${2}           | ${26}     | ${59} | ${2500}    | ${12237.5}
    `(
      "Avec une ancienneté $seniority ans, age: $age, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
      ({
        age,
        salaireRef,
        expectedCompensation,
        seniority,
        seniorityRight,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1740'",
            "contrat salarié . convention collective . ouvriers bâtiment région parisienne . age":
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
        expect(result?.unit?.numerators).toEqual(["€"]);
        expect(missingArgs).toEqual([]);
        expect(result?.value).toEqual(expectedCompensation);
      }
    );
  });
});
