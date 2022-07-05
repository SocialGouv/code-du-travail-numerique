import Engine from "publicodes";

import { mergeModels } from "../../../internal/merger";

const engine = new Engine(mergeModels());

describe("CC 2511", () => {
  describe("Calcul de l'indemnité de licenciement", () => {
    test.each`
      seniority | salaireRef | inaptitude | expectedCompensation
      ${42}     | ${3000}    | ${"non"}   | ${39500}
      ${0}      | ${3000}    | ${"non"}   | ${0}
      ${2}      | ${3000}    | ${"non"}   | ${1500}
      ${2}      | ${3000}    | ${"oui"}   | ${1500}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
      ({ salaireRef, expectedCompensation, seniority, inaptitude }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC2511'",
            "contrat salarié . convention collective . sport . ancienneté en année":
              seniority,
            "contrat salarié . inaptitude suite à un accident ou maladie professionnelle":
              inaptitude,
            "contrat salarié . salaire de référence conventionnel": salaireRef,
            "indemnité de licenciement": "oui",
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement conventionnel"
          );
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.missingVariables).toEqual({});
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });
});
