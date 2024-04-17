import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1606"
);

describe("Indemnité conventionnel de licenciement pour la CC 1606", () => {
  test.each`
    seniorityRight | seniority | salary   | expectedCompensation
    ${0}           | ${0}      | ${31932} | ${0}
    ${11 / 12}     | ${1}      | ${31932} | ${0}
    ${1}           | ${1}      | ${31932} | ${638.64}
    ${1}           | ${2}      | ${31932} | ${1277.28}
    ${1}           | ${10}     | ${31932} | ${6386.4}
  `(
    "Non-Cadres : ancienneté: $seniority an, salaire de référence: $salary, => $expectedCompensation €",
    ({ seniority, seniorityRight, salary, expectedCompensation }) => {
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC1606'",
          "contrat salarié . convention collective . bricolage . catégorie professionnelle": `'Non-Cadres'`,
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
      expect(result?.unit?.numerators).toEqual(["€"]);
      expect(result?.value).toEqual(expectedCompensation);
    }
  );

  test.each`
    seniorityRight | seniority | salary   | age   | expectedCompensation
    ${0}           | ${0}      | ${31932} | ${38} | ${0}
    ${11 / 12}     | ${1}      | ${31932} | ${38} | ${0}
    ${1}           | ${1}      | ${31932} | ${38} | ${638.64}
    ${1}           | ${2}      | ${31932} | ${38} | ${1277.28}
    ${1}           | ${2}      | ${31932} | ${50} | ${1915.92}
    ${1}           | ${10}     | ${31932} | ${38} | ${6386.4}
    ${1}           | ${10}     | ${31932} | ${50} | ${9579.6}
  `(
    "Cadres : ancienneté: $seniority an, salaire de référence: $salary, age : $age => $expectedCompensation €",
    ({ seniority, seniorityRight, salary, age, expectedCompensation }) => {
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC1606'",
          "contrat salarié . convention collective . bricolage . catégorie professionnelle": `'Cadres'`,
          "contrat salarié . convention collective . bricolage . indemnité de licenciement . cadres . age":
            age,
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
      expect(result?.unit?.numerators).toEqual(["€"]);
      expect(result?.value).toEqual(expectedCompensation);
    }
  );
});
