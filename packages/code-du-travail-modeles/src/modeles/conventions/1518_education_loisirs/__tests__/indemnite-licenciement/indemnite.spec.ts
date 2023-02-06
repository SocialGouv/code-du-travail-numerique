import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1518"
);

describe("CC 1518", () => {
  describe("Calcul de l'indemnité de licenciement", () => {
    test.each`
      seniority     | salaireRef | expectedCompensation
      ${7 / 12}     | ${2500}    | ${0}
      ${8 / 12}     | ${2500}    | ${416.67}
      ${9 / 12}     | ${2500}    | ${468.75}
      ${1}          | ${2500}    | ${625}
      ${0.75}       | ${2500}    | ${468.75}
      ${2 - 1 / 12} | ${2500}    | ${1197.92}
      ${8}          | ${2500}    | ${5000}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
      ({ salaireRef, expectedCompensation, seniority }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1518'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année": seniority,
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
