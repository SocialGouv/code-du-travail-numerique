import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1147"
);

describe("CC 1147", () => {
  describe("Calcul de l'indemnité de licenciement", () => {
    test.each`
      seniority | salaireRef | expectedCompensation
      ${0.67}   | ${3000}    | ${0}
      ${1}      | ${3000}    | ${0}
      ${1.08}   | ${3000}    | ${648}
      ${10}     | ${3000}    | ${6000}
      ${11}     | ${3000}    | ${7000}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
      ({ salaireRef, expectedCompensation, seniority }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1147'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniority,
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
