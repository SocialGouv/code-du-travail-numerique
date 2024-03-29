import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1979"
);

describe("Formule indemnité licenciement - 1979", () => {
  test.each`
    seniority | expectedFormula                                  | expectedExplanations
    ${0}      | ${""}                                            | ${[]}
    ${1}      | ${""}                                            | ${[]}
    ${1.99}   | ${""}                                            | ${[]}
    ${2}      | ${"1 / 10 * Sref * A"}                           | ${["A : Ancienneté totale (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${5}      | ${"1 / 10 * Sref * A"}                           | ${["A : Ancienneté totale (5 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${15}     | ${"(1 / 10 * Sref * A1) + (1 / 15 * Sref * A2)"} | ${["A1 : Ancienneté totale (15 ans)", "A2 : Ancienneté au delà de 10 ans (5 ans)", "Sref : Salaire de référence (1000 €)"]}
  `(
    "Formule $expectedFormula avec $seniority ans",
    ({ seniority, expectedFormula, expectedExplanations }) => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1979'",

        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          seniority,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "1000",
      });
      const formule = engine.getFormule();

      expect(formule.formula).toEqual(expectedFormula);
      expect(formule.explanations).toEqual(expectedExplanations);
    }
  );
});
