import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1090"
);

describe("Indemnité conventionnel de licenciement pour la CC 1090", () => {
  test.each`
    seniorityRight | seniority | salary  | expectedCompensation
    ${0}           | ${0}      | ${2000} | ${0}
    ${7 / 12}      | ${7 / 12} | ${2000} | ${0}
    ${7 / 12}      | ${1}      | ${2000} | ${0}
    ${8 / 12}      | ${8 / 12} | ${2000} | ${333.33}
    ${8 / 12}      | ${9 / 12} | ${2000} | ${375}
    ${8 / 12}      | ${1}      | ${2000} | ${500}
    ${8 / 12}      | ${1.91}   | ${2000} | ${955}
    ${8 / 12}      | ${2}      | ${2000} | ${1000}
    ${8 / 12}      | ${2.08}   | ${2000} | ${1040}
    ${8 / 12}      | ${5}      | ${2000} | ${2500}
    ${8 / 12}      | ${0.67}   | ${2000} | ${335}
    ${8 / 12}      | ${1.08}   | ${2000} | ${540}
    ${8 / 12}      | ${8}      | ${2000} | ${4000}
    ${8 / 12}      | ${15}     | ${2000} | ${8333.33}
  `(
    "ancienneté: $seniority an, salaire de référence: $salary, => $expectedCompensation €",
    ({ seniority, seniorityRight, salary, expectedCompensation }) => {
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC1090'",
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
