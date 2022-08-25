import Engine from "publicodes";

import { mergeModels } from "../../../internal/merger";

const engine = new Engine(mergeModels());

describe("CC 2941", () => {
  describe("Calcul de l'indemnité de licenciement", () => {
    test.each`
      seniority        | salaireRef | expectedCompensation
      ${0.75}          | ${2600}    | ${0}
      ${1}             | ${2600}    | ${520}
      ${0.91}          | ${2600}    | ${0}
      ${13 - 2.5 / 12} | ${2600}    | ${6167.78}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
      ({ salaireRef, expectedCompensation, seniority }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC2941'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salaireRef,
            "indemnité de licenciement": "oui",
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
