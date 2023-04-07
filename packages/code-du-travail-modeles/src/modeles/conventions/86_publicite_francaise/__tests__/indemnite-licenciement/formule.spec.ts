import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "86"
);

describe("Formule pour l'indemnité conventionnel de licenciement pour la CC 675", () => {
  describe("Cadres", () => {
    test.each`
      seniority | expectedFormula                                      | expectedExplanations
      ${1.91}   | ${""}                                                | ${[]}
      ${2}      | ${"(33 / 100 * Sref * A1)"}                          | ${["A1 : Tranche jusqu'à 15 ans (2 ans)", "Sref : Salaire de référence (2000 €)"]}
      ${15}     | ${"(33 / 100 * Sref * A1)"}                          | ${["A1 : Tranche jusqu'à 15 ans (15 ans)", "Sref : Salaire de référence (2000 €)"]}
      ${20}     | ${"(33 / 100 * Sref * A1) + (40 / 100 * Sref * A2)"} | ${["A1 : Tranche jusqu'à 15 ans (15 ans)", "A2 : Tranche au delà de 15 ans (5 ans)", "Sref : Salaire de référence (2000 €)"]}
    `(
      "Avec $seniority ans => $expectedFormula",
      ({ seniority, expectedFormula, expectedExplanations }) => {
        engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0086'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              "2000",
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        const formule = engine.getFormule();

        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedExplanations);
      }
    );
  });
});
