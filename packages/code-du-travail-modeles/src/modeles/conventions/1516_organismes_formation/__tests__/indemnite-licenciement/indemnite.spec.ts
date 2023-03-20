import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1516"
);

describe("Indemnité conventionnel de licenciement pour la CC 1516", () => {
  test.each`
    seniorityRight | seniority  | salary  | expectedCompensation
    ${0}           | ${0}       | ${0}    | ${0}
    ${18 / 12}     | ${18 / 12} | ${3037} | ${0}
    ${2}           | ${2}       | ${3037} | ${0}
    ${2}           | ${2.1}     | ${3037} | ${0}
    ${2.1}         | ${2.1}     | ${3037} | ${1275.54}
    ${23}          | ${23}      | ${3037} | ${16399.8}
    ${26}          | ${26}      | ${3037} | ${18222}
    ${42}          | ${42}      | ${3037} | ${18222}
  `(
    "ancienneté: $seniority an, ancienneté requise: $seniorityRight an, salaire de référence: $salary, => $expectedCompensation €",
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
