import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "86"
);

describe("Indemnité conventionnel de licenciement pour la CC 86", () => {
  test.each`
    seniority | seniorityRight | salary  | expectedCompensation
    ${1.91}   | ${1.5}         | ${2420} | ${0}
    ${2}      | ${1.95}        | ${2420} | ${0}
    ${2}      | ${2}           | ${2420} | ${1597.2}
    ${15}     | ${2}           | ${2420} | ${11979}
    ${20}     | ${2}           | ${2420} | ${16819}
  `(
    "Avec $seniority ans, et sref : $salary => $expectedCompensation €",
    ({ seniority, salary, expectedCompensation, seniorityRight }) => {
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC0086'",
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
