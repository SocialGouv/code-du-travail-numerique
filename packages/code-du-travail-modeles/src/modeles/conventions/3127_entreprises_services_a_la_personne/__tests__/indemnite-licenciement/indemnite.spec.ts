import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "3127"
);

describe("Calcul de l'indemnité de licenciement - CC 3127", () => {
  test.each`
    seniorityRight | seniority  | salaireRef | expectedCompensation
    ${11 / 12}     | ${1}       | ${2600}    | ${0}
    ${1}           | ${1}       | ${2600}    | ${520}
    ${1}           | ${13 / 12} | ${2600}    | ${563.33}
    ${1}           | ${13}      | ${2600}    | ${7800}
  `(
    "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
    ({ salaireRef, expectedCompensation, seniority, seniorityRight }) => {
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC3127'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniorityRight,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salaireRef,
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
      expect(result.unit?.numerators).toEqual(["€"]);
      expect(missingArgs).toEqual([]);
      expect(result.value).toEqual(expectedCompensation);
    }
  );
});
