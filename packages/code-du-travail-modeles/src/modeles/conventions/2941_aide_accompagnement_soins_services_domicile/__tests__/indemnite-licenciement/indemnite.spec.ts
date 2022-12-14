import Engine from "publicodes";

import modeles from "../../../../../../src/__test__/output/modeles-indemnite-licenciement.json";

const engine = new Engine(modeles as any);

describe("CC 2941", () => {
  describe("Calcul de l'indemnité de licenciement", () => {
    test.each`
      seniority        | salaireRef | expectedCompensation
      ${0.66}          | ${2600}    | ${0}
      ${0.75}          | ${2600}    | ${487.5}
      ${1}             | ${2600}    | ${650}
      ${1 - 1 / 12}    | ${2600}    | ${595.83}
      ${13 - 2.5 / 12} | ${2600}    | ${8919.44}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
      ({ salaireRef, expectedCompensation, seniority }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC2941'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salaireRef,
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.missingVariables).toEqual({});
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });
});
