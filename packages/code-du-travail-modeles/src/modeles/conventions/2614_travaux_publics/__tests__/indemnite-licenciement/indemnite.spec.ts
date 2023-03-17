import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2614"
);

describe("CC 2614", () => {
  describe("Calcul de l'indemnité de licenciement", () => {
    test.each`
      seniority | salaireRef | age      | expectedCompensation
      ${0}      | ${3000}    | ${0}     | ${0}
      ${7 / 12} | ${3000}    | ${0}     | ${0}
      ${8 / 12} | ${3000}    | ${500}   | ${0}
      ${2}      | ${3000}    | ${1500}  | ${0}
      ${12}     | ${3000}    | ${9900}  | ${0}
      ${15}     | ${1600}    | ${7200}  | ${0}
      ${42}     | ${3000}    | ${45900} | ${0}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef €, age $age => une compensation de base de $expectedCompensation €",
      ({ salaireRef, expectedCompensation, seniority, age }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC2614'",
            "contrat salarié . convention collective . travaux publics . age":
              age,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniority,
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
});
