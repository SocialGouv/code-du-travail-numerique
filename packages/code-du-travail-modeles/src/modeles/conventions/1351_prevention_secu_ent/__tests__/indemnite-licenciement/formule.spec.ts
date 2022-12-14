import SingletonEnginePublicodes from "../../../../../internal/SingletonEngine";
import { getFormule } from "../../../../common";

const engine = SingletonEnginePublicodes.getInstance();

describe("Formule indemnité licenciement - 1351", () => {
  test.each`
    seniority | expectedFormula | expectedExplanations
    ${7 / 12} | ${""}           | ${[]}
    ${8 / 12} | ${""}           | ${[]}
    ${7}      | ${""}           | ${[]}
    ${10}     | ${""}           | ${[]}
    ${11}     | ${""}           | ${[]}
    ${12}     | ${""}           | ${[]}
  `(
    "Formule $expectedFormula avec $seniority ans",
    ({ seniority, expectedFormula, expectedExplanations }) => {
      const situation = engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1351'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
        "contrat salarié . indemnité de licenciement . ancienneté en année": seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence": 1000,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
      });
      const result = getFormule(situation);

      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
