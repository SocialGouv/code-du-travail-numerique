import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1351"
);

describe("CC 1351", () => {
  describe("Calcul de l'indemnité de licenciement", () => {
    test.each`
      seniorityRight | seniority | salaireRef | expectedCompensation
      ${0.5}         | ${0.5}    | ${3000}    | ${0}
      ${7 / 12}      | ${8 / 12} | ${1600}    | ${0}
      ${8 / 12}      | ${8 / 12} | ${1600}    | ${0}
      ${8 / 12}      | ${23}     | ${1600}    | ${0}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
      ({ salaireRef, expectedCompensation, seniority, seniorityRight }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1351'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salaireRef,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result?.unit?.numerators).toEqual(["€"]);
        expect(missingArgs).toEqual([]);
        expect(result?.value).toEqual(expectedCompensation);
      }
    );
  });
});
