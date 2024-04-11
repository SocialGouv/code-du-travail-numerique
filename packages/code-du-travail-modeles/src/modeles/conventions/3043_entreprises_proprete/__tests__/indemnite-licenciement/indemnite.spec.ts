import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "3043"
);

describe("Indemnité conventionnel de licenciement pour la CC 3043", () => {
  test.each`
    seniorityRight | seniority | salary  | expectedCompensation
    ${0}           | ${3}      | ${2000} | ${0}
    ${1}           | ${3}      | ${2000} | ${0}
    ${1.91}        | ${3}      | ${2000} | ${0}
    ${2}           | ${3}      | ${2000} | ${0}
    ${25 / 12}     | ${2.08}   | ${2000} | ${416}
    ${25 / 12}     | ${5}      | ${2000} | ${1000}
    ${25 / 12}     | ${5.91}   | ${2000} | ${1182}
    ${25 / 12}     | ${6}      | ${2000} | ${1333.33}
    ${25 / 12}     | ${9.91}   | ${2000} | ${2636.67}
    ${25 / 12}     | ${12}     | ${2000} | ${3466.67}
  `(
    "ancienneté: $seniority an, salaire de référence: $salary, => $expectedCompensation €",
    ({ seniority, seniorityRight, salary, expectedCompensation }) => {
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC3043'",
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
