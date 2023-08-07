import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "292"
);

describe("Formule pour l'indemnité conventionnel de licenciement pour la CC 292", () => {
  describe("Cadres", () => {
    test.each`
      seniority | expectedFormula                                                   | expectedExplanations
      ${7 / 12} | ${""}                                                             | ${[]}
      ${8 / 12} | ${"1 / 4 * Sref * A"}                                             | ${["A : Années d'ancienneté (≈ 0.67 an : valeur arrondie)", "Sref : Salaire de référence (2000 €)"]}
      ${2.75}   | ${"1 / 4 * Sref * A"}                                             | ${["A : Années d'ancienneté (2.75 ans)", "Sref : Salaire de référence (2000 €)"]}
      ${4}      | ${"3 / 10 * Sref * A1"}                                           | ${["A1 : Années d'ancienneté pour la tranche depuis la date d'entrée jusqu'à la 8ème année incluse d'ancienneté (4 ans)", "Sref : Salaire de référence (2000 €)"]}
      ${11}     | ${"3 / 10 * Sref * A1 + 4 / 10 * Sref * A2"}                      | ${["A1 : Années d'ancienneté pour la tranche depuis la date d'entrée jusqu'à la 8ème année incluse d'ancienneté (8 ans)", "A2 : Années d'ancienneté pour tranche du début de 9ème année jusqu'à la fin de la 13ème année d'ancienneté (3 ans)", "Sref : Salaire de référence (2000 €)"]}
      ${19}     | ${"3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref * A3"} | ${["A1 : Années d'ancienneté pour la tranche depuis la date d'entrée jusqu'à la 8ème année incluse d'ancienneté (8 ans)", "A2 : Années d'ancienneté pour tranche du début de 9ème année jusqu'à la fin de la 13ème année d'ancienneté (5 ans)", "A3 : Années d'ancienneté au-delà de la 13ème année d'ancienneté (6 ans)", "Sref : Salaire de référence (2000 €)"]}
      ${35}     | ${"Sref * 15"}                                                    | ${["Sref : Salaire de référence (2000 €)"]}
    `(
      "Avec $seniority ans => $expectedFormula",
      ({ seniority, expectedFormula, expectedExplanations }) => {
        engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0292'",
            "contrat salarié . convention collective . plasturgie . indemnité de licenciement . catégorie professionnelle": `'Cadres (Coefficient 900 et plus)'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniority,
            "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
              "non",
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

  describe("Non-cadres", () => {
    test.each`
      seniority | expectedFormula                            | expectedExplanations
      ${7 / 12} | ${""}                                      | ${[]}
      ${8 / 12} | ${"1 / 4 * Sref * A1"}                     | ${["A1 : Ancienneté de 8 mois à 10 ans (≈ 0.67 an : valeur arrondie)", "Sref : Salaire de référence (2000 €)"]}
      ${5}      | ${"1 / 4 * Sref * A1"}                     | ${["A1 : Ancienneté de 8 mois à 10 ans (5 ans)", "Sref : Salaire de référence (2000 €)"]}
      ${15}     | ${"1 / 4 * Sref * A1 + 1 / 3 * Sref * A2"} | ${["A1 : Ancienneté de 8 mois à 10 ans (10 ans)", "A2 : Ancienneté pour les années au-delà de 10 ans (5 ans)", "Sref : Salaire de référence (2000 €)"]}
      ${20}     | ${"1 / 4 * Sref * A1 + 1 / 3 * Sref * A2"} | ${["A1 : Ancienneté de 8 mois à 10 ans (10 ans)", "A2 : Ancienneté pour les années au-delà de 10 ans (10 ans)", "Sref : Salaire de référence (2000 €)"]}
    `(
      "Avec $seniority ans => $expectedFormula",
      ({ seniority, expectedFormula, expectedExplanations }) => {
        engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0292'",
            "contrat salarié . convention collective . plasturgie . indemnité de licenciement . catégorie professionnelle": `'Non cadres (Coefficient 700 à 830)'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniority,
            "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
              "non",
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
