import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1043"
);

describe("Formule indemnité licenciement - CC 1043", () => {
  test.each([
    {
      expectedExplanations: [],
      expectedFormula: "",
      seniority: 1,
    },
    {
      expectedExplanations: [
        "A : Ancienneté totale (7 ans)",
        "Sref : Salaire de référence (1000 €)",
      ],
      expectedFormula: "1/5 * Sref * A",
      seniority: 7,
    },
    {
      expectedExplanations: [
        "A1 : Ancienneté totale (19 ans)",
        "A2 : Ancienneté au-delà de 7 ans (12 ans)",
        "Sref : Salaire de référence (1000 €)",
      ],
      expectedFormula: "(1/5 * Sref * A1) + (2/15 * Sref * A2)",
      seniority: 19,
    },
    {
      expectedExplanations: [
        "A1 : Ancienneté totale (27 ans)",
        "A2 : Ancienneté au-delà de 7 ans (20 ans)",
        "A3 : Ancienneté au-delà de 19 ans (8 ans)",
        "Sref : Salaire de référence (1000 €)",
      ],
      expectedFormula:
        "(1/5 * Sref * A1) + (2/15 * Sref * A2) + (1/10 * Sref * A3)",
      seniority: 27,
    },
  ])(
    "Formule $expectedFormula avec une ancienneté de $seniority ans",
    ({ seniority, expectedFormula, expectedExplanations }) => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1043'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          seniority.toString(),
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          seniority.toString(),
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "1000",
      });
      const result = engine.getFormule();
      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
