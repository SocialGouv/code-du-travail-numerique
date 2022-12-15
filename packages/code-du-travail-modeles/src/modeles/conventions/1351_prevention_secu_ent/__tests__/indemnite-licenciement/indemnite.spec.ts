import Engine from "publicodes";

import modeles from "../../../../../../src/modeles/modeles-indemnite-licenciement.json";

const engine = new Engine(modeles as any);

describe("CC 1351", () => {
  describe("Calcul de l'indemnité de licenciement", () => {
    test.each`
      seniority | salaireRef | expectedCompensation
      ${0.5}    | ${3000}    | ${0}
      ${0.67}   | ${1600}    | ${0}
      ${23}     | ${1600}    | ${0}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
      ({ salaireRef, expectedCompensation, seniority }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC1351'",
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
