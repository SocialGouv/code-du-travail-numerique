import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2148"
);

describe("Formule indemnité licenciement - CC 2148", () => {
  test.each`
    seniority  | age   | expectedFormula                                         | expectedExplanations
    ${11 / 12} | ${38} | ${""}                                                   | ${[]}
    ${9}       | ${38} | ${"(3% * Sref * A1)"}                                   | ${["A1 : Année complète d'ancienneté, décomptée à partir de la date d'entrée dans l'entreprise et jusqu'à 9 ans d'ancienneté révolus (9 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${10}      | ${38} | ${"(3% * Sref * A1) + (4% * Sref * A2)"}                | ${["A1 : Année complète d'ancienneté, décomptée à partir de la date d'entrée dans l'entreprise et jusqu'à 9 ans d'ancienneté révolus (9 ans)", "A2 : Année entière d'ancienneté pour la tranche comprise entre 10 et 25 ans révolus (1 an)", "Sref : Salaire de référence (1000 €)"]}
    ${17}      | ${38} | ${"(3% * Sref * A1) + (4% * Sref * A2)"}                | ${["A1 : Année complète d'ancienneté, décomptée à partir de la date d'entrée dans l'entreprise et jusqu'à 9 ans d'ancienneté révolus (9 ans)", "A2 : Année entière d'ancienneté pour la tranche comprise entre 10 et 25 ans révolus (8 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${24}      | ${38} | ${"(3% * Sref * A1) + (4% * Sref * A2)"}                | ${["A1 : Année complète d'ancienneté, décomptée à partir de la date d'entrée dans l'entreprise et jusqu'à 9 ans d'ancienneté révolus (9 ans)", "A2 : Année entière d'ancienneté pour la tranche comprise entre 10 et 25 ans révolus (15 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${27}      | ${38} | ${"91% * Sref"}                                         | ${["Sref : Salaire de référence (1000 €)"]}
    ${11 / 12} | ${50} | ${""}                                                   | ${[]}
    ${9}       | ${50} | ${"(3% * Sref * A1)"}                                   | ${["A1 : Année complète d'ancienneté, décomptée à partir de la date d'entrée dans l'entreprise et jusqu'à 9 ans d'ancienneté révolus (9 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${10}      | ${50} | ${"(3% * Sref * A1) + (4% * Sref * A2)"}                | ${["A1 : Année complète d'ancienneté, décomptée à partir de la date d'entrée dans l'entreprise et jusqu'à 9 ans d'ancienneté révolus (9 ans)", "A2 : Année entière d'ancienneté pour la tranche comprise entre 10 et 25 ans révolus (1 an)", "Sref : Salaire de référence (1000 €)"]}
    ${17}      | ${50} | ${"(3% * Sref * A1) + (4% * Sref * A2) + (5% * Sref)"}  | ${["A1 : Année complète d'ancienneté, décomptée à partir de la date d'entrée dans l'entreprise et jusqu'à 9 ans d'ancienneté révolus (9 ans)", "A2 : Année entière d'ancienneté pour la tranche comprise entre 10 et 25 ans révolus (8 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${24}      | ${50} | ${"(3% * Sref * A1) + (4% * Sref * A2) + (10% * Sref)"} | ${["A1 : Année complète d'ancienneté, décomptée à partir de la date d'entrée dans l'entreprise et jusqu'à 9 ans d'ancienneté révolus (9 ans)", "A2 : Année entière d'ancienneté pour la tranche comprise entre 10 et 25 ans révolus (15 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${27}      | ${50} | ${"101% * Sref"}                                        | ${["Sref : Salaire de référence (1000 €)"]}
  `(
    "Formule $expectedFormula avec $seniority ans, age: $age ans",
    ({ seniority, age, expectedFormula, expectedExplanations }) => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC2148'",
        "contrat salarié . convention collective . télécommunications . age":
          age,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          seniority,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "1000",
      });
      const result = engine.getFormule();
      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
