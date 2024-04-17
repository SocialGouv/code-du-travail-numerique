import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1979"
);

describe("Indemnité conventionnel de licenciement pour la CC 1979", () => {
  test.each`
    seniorityRight | seniority | salary  | expectedCompensation
    ${0}           | ${0}      | ${2000} | ${0}
    ${1}           | ${1}      | ${2000} | ${0}
    ${1.99}        | ${2}      | ${2000} | ${0}
    ${2}           | ${2}      | ${2000} | ${400}
    ${2}           | ${5}      | ${2000} | ${1000}
    ${2}           | ${8}      | ${2000} | ${1600}
    ${2}           | ${15}     | ${2000} | ${3666.67}
    ${2}           | ${2}      | ${1400} | ${280}
    ${2}           | ${10}     | ${2400} | ${2400}
    ${2}           | ${11}     | ${2350} | ${2741.67}
  `(
    "ancienneté: $seniority an, salaire de référence: $salary, => $expectedCompensation €",
    ({ seniority, seniorityRight, salary, expectedCompensation }) => {
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC1979'",
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
