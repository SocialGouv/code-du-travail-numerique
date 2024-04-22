import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1516"
);

describe("Indemnité conventionnel de licenciement pour la CC 1516", () => {
  describe("Date de notification avant le 04/06/2023", () => {
    test.each`
      seniorityRight | seniority  | salary  | expectedCompensation
      ${18 / 12}     | ${18 / 12} | ${3037} | ${0}
      ${23 / 24}     | ${2}       | ${3037} | ${0}
      ${23 / 24}     | ${25 / 12} | ${3037} | ${0}
      ${2}           | ${25 / 12} | ${3037} | ${1265.42}
      ${2}           | ${23}      | ${3037} | ${16399.8}
      ${2}           | ${26}      | ${3037} | ${18222}
      ${2}           | ${42}      | ${3037} | ${18222}
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
            "contrat salarié . indemnité de licenciement . date de notification":
              "01/12/2022",
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

  describe("Date de notification après le 04/06/2023", () => {
    test.each`
      seniorityRight | seniority | salary  | expectedCompensation
      ${7 / 12}      | ${7 / 12} | ${3000} | ${0}
      ${7 / 12}      | ${1}      | ${3000} | ${0}
      ${8 / 12}      | ${8 / 12} | ${3000} | ${500}
      ${8 / 12}      | ${2}      | ${3000} | ${1500}
      ${8 / 12}      | ${12}     | ${3000} | ${9500}
      ${8 / 12}      | ${42}     | ${3000} | ${39500}
      ${25 / 12}     | ${42}     | ${3000} | ${39500}
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
            "contrat salarié . indemnité de licenciement . date de notification":
              "05/06/2023",
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
