import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1505"
);

describe("Calcul de l'indemnité de licenciement CC 1505", () => {
  describe("Licenciement pour inaptitude non professionnelle", () => {
    test.each`
      seniority | expectedCompensation
      ${6 / 12} | ${0}
      ${0.67}   | ${435.5}
      ${6}      | ${3900}
      ${11}     | ${7366.67}
      ${20}     | ${15166.67}
    `(
      "Avec une ancienneté $seniority ans et salaire de ref 2600€ => une compensation de base de $expectedCompensation €",
      ({ expectedCompensation, seniority }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1505'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              "2600",
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );

        expect(missingArgs).toEqual([]);
        expect(result.value).toEqual(expectedCompensation);
        expect(result.unit?.numerators).toEqual(["€"]);
      }
    );
  });
});
