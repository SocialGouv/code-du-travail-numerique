import { IndemniteRetraitePublicodes } from "../../../../publicodes";

describe("Formule affichée pour l'indemnité de départ ou de mise à la retraite", () => {
  test.each`
    seniority | miseALaRetraite | expectedFormula                            | expectedExplanations
    ${8 / 12} | ${"oui"}        | ${"1/4 * Sref * A"}                        | ${["A : Ancienneté totale (≈ 0.67 an : valeur arrondie)", "Sref : Salaire de référence (1000 €)"]}
    ${7}      | ${"oui"}        | ${"1/4 * Sref * A"}                        | ${["A : Ancienneté totale (7 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${10}     | ${"oui"}        | ${"1/4 * Sref * A"}                        | ${["A : Ancienneté totale (10 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${12}     | ${"oui"}        | ${"(1/4 * Sref * A1) + (1/3 * Sref * A2)"} | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au-delà de 10 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${10}     | ${"non"}        | ${"1/2 * Sref"}                            | ${["Sref : Salaire de référence (1000 €)"]}
    ${14}     | ${"non"}        | ${"1/2 * Sref"}                            | ${["Sref : Salaire de référence (1000 €)"]}
    ${15}     | ${"non"}        | ${"1 * Sref"}                              | ${["Sref : Salaire de référence (1000 €)"]}
    ${20}     | ${"non"}        | ${"3/2 * Sref"}                            | ${["Sref : Salaire de référence (1000 €)"]}
    ${30}     | ${"non"}        | ${"2 * Sref"}                              | ${["Sref : Salaire de référence (1000 €)"]}
  `(
    "Formule $expectedFormula avec $seniority ans et mise à la retraite $miseALaRetraite",
    ({ seniority, miseALaRetraite, expectedFormula, expectedExplanations }) => {
      const engine = new IndemniteRetraitePublicodes(modelsIndemniteRetraite);
      engine.setSituation({
        "contrat salarié . indemnité de licenciement . ancienneté en année":
          seniority,
        "contrat salarié . indemnité de licenciement . ancienneté requise en année":
          seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence":
          "1000",
        "contrat salarié . indemnité de retraite . mise à la retraite":
          miseALaRetraite,
      });

      const result = engine.getFormuleLegal();

      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
