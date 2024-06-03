import RuptureConventionnellePublicodes from "../../../../publicodes/RuptureConventionnellePublicodes";

const engine = new RuptureConventionnellePublicodes(modelsRuptureConventionnel);

describe("Indemnité légale de licenciement avec une formule personnalisée et expliquée", () => {
  test.each`
    seniority | expectedFormula                            | expectedExplanations
    ${1 / 12} | ${"1/4 * Sref * A"}                        | ${["A : Ancienneté totale (≈ 0.08 an : valeur arrondie)", "Sref : Salaire de référence (1000 €)"]}
    ${7 / 12} | ${"1/4 * Sref * A"}                        | ${["A : Ancienneté totale (≈ 0.58 an : valeur arrondie)", "Sref : Salaire de référence (1000 €)"]}
    ${8 / 12} | ${"1/4 * Sref * A"}                        | ${["A : Ancienneté totale (≈ 0.67 an : valeur arrondie)", "Sref : Salaire de référence (1000 €)"]}
    ${7}      | ${"1/4 * Sref * A"}                        | ${["A : Ancienneté totale (7 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${10}     | ${"1/4 * Sref * A"}                        | ${["A : Ancienneté totale (10 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${12}     | ${"(1/4 * Sref * A1) + (1/3 * Sref * A2)"} | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au-delà de 10 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${11.5}   | ${"(1/4 * Sref * A1) + (1/3 * Sref * A2)"} | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au-delà de 10 ans (1.5 an)", "Sref : Salaire de référence (1000 €)"]}
  `(
    "Formule $expectedFormula avec $seniority ans et inaptitude $isForInaptitude",
    ({ seniority, expectedFormula, expectedExplanations }) => {
      engine.setSituation({
        "contrat salarié . indemnité de licenciement . ancienneté en année":
          seniority,
        "contrat salarié . indemnité de licenciement . ancienneté requise en année":
          seniority,
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        "contrat salarié . indemnité de licenciement . salaire de référence":
          "1000",
      });

      const result = engine.getFormule();

      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
