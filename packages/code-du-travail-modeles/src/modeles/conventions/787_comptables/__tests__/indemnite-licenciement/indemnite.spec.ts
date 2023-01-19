import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "787"
);

describe("CC 787", () => {
  describe("Calcul de l'indemnité de licenciement", () => {
    test.each`
      seniority | salaireRef | expectedCompensation
      ${7 / 12} | ${3000}    | ${0}
      ${8 / 12} | ${3000}    | ${500}
      ${2}      | ${3000}    | ${1500}
      ${12}     | ${3000}    | ${9500}
      ${42}     | ${3000}    | ${39500}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
      ({ salaireRef, expectedCompensation, seniority }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0787'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . ancienneté requise en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salaireRef,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(missingArgs).toEqual([]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );
  });
});
