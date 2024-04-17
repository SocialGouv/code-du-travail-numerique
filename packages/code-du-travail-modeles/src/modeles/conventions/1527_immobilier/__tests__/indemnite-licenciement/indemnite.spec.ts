import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1527"
);

describe("CC 1527", () => {
  describe("Calcul de l'indemnité de licenciement", () => {
    test.each`
      seniorityRight | seniority      | salaireRef           | expectedCompensation
      ${7 / 12}      | ${7 / 12}      | ${1911.076923076923} | ${0}
      ${7 / 12}      | ${8 / 12}      | ${1911.076923076923} | ${0}
      ${8 / 12}      | ${8 / 12}      | ${1911.076923076923} | ${318.51}
      ${8 / 12}      | ${11}          | ${1911.076923076923} | ${5414.72}
      ${8 / 12}      | ${12 - 1 / 12} | ${1911.076923076923} | ${5998.66}
      ${8 / 12}      | ${13 - 2 / 12} | ${1990}              | ${6854.44}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
      ({ salaireRef, expectedCompensation, seniority, seniorityRight }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1527'",
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
