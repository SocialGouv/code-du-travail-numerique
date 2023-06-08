import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1483"
);

describe("Indemnité conventionnel de licenciement pour la CC 1483", () => {
  describe("Pour un non-cadres", () => {
    test.each`
      seniorityRight | seniority | salary  | expectedCompensation
      ${1}           | ${0}      | ${2331} | ${0}
      ${1}           | ${1}      | ${2331} | ${0}
      ${1.01}        | ${8}      | ${2331} | ${3729.6}
      ${1.01}        | ${10}     | ${2331} | ${4662}
      ${1.01}        | ${18}     | ${2450} | ${11433.33}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary => $expectedCompensation €",
      ({ seniority, seniorityRight, salary, expectedCompensation }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1483'",
            "contrat salarié . convention collective . habillement textiles commerce de detail . catégorie professionnelle": `'Non-cadres'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(missingArgs).toEqual([]);
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );
  });

  describe("Pour un cadres", () => {
    test.each`
      age   | seniorityRight | seniority | salary  | expectedCompensation
      ${49} | ${1}           | ${0}      | ${3040} | ${0}
      ${49} | ${1}           | ${1}      | ${3040} | ${0}
      ${49} | ${1.01}        | ${2}      | ${3040} | ${1216}
      ${49} | ${1.01}        | ${5}      | ${3040} | ${3800}
      ${49} | ${1.01}        | ${17}     | ${3098} | ${13424.67}
      ${51} | ${1}           | ${1}      | ${3040} | ${0}
      ${51} | ${1.01}        | ${2}      | ${3040} | ${1216}
      ${51} | ${1.01}        | ${5}      | ${3040} | ${3800}
      ${51} | ${1.01}        | ${17}     | ${3098} | ${16780.83}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, age $age => $expectedCompensation €",
      ({ seniority, seniorityRight, salary, expectedCompensation, age }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1483'",
            "contrat salarié . convention collective . habillement textiles commerce de detail . age":
              age,
            "contrat salarié . convention collective . habillement textiles commerce de detail . catégorie professionnelle": `'Cadres'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(missingArgs).toEqual([]);
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );
  });
});
