import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1516"
);

describe("Indemnité conventionnel de licenciement pour la CC 1516", () => {
  test.each`
    seniorityRight | seniority  | salary  | expectedCompensation
    ${0}           | ${0}       | ${0}    | ${0}
    ${2}           | ${2}       | ${1000} | ${0}
    ${2}           | ${25 / 12} | ${1000} | ${0}
    ${25 / 12}     | ${25 / 12} | ${1000} | ${416.67}
    ${25 / 12}     | ${5}       | ${1000} | ${1000}
    ${25 / 12}     | ${10}      | ${2000} | ${4000}
    ${25 / 12}     | ${42}      | ${3000} | ${33300}
  `(
    "ancienneté: $seniority an, salaire de référence: $salary, => $expectedCompensation €",
    ({ seniority, seniorityRight, salary, expectedCompensation }) => {
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC1516'",
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
